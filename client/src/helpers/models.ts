export interface IAnswerChoice {
  label: string;
  value: string;
  correct?: boolean;
}

export interface IQuestion {
  id: number;
  question: string;
  choices: IAnswerChoice[];
}

export interface ILevel {
  data: IQuestion;
  prize: number;
}

export interface IGameData {
  [level: string]: ILevel;
}
