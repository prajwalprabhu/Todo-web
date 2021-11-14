package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"os"
)

func WriteJson(data []Todo) {
	dataa, _ := json.MarshalIndent(data, "", "\t")
	ioutil.WriteFile("./data.json", dataa, 0644)

}

func ReadJson() []Todo {
	data, err := os.ReadFile("./data.json")
	check(err)
	dataJson := make([]Todo, 2)
	err = json.Unmarshal(data, &dataJson)
	check(err)
	return dataJson
}

func check(err error) {
	if err != nil {
		log.Fatal(err)
	}
}
