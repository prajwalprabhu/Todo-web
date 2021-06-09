interface Todo {
  name: String;
  date: String;
}
let mainData: Array<Todo> = [];
let newtodo = () => {
  let name = prompt("Enter Name of new Todo");
  let date = prompt("Enter Date of new Todo");
  fetch(`http://localhost:8000/new/${name}/${date}`).then((res) => {
    init();
  });
};

let removeTodo = () => {
  console.log("remove");
  let index = prompt(`Enter index of todo to be removed 0..${mainData.length}`);
  if (index != null) {
    let indexi = parseInt(index);
    if (indexi >= 0 && indexi < mainData.length) {
      fetch(`http://localhost:8000/rm/${indexi}`).then((res) => {
        init();
      });
    }
  }

  // if (index>=0 && index )
};

let init = () => {
  let newdiv = document.createElement("div");
  newdiv.setAttribute("class", "todo");

  fetch("http://localhost:8000/init")
    .then((response) => {
      // if (response.status === 200) {
      console.log("requested");
      return response.json();
      // }
    })
    .then((data) => {
      mainData = data;
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        let nameDiv = document.createElement("div");
        let dateDiv = document.createElement("div");
        let indexDiv = document.createElement("div");
        let newTodoDiv = document.createElement("div");
        nameDiv.innerText = `Name : ${element.name}`;
        dateDiv.innerText = `Date : ${element.date}`;
        indexDiv.innerText = `Index :${index}`;
        newTodoDiv.appendChild(indexDiv);
        newTodoDiv.appendChild(nameDiv);
        newTodoDiv.appendChild(dateDiv);
        newdiv.appendChild(newTodoDiv);
      }
    })
    .catch((err) => {
      console.log(`Error :${err}`);
      alert(`Error ${err}`);
    });
  let root = document.getElementById("main")!;
  root.innerHTML = "";
  root.appendChild(newdiv);
};

init();
