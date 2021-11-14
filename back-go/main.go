package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/", Index).Methods("GET")
	r.HandleFunc("/init", Init).Methods("GET")
	r.HandleFunc("/new/{name}/{date}", NewTodo).Methods("POST")
	r.HandleFunc("/rm/{id}", RemoveTodo).Methods("POST")
	log.Fatal(http.ListenAndServe(":8000", r))
}
