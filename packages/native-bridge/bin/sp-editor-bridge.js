#!/usr/bin/env node
// SP Editor native bridge — CLI entry point
// Usage: sp-editor-bridge <install|uninstall|status> [--verbose] [--extension-id <id>]

'use strict'

const { install, uninstall, status } = require('../dist/installer')

const args = process.argv.slice(2)
const cmd = args[0]

const verbose = args.includes('--verbose')
const idIndex = args.indexOf('--extension-id')
const extensionId = idIndex !== -1 ? args[idIndex + 1] : undefined

switch (cmd) {
  case 'install':
    try {
      install({ verbose, extensionId })
    } catch (err) {
      console.error('Install failed:', err.message)
      process.exit(1)
    }
    break

  case 'uninstall':
    try {
      uninstall()
    } catch (err) {
      console.error('Uninstall failed:', err.message)
      process.exit(1)
    }
    break

  case 'status':
    try {
      status()
    } catch (err) {
      console.error('Status check failed:', err.message)
      process.exit(1)
    }
    // Also check the AI CLIs (same checks the extension uses)
    printCliStatus().catch((err) => {
      console.error('CLI status check failed:', err.message)
      process.exit(1)
    })
    break

  default:
    console.log('SP Editor Native Bridge')
    console.log('')
    console.log('Usage:')
    console.log('  sp-editor-bridge install               Install for Chrome/Edge')
    console.log('  sp-editor-bridge install --verbose     Show each manifest path')
    console.log('  sp-editor-bridge install --extension-id <id>   Use custom extension ID')
    console.log('  sp-editor-bridge uninstall             Remove manifests/registry keys')
    console.log('  sp-editor-bridge status                Show installation status')
    console.log('')
    console.log('Prerequisites (one or both):')
    console.log('  npm install -g @github/copilot             Install the Copilot CLI')
    console.log('  copilot login                              Sign in to GitHub')
    console.log('  npm install -g @anthropic-ai/claude-code   Install Claude Code')
    console.log('  claude auth login                          Sign in to Claude')
    break
}

async function printCliStatus() {
  const copilot = require('../dist/copilot')
  const claude = require('../dist/claude')

  const [copilotInstalled, claudeInstalled] = await Promise.all([
    copilot.isCopilotCliInstalled(),
    claude.isClaudeCliInstalled(),
  ])
  const claudeSupported = claudeInstalled && (await claude.isClaudeCliSupported())
  const [copilotAuthenticated, claudeAuthenticated] = await Promise.all([
    copilotInstalled && copilot.isCopilotAuthenticated(),
    claudeSupported && claude.isClaudeAuthenticated(),
  ])

  console.log('')
  console.log('Copilot CLI:')
  console.log(`  Installed:     ${copilotInstalled ? '✓' : '✗ (run: npm install -g @github/copilot)'}`)
  if (copilotInstalled) {
    console.log(`  Authenticated: ${copilotAuthenticated ? '✓' : '✗ (run: copilot login)'}`)
  }

  console.log('')
  console.log('Claude Code:')
  console.log(`  Installed:     ${claudeInstalled ? '✓' : '✗ (run: npm install -g @anthropic-ai/claude-code)'}`)
  if (claudeInstalled && !claudeSupported) {
    console.log('  Version:       ✗ too old (run: claude update)')
  } else if (claudeInstalled) {
    console.log(`  Authenticated: ${claudeAuthenticated ? '✓' : '✗ (run: claude auth login)'}`)
  }
}
