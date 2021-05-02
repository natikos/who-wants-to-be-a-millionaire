export interface IChoice {
  label: string;
  value: string;
  correct: boolean;
}

export interface IQuestion {
  id: number;
  value: string;
  choices: IChoice[];
}

export interface ILevel {
  question: IQuestion;
  prize: number;
}

export interface IGameData {
  [level: string]: ILevel;
}
