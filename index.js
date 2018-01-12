/**
 * Copyright (c) 2017, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or
 * https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * ./index.js
 *
 * This code handles will install / update the bot in refocus
 */

const env = process.env.NODE_ENV || 'dev';
const config = require('./config.js')[env];
const bdk = require('@salesforce/refocus-bdk')(config);
const packageJSON = require('./package.json');

// Installs / Updates the Bot
bdk.installOrUpdateBot(packageJSON);
