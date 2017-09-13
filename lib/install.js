/**
 * Copyright (c) 2017, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or
 * https://opensource.org/licenses/BSD-3-Clause
 */

'use strict';

/**
 * /lib/install.js
 *
 * A library that installs or updates a Bot in Refocus.
 */

const request = require('superagent');

const env = process.env.NODE_ENV || 'dev';
const config = require('./../config.js')[env];

const botName = require('./../package.json').name;
const botActions = require('./../package.json').metadata.actions;
const botData = require('./../package.json').metadata.data;
const botSettings = require('./../package.json').metadata.settings;
const botUrl = require('./../package.json').url;
const botUi = 'web/dist/bot.zip';

/**
 * Installs a new Bot.
 * Executes a POST request against Refocus /v1/bots route
 *
 */
function installBot(bot) {
  return new Promise((resolve, reject) => {
    request
      .post(`${config.refocusUrl}/v1/bots`)
      .set('Content-Type', 'multipart/form-data')
      .field('name', bot.name)
      .field('url', bot.url)
      .field('active', bot.active || false)
      .field('actions', JSON.stringify(bot.actions) || [])
      .field('data', JSON.stringify(bot.data) || [])
      .field('settings', JSON.stringify(bot.settings) || [])
      .attach('ui', bot.ui)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (!res) {
          console.log('Failed to install a bot. Check if Refocus server is running');
          return;
        }
        const ok = (res.status === 200) || (res.status === 201);
        if (err || !ok) {
          const errorMessage = res.body.errors[0];
          if (errorMessage) {
            if (errorMessage.message === 'name must be unique') {
              reject('duplicate');
            }
          }
          reject(err || !ok);
        } else {
          resolve(res);
        }
      });
  });
}  // installBot

/**
 * Updates existing Bot.
 * Executes a PUT request against Refocus /v1/bots route
 *
 */
function updateBot(bot) {
  return new Promise((resolve, reject) => {
    request
      .put(`${config.refocusUrl}/v1/bots/${bot.name}`)
      .set('Content-Type', 'multipart/form-data')
      .field('name', bot.name)
      .field('url', bot.url)
      .field('active', bot.active || false)
      .field('actions', JSON.stringify(bot.actions) || [])
      .field('data', JSON.stringify(bot.data) || [])
      .field('settings', JSON.stringify(bot.settings) || [])
      .attach('ui', bot.ui)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (!res) {
          console.log('Failed to update a bot. Check if Refocus server is running');
          reject();
        }
        else {
          const ok = (res.status === 200) || (res.status === 201);
          if (err || !ok) {
            const errorMessage = res.body.errors[0];
            if (errorMessage) {
              if (errorMessage.type === 'SequelizeValidationError') {
                reject('validation error');
              }
            }
            reject(err || !ok);
          } else {
            resolve(res);
          }
        }
      });
  });
} // updateBot

// execute installation only when called directly
// via npm run install-bot (skips require statements)
if (require.main === module) {

  const bot = {
    name: botName,
    url: botUrl,
    actions: botActions,
    data: botData,
    settings: botSettings,
    active: true,
    ui: botUi
  };

  // try to update a bot
  // this function is more common then installing a new bot
  // therefore executed first
  updateBot(bot)
  .then(res => {
    console.log(`bot ${botName} successfully updated on: ${config.refocusUrl}`);
  })
  .catch(error => {
    // err not found indicate that bot doesnt exist yet
    if (error == 'Error: Not Found') {
      // installs a new bot in refocus
      installBot(bot)
      .then(res => {
        console.log(`bot ${botName} successfully installed on: ${config.refocusUrl}`);
      })
      .catch(error => {
        console.log(`unable to install bot ${botName} on: ${config.refocusUrl}`);
        console.log(`Details: ${error}`);
      });
    }
    else {
      console.log(`Something went wrong while updating ${botName} on: ${config.refocusUrl}`);
      console.log(`Details: ${error}`);
    }
  });
}

module.exports = { installBot, updateBot };
