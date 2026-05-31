#!/usr/bin/env node
// SP Editor native messaging host — spawned directly by Chrome/Edge.
// Reads length-prefixed JSON from stdin, writes length-prefixed JSON to stdout.
'use strict'

require('../dist/host')
