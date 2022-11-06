const { Component } = require("react");

const socket = new WebSocket('ws://localhost:3000/');

socket.onopen = function (event){
  console.dir(event);
  alert('WS-Connection is opened!');
}

socket.onclose = function (event){
  console.dir(event);
  alert('WS-Connection is closed!');
}

socket.onmessage = function(event){
  console.dir(event.data);
}

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      //messages: [],
      msgText: '',
    };
  }
  handleMsg = (e) => { 
    this.setState({msgText: e.target.value});
  };
  sendMsg = (e) => {
    socket.send(this.state.msgText);
  };
  render(){
    return(
    <>
      <input type="textarea" value={this.state.msgText} onChange={this.handleMsg}/>
      <button onClick={this.sendMsg}>Send message</button>
    </>
    );
  }
}

export default App;