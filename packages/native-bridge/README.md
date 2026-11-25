# @sp-editor/native-bridge

Native messaging bridge for the SP Editor browser extension ([Chrome](https://chrome.google.com/webstore/detail/sp-editor/ecblfcmjnbbgaojblcpmjoamegpbodhd) · [Edge](https://microsoftedge.microsoft.com/addons/detail/sp-editor/affnnhcbfmcbbdlcadgkdbfafigmjdkk)). Connects the browser extension to an AI CLI on your machine — the [GitHub Copilot CLI](https://githubnext.com/projects/copilot-cli) or [Claude Code](https://code.claude.com/docs) — so the AI Assistant can use the account you already have.

## Prerequisites

- Node.js 18+
- At least one of these AI CLIs, installed and signed in:
  - [GitHub Copilot CLI](https://www.npmjs.com/package/@github/copilot) (requires a Copilot subscription):
    ```bash
    npm install -g @github/copilot
    copilot login
    ```
  - [Claude Code](https://www.npmjs.com/package/@anthropic-ai/claude-code) (requires a Claude subscription or an Anthropic API key):
    ```bash
    npm install -g @anthropic-ai/claude-code
    claude auth login
    ```

## Installation

```bash
npm install -g @sp-editor/native-bridge
sp-editor-bridge install
```

This registers the native messaging host manifest with Chrome and Edge on your machine.

## Commands

```bash
sp-editor-bridge install               # Install for Chrome / Edge
sp-editor-bridge install --verbose     # Show each manifest path written
sp-editor-bridge install --extension-id <id>   # Use a custom / dev extension ID
sp-editor-bridge uninstall             # Remove all manifests and registry keys
sp-editor-bridge status                # Show installation status
```

## Platforms

| Platform | Supported |
|----------|-----------|
| macOS    | ✓ Chrome, Edge, Chromium |
| Linux    | ✓ Chrome, Edge, Chromium |
| Windows  | ✓ Chrome, Edge |

## How it works

The bridge is a small Node.js process spawned by the browser via the [Native Messaging](https://developer.chrome.com/docs/extensions/develop/concepts/native-messaging) protocol. It reads length-prefixed JSON messages from `stdin`, forwards AI prompts to the CLI of the provider selected in the extension (`copilot` or `claude`), and writes responses back to `stdout`.

The bridge itself sends nothing anywhere. Prompts reach the AI provider only through the CLI you installed and signed in to.

## Security & privacy

### Who can talk to the bridge

Only the SP Editor extension. The browser lets an extension connect only if its ID is listed in the bridge registration (the Chrome Web Store and Edge Add-ons IDs, or the ID you pass with `--extension-id`). Websites — including SharePoint pages — cannot reach the bridge.

### What the bridge does

It accepts three kinds of messages: a ping, a status check (is a CLI installed and signed in, which models it offers) and a prompt. For a prompt it starts `copilot` or `claude` with a fixed set of options and returns the answer. It does not open network connections itself, does not read or write your files, and never writes prompts or answers to a log.

It runs with your normal user rights. Installing it needs no administrator rights: it only registers a small manifest file in your browser profile. The npm package has no runtime dependencies.

### What the AI can do

Very little beyond answering:

- **No shell, file or edit tools.** Copilot CLI is limited to `web_fetch` (`--available-tools`) with GitHub's built-in MCP server disabled. Claude Code runs with `--restricted`, `--tools WebFetch`, no MCP servers and slash commands disabled; your own Claude Code settings files are ignored.
- **Web fetching only from documentation sites.** The AI may read `https://learn.microsoft.com/*` and `https://pnp.github.io/*` to check API details. This list is fixed in the bridge; requests for other sites are denied.
- **It never runs code on its own.** In the extension, AI-generated PnPjs and Graph SDK code is at most placed in the editor; you decide whether to run it. SP Shooter requests are filled in, but you press Shoot! (with the usual warning for DELETE). Only search queries can run automatically, and searches only read.

Treat AI suggestions like code from the internet: read them before running them, especially anything that changes or deletes data.

### Where your data goes

- **To the AI provider you selected.** The prompt — your question plus the context of the current SP Editor page, such as your code, query or request and its results — is sent to GitHub Copilot or Anthropic, the same as when you use that CLI yourself. Check that your organization allows sharing this data with the provider.
- **Into the CLI's local history.** Both CLIs keep conversation history on your computer (Copilot CLI under `~/.copilot`, Claude Code under `~/.claude/projects`). It can contain SharePoint data that was part of a prompt.
- **Not to SP Editor.** SP Editor has no server and stores no prompts or answers. Its usage statistics record only which features are opened, never prompt content.

### Input checks

Values from the extension that end up on the CLI command line (model and session id) are checked against strict character sets, and prompts are passed via `stdin`. This matters on Windows, where npm-installed CLIs are started through `cmd.exe`; on macOS and Linux no shell is involved.

## License

MIT
