#!/usr/bin/env node

import { join } from 'path'
import { promisify } from 'util'
import { exec } from 'child_process'
import copy from 'recursive-copy'
import rimraf from 'rimraf'

// Enhances source files inside /app with a fresh RN project template.
;(async () => {
  const appName = 'IndicateApp'
  const execute = promisify(exec)

  console.log('Initializing a fresh RN project...')
  console.log('⌛ This might take some time.')

  // Remove local CLI, as it interferes with the global.
  rimraf.sync('node_modules/@react-native-community/cli')
  // Remove existing installation in case it got stuck last time.
  rimraf.sync(`app/${appName}`)

  const timer = setTimeout(() => {
    // Warning after 5 minutes in case native dependencies missing for CLI.
    console.log(
      "If it's stuck at this point, try creating a RN project elsewhere with 'npx react-native init TestApp' and follow the instructions there before trying this again."
    )
  }, 300000)

  // Initialize RN project.
  await execute(`npx react-native init ${appName}`, {
    cwd: 'app'
  })

  clearTimeout(timer)

  // Copy to destination directory, leaving source files untouched.
  await copy(`app/${appName}`, 'app', {
    dot: true,
    overwrite: false,
    filter: ['**/*', '!App.js']
  })

  // Remove temporary project directory.
  rimraf.sync(`app/${appName}`)

  // Install this package locally, avoiding symlinks.
  await execute('npm install $(npm pack .. | tail -1)', {
    cwd: join(__dirname, 'app')
  })

  console.log('🍞 React Native App created inside /app.')
})()
