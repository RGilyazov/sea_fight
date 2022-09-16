//functions used to make API work on server side
import path from "path";
import {
  GameData,
  RowData,
  MAX_COLS,
  MAX_ROWS,
  gameStages,
  FieldData,
  Players,
} from "../types";
import { getOpponent } from "./utils";

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
  let data: undefined | GameData;
  try {
    const jsonData = await fsAsync.readFile(gameFilePath(id), "utf8");
    return JSON.parse(jsonData);
  } catch (error) {
    return createGame(id);
  }
}

export async function getPlayer(
  secret: string,
  data: GameData
): Promise<Players | undefined> {
  let player: Players | undefined = undefined;
  if (data.player0.secret === secret) {
    player = Players.player0;
  } else if (data.player1.secret === secret) {
    player = Players.player1;
  }
  if (!player) {
    if (!data.player0.secret) {
      player = Players.player0;
      data.player0.secret = secret;
      await saveGame(data);
    } else if (!data.player1.secret) {
      player = Players.player1;
      data.player1.secret = secret;
      await saveGame(data);
    }
  }
  return player;
}

export async function getGameForPlayer(
  id: string,
  secret: string
): Promise<GameData> {
  const data = await getGame(id);

  const player = await getPlayer(secret, data);
  if (!player) throw new Error("game is full");

  const opponent = getOpponent(player);
  const rows = data[opponent].field.rows;
  data[opponent].secret = "";

  for (let row of rows) {
    for (let cell of row.cells) {
      if (!cell.shelled) cell.ship = false;
    }
  }
  if (player != Players.player0) {
    const d = data[opponent];
    data[opponent] = data[player];
    data[player] = d;
  }
  return data;
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
    turn: Players.player0,
    player0: { ready: false, field: createField(), secret: "" },
    player1: { ready: false, field: createField(), secret: "" },
  };
  saveGame(res);
  return res;
}
export async function saveGame(GameData: GameData) {
  const jsonData = JSON.stringify(GameData);
  await fsAsync.writeFile(gameFilePath(GameData.id), jsonData);
}
