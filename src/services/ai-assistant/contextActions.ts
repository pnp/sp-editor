/** Quick-action chips shown in the AI panel per page context. */

export interface IContextAction {
  label: string
  /** Full prompt text sent to the model (can be long / include instructions). */
  prompt: string
  /** Short text shown in the chat bubble instead of the full prompt. */
  display: string
}

const CONTEXT_ACTIONS: Record<string, IContextAction[]> = {
  search: [
    {
      label: 'Explain query',
      prompt: 'Explain what the current search query does in plain language.',
      display: 'Explain current query',
    },
    {
      label: 'Generate KQL',
      prompt: 'Generate a KQL search query for SharePoint that I can describe. Ask me what I want to find.',
      display: 'Generate a KQL query…',
    },
    {
      label: 'Improve query',
      prompt: 'Review the current search query and suggest improvements for relevance, performance, or correctness.',
      display: 'Improve current query',
    },
  ],
  pnpjsconsole: [
    {
      label: 'Explain code',
      prompt: 'Explain what the current PnPjs code does, step by step.',
      display: 'Explain current code',
    },
    {
      label: 'Find issues',
      prompt: 'Review the current PnPjs code and identify any bugs, deprecated API usage, or potential issues.',
      display: 'Find issues in current code',
    },
    {
      label: 'Generate snippet',
      prompt: 'Generate a new PnPjs v3 snippet for me. Ask me what SharePoint operation I want to perform.',
      display: 'Generate a PnPjs snippet…',
    },
  ],
  spshooter: [
    {
      label: 'Explain response',
      prompt: 'Explain the current REST API response — what the properties mean and how to work with this data.',
      display: 'Explain current response',
    },
    {
      label: 'Build request',
      prompt: 'Help me build a SharePoint REST API request. Ask me what operation I want to perform.',
      display: 'Build a REST request…',
    },
    {
      label: 'Improve query',
      prompt: 'Review the current REST API request and suggest improvements: better OData options, missing $select/$filter, or more efficient endpoints.',
      display: 'Improve current request',
    },
    {
      label: 'Debug error',
      prompt: 'The current REST API call returned an error. Help me understand what went wrong and how to fix it.',
      display: 'Debug the error',
    },
  ],
}

export function getContextActions(pageContext: string | undefined): IContextAction[] {
  if (!pageContext) return []
  return CONTEXT_ACTIONS[pageContext] ?? []
}
