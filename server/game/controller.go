package game

import (
	"encoding/json"
	"net/http"
)

func GameHandler(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	response.Header().Set("Content-Type", "application/json")
	gameData, err := getGameLevels(response)
	if err != nil {
		return
	}
	responseDto := getQuestionPerLevel(gameData)
	json.NewEncoder(response).Encode(responseDto)
}