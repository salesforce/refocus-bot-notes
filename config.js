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
    host: 'localhost',
    port: '5000',
    token: process.env.API_TOKEN,
  },
  staging: {
    refocusUrl: 'http://refocus-staging.herokuapp.com',
    host: 'refocus-staging.herokuapp.com',
    port: '',
    token: process.env.API_TOKEN,
  },
  sandbox: {
    refocusUrl: 'https://refocus-sandbox.hk.salesforce.com',
    host: 'refocus-sandbox.hk.salesforce.com',
    port: '',
    token: process.env.API_TOKEN,
  },
  production: {
    refocusUrl: 'https://refocus.hk.salesforce.com',
    host: 'refocus.hk.salesforce.com',
    port: '',
    token: process.env.API_TOKEN,
  },
};
