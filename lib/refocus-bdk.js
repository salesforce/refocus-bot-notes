/**
 * Copyright (c) 2017, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or
 * https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * /lib/refocus-bdk.js
 *
 * This package is utility package for bot development to speed up development
 * and consolidate commonly used functions.
 *
 */

/**
 * Returns the settings from Refocus room
 *
 * @returns {Array} - List of key value pairs of room type settings
 */
function getSettings() {
  const room = genericGet('/room/'+roomNumber);
  const roomType = room.type;
  return genericGet('/roomType/' + roomType).settings;
}

/**
 * Returns the current data values from Refocus room
 *
 * @returns {Map} - Map pairs of data name and data values
 */
function getData() {
  const botData = genericGet('/botData/?roomId=' + roomNumber + '&botID=' + botId);
  let output = {};
  $.each(json, function(data, index) {
    ouput[data.name] = data.value;
  });
  return output;
}

/**
 * Set the data for the bot in a Refocus room
 *
 * @returns {Response} - API response
 */
function setData() {
  return null;
}

/**
 * Set an event for the bot
 *
 * @returns {Response} - API response
 */
function setEventLog()
{
  return null;
}

/**
 * Returns a list of actions for the bot from Refocus
 *
 * @returns {Array} - List of actions
 */
function getActions() {
  return genericGet('/botAction/?roomId=' + roomNumber + '&botId=' + botId);
}

/**
 * Update an actions response for a Refocus room
 *
 * @returns {Response} - API response
 */
function updateAction() {
  return null;
}

 /**
  * Get JSON from server async
  *
  * @param {String} - URL for route
  * @returns {JSON} - Route response
  */
  function genericGet(url) {
    $.getJSON(url)
  	.done(function(json) {
  	  return json;
    })
    .fail(function(jqxhr, textStatus, error) {
      var err = textStatus + ", " + error;
      console.log( "Request Failed: " + err );
      return err;
    });
  }