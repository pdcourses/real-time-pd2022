import React, { Component } from "react";
import {wsTest} from './api/ws/api.js';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }
  render(){
    return(
    <>
      <button onClick={ () => wsTest('test', {name: 'Vasya'})}>Send message</button>
    </>
  );
}
}
export default App;