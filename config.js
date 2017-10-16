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
  },
  staging: {
    refocusUrl: '',
    token: '',
  },
  production: {
    refocusUrl: '',
    token: '',
  }
};
