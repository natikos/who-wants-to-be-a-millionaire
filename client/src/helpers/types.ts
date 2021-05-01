export enum GameStatus {
  START = 'START',
  PLAYING = 'PLAYING',
  OVER = 'OVER',
}

export type RoutePath = '/start' | '/end' | '/';
export type ChoiceState = 'inactive' | 'correct' | 'wrong' | 'selected';
export type LevelValueState = 'passed' | 'upcoming' | 'current';

export type GameRoute = {
  [key in 'start' | 'game' | 'end']: RoutePath;
};

export interface IOnChooseAnswer {
  (value: string): void;
}

export interface ILevelValue {
  levelId: string;
  prize: number;
}
