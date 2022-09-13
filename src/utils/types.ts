export const MAX_ROWS = 10;
export const MAX_COLS = 10;

export type CellData = { shelled?: boolean; ship?: boolean };
export type RowData = { cells: CellData[] };
export type FieldData = { rows: RowData[] };

export type Coords = { row: number; col: number };

export type PlayerData = { field: FieldData };

export enum gameStages {
  WaitingForPlayer = "WaitingForPlayer",
  Placement = "Placement",
  Game = "Game",
}

export type GameData = {
  id: string;
  stage: gameStages;
  turn: number;
  player0: PlayerData;
  player1: PlayerData;
};
