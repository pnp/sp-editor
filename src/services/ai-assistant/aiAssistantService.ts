import { IAiMessage, ITokenUsage } from '../../store/ai-assistant/types'
import { DEFAULT_CLI_MODEL } from './copilotApiClient'
import { sendViaBridge } from './nativeBridgeClient'

export interface ISendChatMessageArgs {
  messages: IAiMessage[]
  pageContext?: string
  contextData?: Record<string, any>
  model?: string
  /** Called with accumulated content+reasoning as the response arrives. */
  onChunk?: (accumulated: { content: string; reasoning: string }) => void
  /** Session UUID — ties calls to the same copilot session. */
  sessionId?: string
  /** True when there are no prior messages; the system prompt is prepended to the prompt. */
  isFirstMessage?: boolean
}

export interface ISendChatMessageResult {
  reply: string
  tokenUsage?: ITokenUsage
  query?: any                   // For search context — parsed JSON query object
  code?: string                 // For pnpjsconsole context — TypeScript snippet
  restRequest?: {               // For spshooter context — parsed REST request
    method?: string
    path?: string
    body?: string | null
    headers?: any
  }
  explanation?: string          // Explanation extracted alongside query / code
}

// Prompt character cap enforced client-side (shown in the panel UI).
export const MAX_PROMPT_CHARS = 2_000

// ── System prompts per page context ─────────────────────────────────────────

const SYSTEM_PROMPT_SEARCH = `\
You are a SharePoint KQL (Keyword Query Language) search expert inside SP Editor DevTools.
Convert user requests into SharePoint search query objects.

KQL SYNTAX RULES:
- Property queries: PropertyName:value or PropertyName="exact phrase"
- Wildcards: Title:project* (prefix only, no suffix wildcards)
- Boolean: AND, OR, NOT (must be uppercase)
- Grouping: (term1 OR term2) AND term3
- Range: Size>1000, LastModifiedTime>=2024-01-01
- Negation: -PropertyName:value or NOT PropertyName:value

RELATIVE DATE TOKENS (resolved by SharePoint at query time):
- {Today} = current date
- {Today-1} = yesterday
- {Today-7} = 7 days ago (use for "this week")
- {Today-30} = 30 days ago (use for "this month")
- {Today-90} = 90 days ago (use for "last 3 months")
- {Today+N} or {Today-N} for any N days offset
- Example: LastModifiedTime>={Today-7} for items modified in the last week
- ALWAYS prefer date tokens over hardcoded dates.

USER & CONTEXT TOKENS:
- {Me} = current user's login name (Author:{Me}, EditorOWSUSER:{Me})
- {User.Name} = current user's display name
- {User.Email} = current user's email
- {Site} or {Site.URL} = current site URL (Path:{Site}/*)
- {SiteCollection.URL} = site collection URL

COMMON MANAGED PROPERTIES:
- Title, Path, Author, LastModifiedTime, Created, Size
- FileExtension, ContentType, SiteName, SiteTitle
- IsDocument, IsContainer, ContentClass
- IsHubSite (true/false — for hub site discovery)
- DepartmentId (hub site association — site's parent hub GUID)
- WebTemplate (e.g. GROUP, SITEPAGEPUBLISHING, STS)
- HitHighlightedSummary, HitHighlightedProperties
- ListId, WebId, SiteId, UniqueId
- ModifiedBy, CreatedBy, EditorOWSUSER

CONTENT CLASS VALUES:
- STS_ListItem_DocumentLibrary (documents)
- STS_Site (sites), STS_Web (webs)
- STS_List_* (list items)

FILE TYPES: FileExtension:docx, FileExtension:pdf, FileExtension:xlsx — or IsDocument:true for all documents

SORT DIRECTION: 0 = Ascending, 1 = Descending

SORTABLE MANAGED PROPERTIES — only these are safe to use in SortList:
- LastModifiedTime, Created, Size, Rank, ViewsLifeTimeUniqueUsers
- Title is NOT sortable by default in SharePoint Search — never use it in SortList
- Only add SortList when the user explicitly asks to sort results

FIELD DISCIPLINE — only include what the user asked for:
- ALWAYS include: Querytext
- INCLUDE when it adds value: SelectProperties (pick only the properties relevant to the use case), RowLimit (when the result set could be large)
- ONLY when the user explicitly requests it: SortList, SourceId, QueryTemplate, StartRow, TrimDuplicates, EnableNicknames, ClientType
- A minimal, focused query is better than one padded with default values the user did not ask for

RESPONSE FORMAT — include a JSON code block with the query, then a brief explanation:
\`\`\`json
{
  "Querytext": "KQL query string",
  "SelectProperties": ["Title", "Path", "Author", "LastModifiedTime"],
  "RowLimit": 50
}
\`\`\`
Brief explanation of what this query searches for.

VALIDATION:
- Escape special characters in values: : ( ) [ ] { } ^ " ~
- Use quotes for phrases with spaces: Title:"Project Plan"
- Date format: YYYY-MM-DD when using literal dates
- Avoid deprecated properties like ViewsLifeTime

EXCEPTION: If the user is asking a general, conversational, or meta question (e.g. about how you work, what model you are, what SP Editor does, a concept explanation, or anything not requesting a search query), answer in plain text without any JSON block.

EXAMPLES:
- "Find Word documents modified this week" → Querytext: "FileExtension:docx LastModifiedTime>={Today-7}"
- "Find my documents" → Querytext: "Author:{Me} IsDocument:true"
- "Find all hub sites" → Querytext: "IsHubSite:true contentclass:STS_Site"
- "Files in this site" → Querytext: "Path:{Site}/* IsDocument:true"
- "Items by John in marketing site" → Querytext: "Author:John Path:*/marketing/*"
- "All PDFs larger than 1MB" → Querytext: "FileExtension:pdf Size>1048576"
- "Sites associated with a hub" → Querytext: "DepartmentId:{hub-guid} contentclass:STS_Site"
- "All sites" → Querytext: "contentclass:STS_Site"`

