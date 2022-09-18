export const MAX_ROWS = 10;
export const MAX_COLS = 10;

export type CellData = { shelled?: boolean; ship?: boolean };
export type RowData = { cells: CellData[] };
export type FieldData = { rows: RowData[] };

export type Coords = { row: number; col: number };

export type PlayerData = { ready: boolean; field: FieldData; secret: string };

export enum gameStages {
  WaitingForPlayer = "WaitingForPlayer",
  Placement = "Placement",
  Game = "Game",
  Done = "Done",
}
export enum Players {
  player0 = "player0",
  player1 = "player1",
}
export type GameData = {
  id: string;
  stage: gameStages;
  turn: Players;
  player0: PlayerData;
  player1: PlayerData;
  winner?: Players;
};

export type GameList = {
  games: {
    id: string;
    timeSinceModified: number;
    playersCount: number;
  }[];
};
