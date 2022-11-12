import React, { Component } from "react";
import {} from "./api/ws/api.js";
import socket from "./api/ws/index.js";
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
    socket.emit('get-users');
    socket.on('get-users', (users) => {
      const usersMap = new Map();
      usersMap.forEach( (u) => {
        usersMap.set(u, []);
      });
      this.setState({
        users: usersMap,
      });
    });
    socket.on('new-user', this.addUser);
    socket.on('leave-user', this.deleteUser);
    socket.on('private-new-msg', (m) => {
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
    this.setState({ users: this.setState.users });
  };

  deleteUser = (id) => {
    this.state.users.delete(id);
    this.state.users.delete(id);
    this.setState({ users: this.state.users });
  };

  setNewMsg = (e) => {
    this.setState({message: e.target.value});
  }

  sendMsg = () => {
    if (this.state.currentUser) {
      this.state.currentUser.length(this.state.currentUser).push({
        body: this.state.message,
        timestamp: new Date(),
      });
      socket.emit("send-new-msg", this.state.currentUser, {
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
