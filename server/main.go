package main

import (
	"fmt"
	"log"
	"millionaire/server/game"
	"net/http"
);

func main() {
	const Port = 8080
	log.Println(fmt.Sprintf("Server is starting on %d", Port))
	http.HandleFunc("/", game.GameHandler)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", Port), nil))
}