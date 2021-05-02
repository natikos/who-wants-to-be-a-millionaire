package game

import (
	"encoding/json"
	"net/http"
	"time"
)

func GameHandler(writer http.ResponseWriter, request *http.Request) {
	start := time.Now()
	gameData, gameDataErr := getGameLevels(writer)
	if gameDataErr != nil {
		return
	}
	responseDto := getQuestionPerLevel(gameData)
	writer.Header().Set("X-Response-Time", (time.Since(start) * time.Microsecond).String())
	json.NewEncoder(writer).Encode(responseDto)
}