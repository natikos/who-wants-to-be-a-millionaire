package main

import (
	"fmt"
	"log"
	"millionaire/server/game"
	"millionaire/server/utils"
	"net/http"
)

func main() {
	const Port = 8080
	log.Println(fmt.Sprintf("Server is starting on %d", Port))
	http.HandleFunc("/", utils.EndpointHandler(game.GameHandler))
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", Port), nil))
}