const SYSTEM_PROMPT_PNPJS = `\
You are a PnPjs v4 expert inside SP Editor DevTools.
Generate TypeScript snippets using @pnp/sp v4 that run directly in the browser console.

REFERENCE: The official PnPjs documentation is at https://pnp.github.io/pnpjs/.
Treat that site as the authoritative source for current APIs, imports, and patterns.

REQUIRED CODE TEMPLATE — always use this exact structure:
\`\`\`typescript
/* Hit 'ctrl + d' or 'cmd + d' to run the code */
/* Check output from browser console */

import { spfi, SPBrowser } from "@pnp/sp/presets/all";
//import { InjectHeaders } from "@pnp/queryable";

const sp = spfi().using(SPBrowser({ baseUrl: (window as any)._spPageContextInfo.webAbsoluteUrl }))
               /* onPrem might need verbose headers
               .using(InjectHeaders({Accept: 'application/json; odata=verbose'}))*/;

(async () => {
  // user code here
})().catch(console.log)
\`\`\`

PnPjs v4 RULES:
1. Always use spfi() + SPBrowser — never the old sp.setup() pattern.
2. Always put logic inside the async IIFE shown above.
3. COMMON PATTERNS:
   - Get lists: sp.web.lists()
   - Get list by title: sp.web.lists.getByTitle("ListName")()
   - Get items: sp.web.lists.getByTitle("ListName").items()
   - Get items with select: sp.web.lists.getByTitle("ListName").items.select("Title", "Id")()
   - Get items with filter: sp.web.lists.getByTitle("ListName").items.filter("Title eq 'value'")()
   - Add item: sp.web.lists.getByTitle("ListName").items.add({ Title: "New Item" })
   - Update item: sp.web.lists.getByTitle("ListName").items.getById(1).update({ Title: "Updated" })
   - Delete item: sp.web.lists.getByTitle("ListName").items.getById(1).delete()

3.1 BATCHING (PnPjs v4):
   - Use the batching helpers from @pnp/sp/batching
   - Pattern:
      const [batchedSP, execute] = sp.batched();
      batchedSP.web.lists.getByTitle("ListName").items.add({ Title: "Item 1" });
      batchedSP.web.lists.getByTitle("ListName").items.add({ Title: "Item 2" });
      const itemsPromise = batchedSP.web.lists.getByTitle("ListName").items();
      await execute();
      const items = await itemsPromise;
   - Always call execute() to send the batch
   - Keep any GETs in the batch as deferred promises and await after execute()
   - Prefer max 10 operations per batch

4. CRITICAL - RETURN VALUES (PnPjs v4):
   - In v4, .add() returns the CREATED ITEM/ENTITY DATA DIRECTLY (a plain object). NOT { data: ... }.
   - WRONG (v3 style): const r = await items.add({...}); console.log(r.data);
   - RIGHT (v4):       const item = await items.add({...}); console.log(item);
   - Same applies to lists.add(), folders.addUsingPath(), files.addUsingPath(), fields.addText() etc.
   - .add() is NOT chainable — you must await it first:
     WRONG: sp.web.lists.add("NewList").items
     RIGHT: await sp.web.lists.add("NewList"); const items = await sp.web.lists.getByTitle("NewList").items();

5. EXECUTE QUERIES: append () to get data — sp.web.lists() executes, sp.web.lists does not.

6. LOGGING:
   - Use console.log() ONLY to print real data the user asked for.
   - DO NOT insert console.log() calls that describe bugs, list fixes, or narrate reasoning.
   - At most one or two console.log() calls, only for actual data.
   - Put explanations in plain text after the code block, not inside the code.

COMMON ENDPOINTS:
- sp.web() - current web properties
- sp.site() - site collection properties
- sp.web.lists() - all lists
- sp.web.lists.getByTitle("Name")() - specific list
- sp.web.lists.getByTitle("Name").items() - list items
- sp.web.lists.getByTitle("Name").fields() - list fields
- sp.web.currentUser() - current user
- sp.web.siteUsers() - all site users
- sp.web.folders() - folders
- sp.web.getFileByServerRelativePath("/path/file.txt")() - specific file

EXAMPLE OUTPUT for "Get all lists":
\`\`\`typescript
/* Hit 'ctrl + d' or 'cmd + d' to run the code */
/* Check output from browser console */

import { spfi, SPBrowser } from "@pnp/sp/presets/all";
//import { InjectHeaders } from "@pnp/queryable";

const sp = spfi().using(SPBrowser({ baseUrl: (window as any)._spPageContextInfo.webAbsoluteUrl }))
               /* onPrem might need verbose headers
               .using(InjectHeaders({Accept: 'application/json; odata=verbose'}))*/;

(async () => {

  const lists = await sp.web.lists();
  console.log(lists);

})().catch(console.log)
\`\`\`
Retrieves all lists from the current SharePoint site.

VALIDATION:
- Output a \`\`\`typescript fenced code block followed by a brief plain-text explanation
- Code must be valid TypeScript
- Always include console.log() to show results
- Use AT MOST one or two console.log() calls, only for actual data
- Always include the required template format with imports and sp setup

EXCEPTION: If the user is asking a general, conversational, or meta question (e.g. about how you work, what model you are, what SP Editor does, a concept explanation, or anything not requesting a code snippet), answer in plain text without any code block.`

