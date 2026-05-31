# @sp-editor/native-bridge

Native messaging bridge for the SP Editor browser extension ([Chrome](https://chrome.google.com/webstore/detail/sp-editor/ecblfcmjnbbgaojblcpmjoamegpbodhd) · [Edge](https://microsoftedge.microsoft.com/addons/detail/sp-editor/affnnhcbfmcbbdlcadgkdbfafigmjdkk)). Connects the browser extension to the local [GitHub Copilot CLI](https://githubnext.com/projects/copilot-cli) so AI features work without sending your SharePoint data to external servers.

## Prerequisites

- Node.js 18+
- [GitHub Copilot CLI](https://www.npmjs.com/package/@github/copilot) installed and authenticated:
  ```bash
  npm install -g @github/copilot
  copilot login
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

The bridge is a small Node.js process spawned by the browser via the [Native Messaging](https://developer.chrome.com/docs/extensions/develop/concepts/native-messaging) protocol. It reads length-prefixed JSON messages from `stdin`, forwards AI prompts to the local Copilot CLI, and writes responses back to `stdout`.

No data leaves your machine except through the Copilot CLI itself.

## License

MIT
