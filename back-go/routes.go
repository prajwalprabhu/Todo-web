package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

func Init(rw http.ResponseWriter, r *http.Request) {
	rw.Header().Set("Access-Control-Allow-Origin", "*")

	data := ReadJson()
	rData, err := json.Marshal(data)
	check(err)
	rw.Header().Add("content-type", "application/json")
	rw.Write(rData)

}
func NewTodo(rw http.ResponseWriter, r *http.Request) {
	rw.Header().Set("Access-Control-Allow-Origin", "*")

	params := mux.Vars(r)
	fmt.Println(params)
	data := ReadJson()
	data = append(data, Todo{params["name"], params["date"]})
	WriteJson(data)

}
func Index(rw http.ResponseWriter, r *http.Request) {
	rw.Header().Set("Access-Control-Allow-Origin", "*")
	rw.Write([]byte("Welcome ToDo app  \n Use /init to get data \n /new/name/date to add todo /n /rm/index to remove a todo"))
}
func RemoveTodo(rw http.ResponseWriter, r *http.Request) {
	rw.Header().Set("Access-Control-Allow-Origin", "*")

	params := mux.Vars(r)
	fmt.Println(params)
	data := ReadJson()
	id, _ := strconv.ParseInt(params["id"], 10, 64)
	data = append(data[:id], data[id+1:]...)
	WriteJson(data)
}