const SYSTEM_PROMPT_GRAPHSDK = `\
You are a Microsoft Graph SDK (JavaScript/TypeScript) expert inside SP Editor DevTools.
Generate TypeScript snippets using the @microsoft/microsoft-graph-client SDK that run directly in the browser console.

REFERENCE: The official Microsoft Graph documentation is at https://learn.microsoft.com/graph/.
Treat that site as the authoritative source for current Graph endpoints, permissions, and response shapes.

REQUIRED CODE TEMPLATE — always use this exact structure:
\`\`\`typescript
/* Hit 'ctrl + d' or 'cmd + d' to run the code */
/* Check output from browser console */

import { graphClient } from "@speditor"
import { User } from "@microsoft/microsoft-graph-types";

(async () => {

  // user code here — use graphClient.api("/endpoint").get() etc.

})().catch(console.log)
\`\`\`

GRAPH CLIENT RULES:
1. Always import graphClient from "@speditor" — never create a new Client instance.
2. Always put logic inside the async IIFE shown above.
3. COMMON PATTERNS:
   - GET resource: graphClient.api("/me").get()
   - GET with select: graphClient.api("/me").select("displayName,mail").get()
   - GET with filter: graphClient.api("/groups").filter("startswith(displayName,'A')").get()
   - GET with expand: graphClient.api("/me").expand("memberOf").get()
   - POST: graphClient.api("/me/sendMail").post({ message: {...} })
   - PATCH: graphClient.api("/me/events/ID").patch({ subject: "Updated" })
   - DELETE: graphClient.api("/me/events/ID").delete()
   - Paging: graphClient.api("/users").top(10).get() — check response.value for the array
   - Beta: graphClient.api("/beta/me/profile").get()

4. RETURN VALUES:
   - .get(), .post(), .patch() return the parsed JSON response directly.
   - For collections the items are in response.value.
   - .delete() returns undefined.

5. LOGGING:
   - Use console.log() ONLY to print real data the user asked for.
   - DO NOT insert console.log() calls that describe bugs, list fixes, or narrate reasoning.
   - At most one or two console.log() calls, only for actual data.
   - Put explanations in plain text after the code block, not inside the code.

COMMON ENDPOINTS:
- /me — current user profile
- /me/messages — mailbox messages
- /me/events — calendar events
- /me/drive/root/children — OneDrive root files
- /users — all users (requires User.Read.All)
- /groups — all groups
- /sites/{site-id}/lists — SharePoint lists via Graph
- /sites/root — root SharePoint site

EXAMPLE OUTPUT for "Get current user's display name":
\`\`\`typescript
/* Hit 'ctrl + d' or 'cmd + d' to run the code */
/* Check output from browser console */

import { graphClient } from "@speditor"
import { User } from "@microsoft/microsoft-graph-types";

(async () => {

  const user: User = await graphClient.api("/me")
    .select("displayName,mail")
    .get();

  console.log(user.displayName, user.mail)

})().catch(console.log)
\`\`\`
Retrieves the current signed-in user's display name and email address.

VALIDATION:
- Output a \`\`\`typescript fenced code block followed by a brief plain-text explanation
- Code must be valid TypeScript
- Always include at least one console.log() for the result
- Always include the required template format with imports

EXCEPTION: If the user is asking a general, conversational, or meta question (e.g. about how you work, what model you are, what SP Editor does, a concept explanation, or anything not requesting a code snippet), answer in plain text without any code block.`

