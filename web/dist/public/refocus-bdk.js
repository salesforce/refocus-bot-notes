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
 * Get JSON from server asynchronous
 *
 * @param url {String} - URL for route
 * @returns {JSON} - Route response
 */
function genericGet(api, endPoint, options) {
    const url = createURL(api, endPoint, options);
    $.ajax({
        url: url,
        crossDomain: true,
        type: "GET",
        success: function(data) {
            createEvents(data);
        },
        dataType: "JSON",
        complete: function(data) {
            console.log('Polled ' + url);
        },
        timeout: 2000
    })
}
/**
 * Post JSON to server asynchronous
 *
 * @param url {String} - URL for route
 * @param payload {JSON} - the payload needed for route
 * @returns {JSON} - Route response
 */
function genericPost(api, endPoint, options, payload) {
    const url = createURL(api, endPoint, options);
    $.ajax({
      type: "POST",
      url: url,
      dataType: "JSON",
      crossDomain: true,
      contentType:"application/json; charset=utf-8",
      data: JSON.stringify(payload),
      success: function(data) {
        console.log(data);
      },
      complete: function(data) {
        console.log(data);
      }
    });
}
/**
 * Patch JSON to server asynchronous
 *
 * @param {String} - URL for route
 * @param payload {JSON} - the payload needed for route
 * @returns {JSON} - Route response
 */
function genericPatch(api, endPoint, options, payload) {
    const url = createURL(api, endPoint, options);
    $.ajax({
      type: "PATCH",
      url: url,
      dataType: "JSON",
      crossDomain: true,
      contentType:"application/json; charset=utf-8",
      data: JSON.stringify(payload),
      success: function(data) {
        console.log(data);
      },
      complete: function(data) {
        console.log(data);
      }
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
function pollingUI(api, endPoint, options) {
    const url = createURL(api, endPoint, options);
    setInterval(function() {
        $.ajax({
            url: url,
            crossDomain: true,
            type: "GET",
            success: function(data) {
                createEvents(data, endPoint);
            },
            dataType: "JSON",
            complete: function(data) {
                console.log('Polled ' + url);
            },
            timeout: 2000
        })
    }, 5000);
}

function createEvents(data, endPoint) {
    if(endPoint === 'events'){
        if (data.length > 0) {
            var duration = moment.duration(moment().diff(moment(data[data.length - 1].updatedAt))).asSeconds();
            if (duration < 8) {
                document.body.dispatchEvent(new CustomEvent('refocus.events', {
                    detail: data,
                }));
            }
        }
    }

    if(endPoint === 'botActions'){
        if (data.length > 0) {
            const recentAction = data[data.length - 1];
            var duration = moment.duration(moment().diff(moment(recentAction.updatedAt))).asSeconds();
            if (duration <= 5) {
                if(recentAction.response){
                    document.body.dispatchEvent(new CustomEvent('refocus.room.actions', {
                        detail: recentAction,
                    }));
                }
            }
        }
    }
}

function createURL(api, endPoint, options){
    let url = api + endPoint + '?';
    if(options !== null){
        for (var prop in options) {
            url += prop + '=' + options[prop] + '&';
        }
    }
    return url;
}

module.exports = {
  genericPost: genericPost
};