import React, { Component } from "react";
import axios from "./axios";
interface Todo {
  name: string;
  date: string;
}
export default class App extends Component {
  state = {
    data: [] as Todo[],
  };
  componentDidMount = () => {
    this.getData();
  };
  getData = async () => {
    let res = await axios.get("/init");
    this.setState({ data: res.data });
  };
  newTodo = () => {
    let name = prompt("Enter Name of new Todo");
    let date = prompt("Enter Date of new Todo");
    axios.post(`/new/${name}/${date}`).then((res) => {
      this.getData();
    });
  };
  rmTodo = () => {
    let { data } = this.state;
    let index = prompt(
      `Enter index of todo to be removed 0..${data.length - 1}`
    );
    if (index != null) {
      let indexi = parseInt(index);
      if (indexi >= 0 && indexi < data.length) {
        axios.post(`/rm/${indexi}`).then((res) => {});
      }
    }
    this.getData();
  };
  render() {
    return (
      <div>
        <div className='head'>ToDo Handler</div>
        <button onClick={this.newTodo}>New </button>
        <button onClick={this.rmTodo}>Remove</button>
        <div className='todo'>
          {this.state.data.map((todo, index) => {
            return (
              // <h1></h1>
              <div key={index}>
                <div>{index}</div>
                <div>{todo.name}</div>
                <div>{todo.date}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
