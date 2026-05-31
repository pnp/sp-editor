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
    console.log('Prerequisites:')
    console.log('  gh auth login          Authenticate with GitHub')
    console.log('  gh copilot             First-time Copilot CLI setup')
    break
}
