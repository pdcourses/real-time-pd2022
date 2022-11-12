import React, { Component } from "react";
import {emitJoinToRoom, emitMessage} from './api/ws/api.js';
import socket from "./api/ws/index.js";
import MsgList from "./components/MsgList/index.jsx";
import styles from './App.css';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      room1: {messages: []},
      room2: {messages: []},
      currentRoom: 'room1',
      message: '',
    };
  }

  componentDidMount(){
    socket.on('new_message', this.handlerNewMsg);
  }

  handlerNewMsg = (room, message) => {
    this.setState({
      [room]: {messages: [...this.state[room].messages], message}
    })
  }

  switchRoom = (e) => {
    this.setState({currentRoom: e.target.value});
  }

  sendMsg = () => {
    const {currentRoom, message} = this.state;
    emitMessage(currentRoom, message);
    this.setState({message: ''});
  }

  setNewMsg = (e) => {
    this.setState({message: e.target.value});
  }

  render(){
    const {currentRoom, message, room1: {messages: room1Msg}, room2: {messages: room2Msg}} = this.state;
    return(
    <>
      <div className={styles.room_container}>
        <MsgList messages={room1Msg} />
        <MsgList messages={room2Msg} />
      </div>
      <label>
        <input type="radio" name={'currentRoom'} value={'room1'} checked={currentRoom === 'room1'} onChange={this.switchRoom} />
        <span>Sending to room1</span>
      </label>
      <br />
      <label>
        <input type="radio" name={'currentRoom'} value={'room2'} checked={currentRoom === 'room2'} onChange={this.switchRoom} />
        <span>Sending to room2</span>
      </label>
      <div>
        <input type="text" value={message} onChange={this.setNewMsg} />
        <button onClick={this.sendMsg}>Send message</button>
      </div>
    </>
  );
}
}
export default App;