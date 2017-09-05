const React=require('react');
const bdk = require('../dist/public/refocus-bdk');

class App extends React.Component{

  sendAction(){
    const actionObject = {
      "name": "buttonPressed", 
      "botId": "", //Bot ID must go here with correct actions.param etc 
      "roomId": 1,
      "isPending": true,
      "parameters": [
        {
          "name": "message",
          "value": "Hey, Action was Posted"
        }
       ]
    }

    bdk.genericPost('http:/' + '/localhost:3000/v1/', 'botActions', null, actionObject);
  }
  
  render(){
    return(
      <div style = {{width: '30%', margin: 'auto', paddingTop: '20px', textAlign: 'center'}}>
        <button type="button" onClick={this.sendAction}>POST to Bot Actions!!!</button>
      </div>
    )
  }
}

module.exports=App;
