package game

type Choice struct {
	Label string `json:"label"`
	Value string `json:"value"`
	Correct bool `json:"correct"`
}

type Question struct {
	Id int `json:"id"`
	Сhoices []Choice `json:"choices"`
	Value string `json:"value"` 
}

type Level struct {
	Questions []Question `json:"questions"`
	Prize int `json:"prize"`
}

type SingleGameLevel struct {
	Question Question `json:"question"`
	Prize int `json:"prize"`
} 

type GameConfigs = map[string]Level

type SingleGameData = map[string]SingleGameLevel
