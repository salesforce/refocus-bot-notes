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

var env = process.env.NODE_ENV || 'dev';
const server = ('../config.js')[env];
const currentRoom = window.location.pathname.split( '/' )[1]; //room/{roomNumber}/

/**
 * Returns the settings from Refocus room
 *
 * @returns {Array} - List of key value pairs of room type settings
 */
function getSettings() {
  return genericGet('/room/' + roomNumber).settings;
}

/**
 * Returns the current data values from Refocus room
 *
 * @param botId {String} - the ID for the bot who is doing the actions
 * @param roomNumber {Integer} - OPTIONAL if the room you want to use is not the current room
 * @returns {Map} - Map pairs of data name and data values
 */
function getData(botId, roomNumber) {
  currentRoom = roomNumber !== null ? roomNumber : currentRoom;
  const botData = genericGet('/botData/?roomId=' + currentRoom + '&botID=' + botId);
  let output = {};
  $.each(json, function(data, index) {
    ouput[data.name] = data.value;
  });
  return output;
}

/**
 * Set the data for the bot in a Refocus room
 *
 * @param dataUpdate {JSON} - JSON payload array of fields you want to update
 * @param roomNumber {Integer} - OPTIONAL if the room you want to use is not the current room
 * @returns {Response} - API response
 */
function setData(dataUpdate, roomNumber) {
  currentRoom = roomNumber !== null ? roomNumber : currentRoom;
  return genericPatch('/botData/' + currentRoom, dataUpdate);
}

/**
 * Set an event for the bot
 *
 * @returns {Response} - API response
 */
function setEventLog(event)
{
  return genericPost('/event/', event);
}

/**
 * Returns a list of actions for the bot from Refocus
 *
 * @param botId {String} - the ID for the bot who is doing the actions
 * @param roomNumber {Integer} - OPTIONAL if the room you want to use is not the current room
 * @returns {Array} - List of actions
 */
function getActions(botId, roomNumber) {
  currentRoom = roomNumber !== null ? roomNumber : currentRoom;
  return genericGet('/botAction/?roomId=' + currentRoom + '&botId=' + botId);
}

/**
 * Update an actions response for a Refocus room
 *
 * @param dataUpdate {JSON} - JSON payload array of fields you want to update
 * @param roomNumber {Integer} - OPTIONAL if the room you want to use is not the current room
 * @returns {Response} - API response
 */
function updateAction(dataUpdate, roomNumber) {
  currentRoom = roomNumber !== null ? roomNumber : currentRoom;
  return genericPatch('/botAction/' + currentRoom, dataUpdate);
}

/**
 * Get JSON from server asynchronous
 *
 * @param url {String} - URL for route
 * @returns {JSON} - Route response
 */
 function genericGet(url) {
  $.getJSON(server + url)
  .done(function(json) {
    return json;
  })
  .fail(function(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log( "Request Failed: " + err );
    return err;
  });
}

/**
 * Post JSON to server asynchronous
 *
 * @param url {String} - URL for route
 * @param payload {JSON} - the payload needed for route
 * @returns {JSON} - Route response
 */
 function genericPost(url, payload) {
  $.post(server + url, payload)
  .done(function(json) {
    return json;
  })
  .fail(function(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log( "Request Failed: " + err );
    return err;
  });
}

/**
 * Patch JSON to server asynchronous
 *
 * @param {String} - URL for route
 * @param payload {JSON} - the payload needed for route
 * @returns {JSON} - Route response
 */
 function genericPath(url, payload) {
  $.patch(server + url)
  .done(function(json) {
    return json;
  })
  .fail(function(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log( "Request Failed: " + err );
    return err;
  });
}

/**
 * Polling function that will hit the server over and over
 * to see if there is new updates to data or settings updates for
 * the UI to use. This polling can be replaced with sockets for
 * subscription based updates.
 *
 * @returns {JSON} - Route response
 */
function botUIPolling(){
  setTimeout(function() {
    $.ajax({
      url: server + "/room/" + roomNumber + "/context",
      type: "GET",
      success: function(data) {
        window.dispatchEvent(new CustomEvent('refocus.room.ui.update', {
          uiUpdate: JSON.parse(data),
        }));
      },
      dataType: "JSON",
      complete: botUIPolling,
      timeout: 2000
    })
  }, 5000);
}

/**
 * Polling function that will hit the server over and over
 * to see if there is new updates to data or settings updates for
 * the server to use. This polling can be replaced with sockets for
 * subscription based updates.
 *
 * @returns {JSON} - Route response
 */
function botServerPolling(){
  setTimeout(function() {
    $.ajax({
      url: server + "/botAction/" + roomNumber + "?isPending=true",
      type: "GET",
      success: function(data) {
        window.dispatchEvent(new CustomEvent('refocus.room.server.update', {
          uiUpdate: JSON.parse(data),
        }));
      },
      dataType: "JSON",
      complete: botServerPolling,
      timeout: 2000
    })
  }, 5000);
}