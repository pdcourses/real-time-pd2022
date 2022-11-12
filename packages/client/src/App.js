import React, { Component } from "react";
import {chatSocket} from './api/ws';
import MsgList from "./components/MsgList/index.jsx";
import styles from "./App.css";
import UsersList from "./components/UsersList/index.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: new Map(),
      currentUser: "",
      message: "",
    };
  }

  componentDidMount(){
    chatSocket.emit('get-users');
    chatSocket.on('get-users', (users) => {
      console.log('users:',users);
      const usersMap = new Map();
      users.forEach( (u) => {
        usersMap.set(u, []);
      });
      this.setState({
        users: usersMap,
      });
    });
    chatSocket.on('new-user', this.addUser);
    chatSocket.on('user-leave', this.deleteUser);
    chatSocket.on('private-message', (m) => {
      this.state.users.get(m.owner).push(m);
      this.setState({
        users: this.state.users,
      });
    });

  }


  selectUser = (user) => {
    this.setState({ currentUser: user });
  };

  addUser = (id) => {
    this.state.users.set(id, []);
    this.setState({ users: this.state.users });
  };

  deleteUser = (id) => {
    this.state.users.delete(id);
    this.setState({ users: this.state.users });
  };

  setNewMsg = (e) => {
    this.setState({message: e.target.value});
  }

  sendMsg = () => {
    if (this.state.currentUser) {
      this.state.users.get(this.state.currentUser).push({
        body: this.state.message,
        timestamp: new Date(),
      });
      chatSocket.emit("send-message", this.state.currentUser, {
        body: this.state.message,
        timestamp: new Date(),
      });
      this.setState({ message: "" });
    }
  };
  render() {
    return (
      <>
        <UsersList
          onSelect={this.selectUser}
          users={[...this.state.users.keys()]}
          currentUser={this.state.currentUser}
        />
        <div>
          <MsgList messages={this.state.users.get(this.state.currentUser)} />
          <div>
            <input type="text" value={this.state.message} onChange={this.setNewMsg} />
            <button onClick={this.sendMsg}>send msg</button>
          </div>
        </div>
      </>
    );
  }
}
export default App;
