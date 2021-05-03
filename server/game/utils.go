package game

import (
	_ "embed"
	"encoding/json"
	"log"
	"net/http"
)

type HttpError struct {
	Message string `json:"message"`
}

//go:embed data.json
var file []byte

func getGameLevels(response http.ResponseWriter) (GameConfigs, *HttpError) { 
	handleFailure := func (err error, message string) (*HttpError, bool) {
		if err != nil {
			httpError := HttpError{Message: message}
			response.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(response).Encode(httpError)
			return &httpError, true
		}
		return nil, false
	}

	var data GameConfigs

	parsingJsonError := json.Unmarshal(file, &data)

	if err, isError := handleFailure(parsingJsonError, "Invalid path to config file"); isError && err != nil {
		return nil, err
	}
	
	log.Println("File was parsed")

	return data, nil
}

func getQuestionPerLevel(data GameConfigs) SingleGameData {
	QuestionPerLevel := SingleGameData{}
	for levelId, levelData := range data {
		QuestionPerLevel[levelId] = SingleGameLevel{
			Question: levelData.Questions[0],
			Prize: levelData.Prize,
		}
	}
	return QuestionPerLevel
}