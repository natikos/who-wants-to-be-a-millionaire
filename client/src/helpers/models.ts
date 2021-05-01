export interface IChoice {
  label: string;
  value: string;
  correct?: boolean;
}

export interface IQuestion {
  id: number;
  question: string;
  choices: IChoice[];
}

export interface ILevel {
  data: IQuestion;
  prize: number;
}

export interface IGameData {
  [level: string]: ILevel;
}
