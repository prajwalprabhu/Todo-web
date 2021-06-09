var mainData = [];
var newtodo = function () {
    var name = prompt("Enter Name of new Todo");
    var date = prompt("Enter Date of new Todo");
    fetch("http://localhost:8000/new/" + name + "/" + date).then(function (res) {
        init();
    });
};
var removeTodo = function () {
    console.log("remove");
    var index = prompt("Enter index of todo to be removed 0.." + mainData.length);
    if (index != null) {
        var indexi = parseInt(index);
        if (indexi >= 0 && indexi < mainData.length) {
            fetch("http://localhost:8000/rm/" + indexi).then(function (res) {
                init();
            });
        }
    }
    // if (index>=0 && index )
};
var init = function () {
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
        mainData = data;
        for (var index = 0; index < data.length; index++) {
            var element = data[index];
            var nameDiv = document.createElement("div");
            var dateDiv = document.createElement("div");
            var indexDiv = document.createElement("div");
            var newTodoDiv = document.createElement("div");
            nameDiv.innerText = "Name : " + element.name;
            dateDiv.innerText = "Date : " + element.date;
            indexDiv.innerText = "Index :" + index;
            newTodoDiv.appendChild(indexDiv);
            newTodoDiv.appendChild(nameDiv);
            newTodoDiv.appendChild(dateDiv);
            newdiv.appendChild(newTodoDiv);
        }
    })["catch"](function (err) {
        console.log("Error :" + err);
        alert("Error " + err);
    });
    var root = document.getElementById("main");
    root.innerHTML = "";
    root.appendChild(newdiv);
};
init();
