let newtodo = () => {
  console.log("new");
};

let removeTodo = () => {
  console.log("remove");
};

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
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      let nameDiv = document.createElement("div");
      let dateDiv = document.createElement("div");
      let newTodoDiv = document.createElement("div");
      nameDiv.innerText = `Name : ${element.name}`;
      dateDiv.innerText = `Date : ${element.date}`;
      newTodoDiv.appendChild(nameDiv);
      newTodoDiv.appendChild(dateDiv);
      newdiv.appendChild(newTodoDiv);
    }
  });
// .catch((err) => console.log(`Error :${err}`));

let root = document.getElementById("main")!;
root.appendChild(newdiv);
