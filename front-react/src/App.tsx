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
    url: "http://localhost:8000/init",
    data: [] as Todo[],
  };
  getData = () => {
    fetch(this.state.url)
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
  render() {
    console.log(this.state.data);

    return (
      <div className="todo">
        {this.state.data.map((todo) => {
          return (
            // <h1></h1>
            <div>
              <div>{todo.name}</div>
              <div>{todo.date}</div>
            </div>
          );
        })}
      </div>
    );
  }
}
