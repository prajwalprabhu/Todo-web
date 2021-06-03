var newtodo = function () {
    console.log("new");
};
var removeTodo = function () {
    console.log("remove");
};
var newdiv = document.createElement("div");
newdiv.setAttribute("class", "todo");
fetch("http://localhost:8000/init")
    .then(function (response) {
    // if (response.status === 200) {
    console.log("requested");
    return response.json();
    // }
})
    .then(function (data) {
    for (var index = 0; index < data.length; index++) {
        var element = data[index];
        var nameDiv = document.createElement("div");
        var dateDiv = document.createElement("div");
        var newTodoDiv = document.createElement("div");
        nameDiv.innerText = "Name : " + element.name;
        dateDiv.innerText = "Date : " + element.date;
        newTodoDiv.appendChild(nameDiv);
        newTodoDiv.appendChild(dateDiv);
        newdiv.appendChild(newTodoDiv);
    }
});
// .catch((err) => console.log(`Error :${err}`));
var root = document.getElementById("main");
root.appendChild(newdiv);
