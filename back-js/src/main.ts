import express from "express";
import * as fs from "fs";
let app = express();
interface Todo {
  name: string;
  date: string;
}
app.get("/", (req, res) => {
  res.send(
    "<h1>Welcome ToDo app  </h1><br>Use /init to get data <br> /new/name/date to add todo<br> /rm/index to remove a todo"
  );
});
app.get("/init", (req, res) => {
  let data = read();
  res.send(data);
});
app.get("/new/:_name/:_date", (req, res) => {
  const data = read();
  console.log(req.params);
  let { _name, _date } = req.params;
  data.push({ name: _name, date: _date });
  write(data);
  res.send();
});
app.get("/rm/:index", (req, res) => {
  let { index } = req.params;
  let i = parseInt(index);
  let data = read();
  if (i > -1) {
    data.splice(i, 1);
  }
  write(data);
  res.send();
});
const read = (): Todo[] => {
  return JSON.parse(fs.readFileSync("./src/data.json", "utf8"));
};
const write = (data: Todo[]) => {
  let datas = JSON.stringify(data);
  fs.writeFileSync("./src/data.json", datas);
};
app.listen("8000", () => console.log(`Started server`));
