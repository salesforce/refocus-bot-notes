/**
 * Copyright (c) 2017, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or
 * https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * /web/components/App.js
 *
 * Main component for UI build
 *
 */

const React=require('react');
const bdk = require('../../lib/refocus-bdk.js');

class App extends React.Component{

  render(){
    return(<div><center>Welcome to the refocus-bot-scaffold!</center></div>)
  }
}

module.exports=App;
