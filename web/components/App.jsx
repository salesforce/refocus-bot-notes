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

import PropTypes from 'prop-types';
const React=require('react');
const { env } = require('../../config.js');
const config = require('../../config.js')[env];
const bdk = require('@salesforce/refocus-bdk')(config);
const serialize = require('serialize-javascript');
const botName = require('../../package.json').name;
const ZERO = 0;

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userName: props.userName,
      notes: props.notes,
      roomId: props.roomId,
    };

    this.updateNotes = this.updateNotes.bind(this);
    this.componentCleanup = this.componentCleanup.bind(this);
  }

  componentDidMount(){
    window.addEventListener('beforeunload', this.componentCleanup);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notes) {
      this.setState({ notes: nextProps.notes });
    }
  }

  updateNotes(note) {
    const { roomId, userName } = this.state;
    bdk.getBotData(roomId, botName)
      .then((data) => {
        const oldNotes =
          data.body.filter((bd) => bd.name === 'notesBotNotes')[ZERO];
        const newNotes = JSON.parse(oldNotes.value);
        newNotes[userName] = note;
        bdk.changeBotData(oldNotes.id, serialize(newNotes));
      });
  }

  componentWillUnmount() {
    this.componentCleanup();
    // remove the event handler for normal unmounting
    window.removeEventListener('beforeunload', this.componentCleanup);
  }

  componentCleanup() {
    this.updateNotes(this.refs.notesBotDiv.innerHTML);
  }

  render() {
    const message = this.state.notes;
    const containerClass = 'slds-form slds-form_stacked' +
      'slds-p-horizontal_medium';



    const richTextNoteClass =
      'slds-rich-text-area__content slds-text-color_weak slds-grow';

    const richTextNoteStyle = {
      backgroundColor: '#b2ecff',
      borderRadius: '0px',
      marginTop: '-0.75rem'
    };

    return (
      <div className={containerClass}>
        <div
          className="slds-rich-text-editor__textarea slds-grid"
          style={{ height: '200px' }}
        >
          <div ref="notesBotDiv"
            contentEditable
            suppressContentEditableWarning
            className={richTextNoteClass}
            style={richTextNoteStyle}
            dangerouslySetInnerHTML={{ __html: message }}
            onBlur={() => this.updateNotes(this.refs.notesBotDiv.innerHTML)}>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes={
  roomId: PropTypes.number,
  notes: PropTypes.string,
  userName: PropTypes.string
};

module.exports=App;
