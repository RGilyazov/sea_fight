import path from "path";
import {
  GameData,
  RowData,
  MAX_COLS,
  MAX_ROWS,
  gameStages,
  FieldData,
} from "./types";
const fsAsync = require("fs").promises;
const ROOT_DIR = path.join(process.cwd(), "data/");

function gameFilePath(id: string) {
  return ROOT_DIR + `/games/game/${id}.json`;
}

export const gameAPI = {
  getGame,
};
export async function getGameChangeTime(id: string) {
  try {
    const stats = await fsAsync.stat(gameFilePath(id));
    return stats.mtime;
  } catch (error) {
    return undefined;
  }
}
export async function getGame(id: string): Promise<GameData> {
  try {
    const jsonData = await fsAsync.readFile(gameFilePath(id), "utf8");
    return JSON.parse(jsonData);
  } catch (error) {
    return createGame(id);
  }
}

async function getGameForPlayer(id: string) {
  const game = await getGame(id);
  //to do
}

function CreateRow(): RowData {
  const res: RowData = { cells: [] };
  for (let i = 0; i < MAX_COLS; i++) {
    res.cells.push({});
  }
  return res;
}
function createField(): FieldData {
  const rows = [];
  for (let i = 0; i < MAX_ROWS; i++) {
    rows.push(CreateRow());
  }
  const res: FieldData = { rows: rows };
  return res;
}

export async function createGame(id: string): Promise<GameData> {
  const res: GameData = {
    id,
    stage: gameStages.WaitingForPlayer,
    turn: 0,
    player0: { field: createField() },
    player1: { field: createField() },
  };
  saveGame(res);
  return res;
}
export async function saveGame(GameData: GameData) {
  const jsonData = JSON.stringify(GameData);
  await fsAsync.writeFile(gameFilePath(GameData.id), jsonData);
}