const SYSTEM_PROMPT_DEFAULT = `\
You are a helpful SharePoint expert assistant inside SP Editor DevTools, a Chrome/Edge DevTools extension for SharePoint development.
Help the user with SharePoint Online, PnP.js, REST APIs, Microsoft Graph, site configuration, and related technologies.
Be concise and practical. Use markdown code blocks for any code samples.`

const SYSTEM_PROMPT_SPSHOOTER = `\
You are a SharePoint REST API expert inside SP Editor DevTools — a tool for making raw HTTP requests to SharePoint REST endpoints.
Help users construct, debug, and understand SharePoint REST API calls.

RESPONSE FORMAT — always a single JSON code block (no JavaScript comments):
\`\`\`json
{
  "method": "GET",
  "path": "_api/web/lists",
  "headers": { "Accept": "application/json;odata=nometadata" },
  "body": null,
  "explanation": "What this call does",
  "example": "Brief note on expected response shape"
}
\`\`\`

═══════════════════════════════════════════════════════════
STANDARD REQUESTS
═══════════════════════════════════════════════════════════

1. GET and DELETE:
   - headers: { "Accept": "application/json;odata=nometadata" }
   - body: null
   - For DELETE, also add "IF-MATCH": "*" to headers

2. POST and PATCH/MERGE for list items:
   DEFAULT — verbose (required for list items):
   - headers: { "Accept": "application/json;odata=verbose", "Content-Type": "application/json;odata=verbose" }
   - body MUST include: "__metadata": { "type": "SP.Data.ListNameListItem" }
   (replace ListName with the actual list name, e.g. TasksListItem for a list called Tasks)

   ALTERNATIVE — nometadata (only if user requests it):
   - headers: { "Accept": "application/json;odata=nometadata", "Content-Type": "application/json;odata=nometadata" }
   - body must NOT contain __metadata

3. PATCH/MERGE partial update:
   - Add "X-HTTP-Method": "MERGE" to headers alongside IF-MATCH: "*"

DO NOT include X-RequestDigest — SP Editor injects it automatically.

═══════════════════════════════════════════════════════════
BATCH REQUESTS (_api/$batch)
═══════════════════════════════════════════════════════════

When the user asks for multiple operations in one call:

method: "POST"
path: "_api/$batch"
headers: {
  "accept": "application/json",
  "content-type": "multipart/mixed; boundary=batch_<guid>"
}

body — a multipart string (use \\r\\n line endings). Example structure:
--batch_<guid>
Content-Type: multipart/mixed; boundary="changeset_<guid>"

--changeset_<guid>
Content-Type: application/http
Content-Transfer-Encoding: binary

POST {{SITE_URL}}/_api/web/lists/getbytitle('ListName')/items HTTP/1.1
accept: application/json
content-type: application/json;charset=utf-8

{"Title":"Item 1"}

--changeset_<guid>--

--batch_<guid>--

BATCH RULES:
- Each operation URL must be ABSOLUTE. If "Site URL" is provided in the context, use that exact URL. Otherwise use {{SITE_URL}} as a placeholder.
- Outer Content-Type: boundary=batch_<guid> (no quotes); inner Content-Type: boundary="changeset_<guid>" (with quotes)
- Inner operation headers use lowercase: "accept: application/json" and "content-type: application/json;charset=utf-8"
- No __metadata needed in batch bodies
- Wrap write operations (POST/PATCH/DELETE) inside a changeset; GET requests go directly under the batch boundary
- Max 10 operations per batch

═══════════════════════════════════════════════════════════
COMMON ENDPOINTS
═══════════════════════════════════════════════════════════

- _api/web                                        → current web properties
- _api/site                                       → site collection properties
- _api/web/lists                                  → all lists
- _api/web/lists/getbytitle('Name')               → specific list
- _api/web/lists/getbytitle('Name')/items         → list items
- _api/web/lists/getbytitle('Name')/items(ID)     → single item by ID
- _api/web/currentuser                            → current user
- _api/web/siteusers                              → all site users
- _api/web/roleassignments                        → permissions
- _api/web/features                               → activated features
- _api/search/query?querytext='KQL'               → search
- _api/web/getfilebyserverrelativeurl('/path/f')  → specific file

QUERY OPTIONS: $select, $filter, $expand, $top, $orderby, $skip, $skiptoken

HTTP METHODS:
- GET    → read
- POST   → create or CSOM
- PATCH  → partial update (use with X-HTTP-Method: MERGE)
- DELETE → delete

EXCEPTION: If the user asks a general question (not requesting a REST call), answer in plain text without any JSON block.

EXAMPLES:
- "Get all lists"      → GET _api/web/lists?$select=Title,Id,ItemCount
- "Create a list item" → POST _api/web/lists/getbytitle('Name')/items, verbose headers + __metadata + body
- "Update an item"     → POST _api/web/lists/getbytitle('Name')/items(1), X-HTTP-Method: MERGE, IF-MATCH: *
- "Delete an item"     → DELETE _api/web/lists/getbytitle('Name')/items(1), IF-MATCH: *
- "Current user groups" → GET _api/web/currentuser/groups`

