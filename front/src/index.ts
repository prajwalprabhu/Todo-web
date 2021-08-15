interface Todo {
  name: string;
  date: string;
}
const url = "http://localhost:8000";

$(() => {
  $("button#newTodo").on("click", function () {
    let _name = prompt("Enter Name of new Todo");
    let _date = prompt("Enter Date of new Todo");
    $.post(`${url}/new`, { name: _name, date: _date }, function () {
      init();
    });
  });
  $("button#rmTodo").on("click", function () {
    let index = prompt(`Enter index of todo to be removed `);
    if (index != null) {
      let indexi = parseInt(index);
      $.post(`${url}/rm/${indexi}`,()=>{
        init()
      });
    }
  });
  const init = () => {
    $.get(`${url}/init`, (data, status) => {
      let main = $("div#main");
      main.empty();
      let todos = data as Todo[];
      todos.map((todo, i) => {
        let nameDiv = $("<div></div>").text(todo.name);
        let dateDiv = $("<div></div>").text(todo.date);
        let indexDiv = $("<div></div>").text(`${i}`);
        let newTodoDiv = $("<div></div>").append(indexDiv, nameDiv, dateDiv);
        main.addClass("todo");
        main.append(newTodoDiv);
      });
    });
  };
  init();
});
