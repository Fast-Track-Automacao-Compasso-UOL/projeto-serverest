/// <reference types="cypress" />

const cucumber = require('cypress-cucumber-preprocessor').default
const fs = require('fs-extra')
const path = require('path')

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve('.', 'cypress', 'config', `${file}.json`)
  return fs.readJson(pathToConfigFile)
}

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  on('file:preprocessor', cucumber())
  on('before:browser:launch', (browser = {}, launchOptions) => {
    if (browser.family === 'chromium' && browser.name !== 'electron') {
      launchOptions.args.push('--disable-dev-shm-usage')
    }
    return launchOptions
  })

  const file = config.env.configFile || 'development'
  return getConfigurationByFile(file)
}