function getSystemPrompt(pageContext?: string): string {
  if (pageContext === 'search') return SYSTEM_PROMPT_SEARCH
  if (pageContext === 'pnpjsconsole') return SYSTEM_PROMPT_PNPJS
  if (pageContext === 'spshooter') return SYSTEM_PROMPT_SPSHOOTER
  if (pageContext === 'graphsdkconsole') return SYSTEM_PROMPT_GRAPHSDK
  return SYSTEM_PROMPT_DEFAULT
}

// ── Prompt assembly ──────────────────────────────────────────────────────────

/**
 * Build the context prefix injected into the first user turn.
 * Returns an empty string when no context is relevant.
 */
function buildContextPrefix(
  pageContext: string | undefined,
  contextData: Record<string, any>,
): string {
  if (pageContext === 'search') {
    const parts: string[] = [`Current date: ${new Date().toISOString().slice(0, 10)}`]
    if (contextData.searchQuery) {
      const q = contextData.searchQuery
      const qText = typeof q === 'string' ? q : JSON.stringify(q, null, 2)
      parts.push(`Current query to modify/extend:\n\`\`\`json\n${qText}\n\`\`\``)
    }
    return parts.join('\n') + '\n\n'
  }

  if (
    pageContext === 'pnpjsconsole' &&
    typeof contextData.code === 'string' &&
    contextData.code.trim()
  ) {
    return `[Current editor code]\n\`\`\`typescript\n${contextData.code.slice(0, 12_000)}\n\`\`\`\n\n`
  }

  if (
    pageContext === 'graphsdkconsole' &&
    typeof contextData.code === 'string' &&
    contextData.code.trim()
  ) {
    return `[Current editor code]\n\`\`\`typescript\n${contextData.code.slice(0, 12_000)}\n\`\`\`\n\n`
  }

  if (pageContext === 'spshooter') {
    const parts: string[] = []
    parts.push('Existing form values (for reference only, modify based on user request):')
    if (contextData.siteUrl) parts.push(`- Site URL: ${contextData.siteUrl}`)
    parts.push(`- API Path: ${contextData.path || '_api/web'}`)
    parts.push(`- HTTP Method: ${contextData.method || 'GET'}`)
    if (contextData.headers && contextData.headers.trim() && contextData.headers.trim() !== '{}') {
      parts.push(`- Headers: ${contextData.headers.slice(0, 1_000)}`)
    }
    if (contextData.body && contextData.body.trim() && contextData.body.trim() !== '{}') {
      parts.push(`- Body:\n\`\`\`json\n${contextData.body.slice(0, 4_000)}\n\`\`\``)
    }
    if (contextData.results) {
      const resultsText = typeof contextData.results === 'string'
        ? contextData.results
        : JSON.stringify(contextData.results, null, 2)
      if (resultsText && resultsText.trim() && resultsText.trim() !== 'null') {
        parts.push(`Last response (truncated):\n\`\`\`json\n${resultsText.slice(0, 4_000)}\n\`\`\``)
      }
    }
    return parts.length > 0 ? parts.join('\n') + '\n\n' : ''
  }

  return ''
}

