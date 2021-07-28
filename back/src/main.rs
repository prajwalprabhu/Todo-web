#![feature(proc_macro_hygiene, decl_macro)]
#[macro_use]
extern crate rocket;
use serde_derive::{Deserialize, Serialize};
use serde_json::to_string;

use std::{
    fs::{File, OpenOptions},
    io::{Read, Write},
};

#[derive(Serialize, Deserialize, Debug, Clone)]
struct Todo {
    name: String,
    date: String,
}

#[get("/")]
fn index() -> String {
    "Welcome ToDo app  \n Use /init to get data \n /new/name/date to add todo /n /rm/index to remove a todo".to_string()
}

#[get("/new/<name>/<date>")]
fn new_todo(name: String, date: String) -> String {
    let newtodo = Todo { name, date };
    let mut data = read_json();
    data.append(&mut vec![newtodo]);
    write_json(data);

    " ".to_string()
}

#[get("/init")]
fn init_app() -> String {
    // format!("{:?}", read_json())
    to_string(&read_json()).unwrap()
    // read_json().to_string()
    // String::new()
}

#[get("/rm/<index>")]
fn remove_todo(index: usize) {
    let mut data = read_json();
    data.remove(index);
    write_json(data);
}
fn write_json(data: Vec<Todo>) {
    let mut f = OpenOptions::new()
        .write(true)
        .truncate(true)
        .open("./data.json")
        .unwrap();
    // let buff = forma
    f.write(to_string(&data).unwrap().as_bytes()).unwrap();
    f.flush().unwrap();
}

fn read_json() -> Vec<Todo> {
    let f = OpenOptions::new()
        .write(true)
        .read(true)
        .open("./data.json");
    if let Ok(mut file) = f {
        println!("{:?}", file);
        let mut buff = Vec::<u8>::new();
        file.read_to_end(&mut buff).expect("msg");
        let result = String::from_utf8(buff).expect("msg");
        let jresult: Result<Vec<Todo>, _> = serde_json::from_str(&result);
        let mut fresult = Vec::<Todo>::new();
        if jresult.is_ok() {
            fresult = jresult.unwrap();
        } else {
        }
        fresult
    } else {
        let mut file = File::create("./data.json").expect("Failed to create FIle:");
        file.write(b"[]").expect("filljson");
        file.flush().unwrap();
        read_json()
    }
}
use rocket::fairing::{Fairing, Info, Kind};
use rocket::http::Header;
use rocket::{Request, Response};

pub struct CORS;

impl Fairing for CORS {
    fn info(&self) -> Info {
        Info {
            name: "Add CORS headers to responses",
            kind: Kind::Response,
        }
    }

    fn on_response(&self, _request: &Request, response: &mut Response) {
        response.set_header(Header::new("Access-Control-Allow-Origin", "*"));
        response.set_header(Header::new(
            "Access-Control-Allow-Methods",
            "POST, GET, PATCH, OPTIONS",
        ));
        response.set_header(Header::new("Access-Control-Allow-Headers", "*"));
        response.set_header(Header::new("Access-Control-Allow-Credentials", "true"));
    }
}
fn main() {
    rocket::ignite()
        .mount("/", routes![index, new_todo, init_app, remove_todo])
        .attach(CORS)
        .launch();
}
