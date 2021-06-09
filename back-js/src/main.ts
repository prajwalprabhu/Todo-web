import express from "express";
import { join } from "path";
import * as fs from "fs";
let app = express();
interface Todo {
  Name: string;
  Date: string;
}
app.get("/", (req, res) => {
  res.send("<H1> Hello World insode nodemon!!!!! </h1>");
});
app.get("/new/:name/:date", (req, res) => {
  const data = read();
  // console.log(data);
  res.sendFile(join(__dirname, "/data.json"), (err) => {
    console.log(err);
  });
});

const read = (): string => {
  let dataa: string = "";
  fs.readFile("./data.json", (err, data) => {
    if (err === null) {
      console.log(data.toString());
      dataa = data.toString();
    }
  });
  return dataa;
};

app.listen("8000", () => console.log(`Started server`));