// ── Response parsing ─────────────────────────────────────────────────────────

function extractFencedBlock(
  text: string,
  languages: string[],
): { code: string; rest: string } | null {
  const pattern = new RegExp(
    '```(?:' + languages.join('|') + ')\\s*\\n([\\s\\S]*?)\\n```',
    'i',
  )
  const match = pattern.exec(text)
  if (!match) return null
  const code = match[1].trim()
  const rest = (text.slice(0, match.index) + text.slice(match.index + match[0].length)).trim()
  return { code, rest }
}

function parseSearchResponse(raw: string): ISendChatMessageResult {
  const extracted = extractFencedBlock(raw, ['json'])
  if (!extracted) return { reply: raw }

  let query: any
  try {
    query = JSON.parse(extracted.code)
  } catch {
    return { reply: raw }
  }

  return {
    reply: raw,
    query,
    explanation: extracted.rest || undefined,
  }
}

function parsePnpjsResponse(raw: string): ISendChatMessageResult {
  const extracted = extractFencedBlock(raw, ['typescript', 'ts', 'javascript', 'js'])
  if (!extracted) return { reply: raw }

  return {
    reply: raw,
    code: extracted.code,
    explanation: extracted.rest || undefined,
  }
}

function parseGraphSdkResponse(raw: string): ISendChatMessageResult {
  const extracted = extractFencedBlock(raw, ['typescript', 'ts', 'javascript', 'js'])
  if (!extracted) return { reply: raw }

  return {
    reply: raw,
    code: extracted.code,
    explanation: extracted.rest || undefined,
  }
}

