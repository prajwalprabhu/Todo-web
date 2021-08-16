import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "./axios";

interface Todo {
  name: string;
  date: string;
}

const App = () => {
  const [todo, setTodo] = useState([] as Todo[]);
  const fetchData = async () => {
    let res = await axios.get("/init");
    setTodo(res.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const newTodo = () => {
    let _name = prompt("Enter Name of new Todo");
    let _date = prompt("Enter Date of new Todo");
    if (_name != null && _date != null) {
      axios.post(`/new/${_name}/${_date}`);
      fetchData();
    }
  };
  const rmTodo = () => {
    // let { data } = this.state;
    let index = prompt(
      `Enter index of todo to be removed 0..${todo.length - 1}`
    );
    if (index != null) {
      let indexi = parseInt(index);
      if (indexi >= 0 && indexi < todo.length) {
        axios.post(`/rm/${indexi}`);
        fetchData();
      }
    }
  };
  return (
    <div>
      <div className='head'>ToDo Handler</div>
      <button onClick={newTodo}>New </button>
      <button onClick={rmTodo}>Remove</button>
      <div className='todo'>
        {todo.map((todo, index) => {
          return (
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
};

export default App;
