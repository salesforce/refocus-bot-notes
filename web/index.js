
/**
 * Copyright (c) 2017, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or
 * https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * /web/index.js
 *
 * This code handles intial render of the bot and any rerenders triggered
 * from javascript events.
 */

const React = require('react');
const ReactDOM = require('react-dom');
const App = require('./components/App.jsx');
const env = process.env.NODE_ENV || 'dev';
const config = require('../config.js')[env];
const bdk = require('@salesforce/refocus-bdk')(config);
const botName = require('../package.json').name;
let currentNotes = {};
const userName = bdk.getUserName();
const roomId = bdk.getRoomId();
const ZERO = 0;

/**
 * When a refocus.bot.data is dispatch it is handled here.
 *
 * @param {BotData} data - Bot Data object that was dispatched
 */
function handleData(data) {
  const newNotes = JSON.parse(data.detail.value)[userName];
  renderUI(newNotes);
}

// The actions to take place before load.
function init() {
  bdk.getBotData(roomId)
    .then((data) => {
      const _notes =
        data.body.filter((bd) => bd.name === 'notesBotNotes')[ZERO];

      if (_notes) {
        currentNotes = JSON.parse(_notes.value);
        if (!currentNotes[userName]) {
          currentNotes[userName] = '';
          bdk.changeBotData(_notes.id, JSON.stringify(currentNotes));
        }
      } else {
        currentNotes = _notes ? JSON.parse(_notes.value) : {};
        currentNotes[userName] = '';
        bdk.createBotData(roomId, botName, 'notesBotNotes',
          JSON.stringify(currentNotes));
      }

      renderUI(currentNotes[userName]);
    });
}

document.getElementById(botName).addEventListener('refocus.bot.data',
  handleData, false);

// Render the react components with the data and templates needed.
function renderUI(notes){
  ReactDOM.render(
    <App
      notes={ notes }
      userName={ userName }
      roomId={ roomId }
    />,
    document.getElementById(botName)
  );
}

init();