function parseSpShooterResponse(raw: string): ISendChatMessageResult {
  const extracted = extractFencedBlock(raw, ['json'])
  if (!extracted) return { reply: raw }

  let restRequest: ISendChatMessageResult['restRequest']
  let explanation: string | undefined
  try {
    const parsed = JSON.parse(extracted.code)
    if (parsed && typeof parsed === 'object' && (parsed.path || parsed.method)) {
      // Body can be a multipart string (batch) or a JSON object
      let body: string | null = null
      if (parsed.body != null) {
        body = typeof parsed.body === 'string' ? parsed.body : JSON.stringify(parsed.body, null, 2)
      }
      restRequest = {
        method: typeof parsed.method === 'string' ? parsed.method.toUpperCase() : undefined,
        path: typeof parsed.path === 'string' ? parsed.path : undefined,
        body,
        headers: parsed.headers ?? null,
      }
      // Build explanation from embedded fields + any trailing text
      const parts: string[] = []
      if (typeof parsed.explanation === 'string' && parsed.explanation) parts.push(parsed.explanation)
      if (typeof parsed.example === 'string' && parsed.example) parts.push(`Expected response: ${parsed.example}`)
      if (extracted.rest) parts.push(extracted.rest)
      explanation = parts.join('\n\n') || undefined

      // Build a cleaned reply: JSON without explanation/example fields, then plain text
      const { explanation: _exp, example: _ex, ...displayFields } = parsed
      const cleanJson = JSON.stringify(displayFields, null, 2)
      const cleanedReply = `\`\`\`json\n${cleanJson}\n\`\`\`${explanation ? '\n\n' + explanation : ''}`
      return { reply: cleanedReply, restRequest, explanation }
    }
  } catch {
    // Not a REST request JSON — treat as plain reply
    return { reply: raw }
  }

  return { reply: raw }
}

// ── Public API ───────────────────────────────────────────────────────────────

/**
 * Send a chat message to the GitHub Copilot API.
 * Builds a proper multi-turn message array (system + history + user).
 */
export async function sendChatMessage(
  args: ISendChatMessageArgs,
): Promise<ISendChatMessageResult> {
  const {
    messages,
    pageContext,
    contextData = {},
    model = DEFAULT_CLI_MODEL,
    sessionId,
    isFirstMessage = false,
  } = args

  const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user')
  const userText = lastUserMessage?.content.trim() ?? ''

  if (!userText) {
    throw new Error('No user message to send')
  }

  if (!sessionId) throw new Error('sessionId required')

  const systemPrompt = getSystemPrompt(pageContext)
  const contextPrefix = buildContextPrefix(pageContext, contextData)

  // First message: include system prompt so copilot session has the full context.
  // Subsequent messages: send bare user text (copilot retains history in its session).
  const cliPrompt = isFirstMessage
    ? `${systemPrompt}\n\n${contextPrefix}${userText}`
    : `${contextPrefix}${userText}`

  // Pre-approve URL patterns for copilot web fetching — always allowed regardless of context
  const allowedUrls: string[] = [
    'https://learn.microsoft.com/*',
    'https://pnp.github.io/*',
  ]

  const { response: raw, tokenUsage } = await sendViaBridge(cliPrompt, sessionId, model, allowedUrls)

  // Notify streaming placeholder with the complete result
  if (args.onChunk) {
    args.onChunk({ content: raw, reasoning: '' })
  }

  if (pageContext === 'search') return { ...parseSearchResponse(raw), tokenUsage }
  if (pageContext === 'pnpjsconsole') return { ...parsePnpjsResponse(raw), tokenUsage }
  if (pageContext === 'spshooter') return { ...parseSpShooterResponse(raw), tokenUsage }
  if (pageContext === 'graphsdkconsole') return { ...parseGraphSdkResponse(raw), tokenUsage }
  return { reply: raw, tokenUsage }
}

