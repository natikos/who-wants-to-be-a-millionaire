export enum GameStatus {
  START = 'START',
  PLAYING = 'PLAYING',
  OVER = 'OVER',
}

export type RoutePath = '/start' | '/end' | '/';

export type GameRoute = {
  [key in 'start' | 'game' | 'end']: RoutePath;
};
