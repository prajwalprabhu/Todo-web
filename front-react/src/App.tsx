import React, { Component } from "react";
interface Todo {
  name: string;
  date: string;
}
interface TodoProps {
  // name:string
}
export default class App extends Component {
  constructor(props: TodoProps) {
    super(props);
    this.getData();
  }
  state = {
    count: 0,
    url: "http://localhost:8000/",
    data: [] as Todo[],
  };
  getData = () => {
    fetch(`${this.state.url}/init`)
      .then((rs) => {
        return rs.json();
      })
      .then((rj) => {
        this.setState({ data: rj as Todo[] });
      })
      .catch((err) => {
        alert(`Error :${err}`);
      });
  };
  inc = () => {
    this.setState({ count: this.state.count + 1 });
  };
  newTodo = () => {
    let name = prompt("Enter Name of new Todo");
    let date = prompt("Enter Date of new Todo");
    fetch(`${this.state.url}/new/${name}/${date}`).then((res) => {
      this.getData();
    });
  };
  rmTodo = () => {
    let { data } = this.state;
    let index = prompt(`Enter index of todo to be removed 0..${data.length}`);
    if (index != null) {
      let indexi = parseInt(index);
      if (indexi >= 0 && indexi < data.length) {
        fetch(`${this.state.url}/rm/${indexi}`).then((res) => {});
      }
    }
    this.getData();
  };
  render() {
    console.log(this.state.data);

    return (
      <div>
        <div className="head">ToDo Handler</div>
        <button onClick={this.newTodo}>New </button>
        <button onClick={this.rmTodo}>Remove</button>
        <div className="todo">
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
