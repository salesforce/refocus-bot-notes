/**
 * Copyright (c) 2017, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or
 * https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * config.js
 *
 * Config file for different deployments - dev, staging, production
 *
 */

module.exports = {
  dev: {
    refocusUrl: 'http://localhost:3000',
    sfdcUsername: process.env.SFDC_USERNAME,
    sfdcPassword: process.env.SFDC_PASSWORD,
    loginUrl: 'https://login.salesforce.com',
    host: 'localhost',
    port: process.env.PORT,
    token: '',
  },
  staging: {
    refocusUrl: 'http://refocus-staging.herokuapp.com',
    sfdcUsername: process.env.SFDC_USERNAME,
    sfdcPassword: process.env.SFDC_PASSWORD,
    loginUrl: 'https://login.salesforce.com',
    host: 'refocus-staging.herokuapp.com',
    port: process.env.PORT,
    token: process.env.TOKEN,
  },
  sandbox: {
    refocusUrl: 'https://refocus-sandbox.hk.salesforce.com',
    sfdcUsername: process.env.SFDC_USERNAME,
    sfdcPassword: process.env.SFDC_PASSWORD,
    loginUrl: 'https://test.salesforce.com',
    host: 'refocus-sandbox.hk.salesforce.com',
    port: process.env.PORT,
    token: process.env.TOKEN,
  },
  production: {
    refocusUrl: 'https://refocus.hk.salesforce.com',
    sfdcUsername: process.env.SFDC_USERNAME,
    sfdcPassword: process.env.SFDC_PASSWORD,
    loginUrl: 'https://login.salesforce.com',
    host: 'refocus.hk.salesforce.com',
    port: process.env.PORT,
    token: process.env.TOKEN,
  },
};