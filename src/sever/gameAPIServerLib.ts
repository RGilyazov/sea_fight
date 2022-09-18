import Field from "../client/components/Field";
import {
  GameData,
  RowData,
  MAX_COLS,
  MAX_ROWS,
  gameStages,
  FieldData,
  Players,
  Coords,
  GameList,
  CellData,
} from "../types";
import * as Game from "./database/game";
import * as Player from "./database/player";
import * as seaFightUtils from "../seaFightUtils";

const PLAYER_TIMEOUT = 60 * 1000;
const GAME_TIMEOUT = 30 * 60 * 1000;

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

async function createGame(id: string): Promise<GameData> {
  const res: GameData = {
    id,
    stage: gameStages.WaitingForPlayer,
    turn: Players.player0,
    player0: { ready: false, field: createField(), secret: "" },
    player1: { ready: false, field: createField(), secret: "" },
  };
  Game.saveGame(res);
  return res;
}

async function getPlayer(secret: string, data: GameData): Promise<Players> {
  let player: Players | undefined = undefined;
  if (data.player0.secret === secret) {
    player = Players.player0;
  } else if (data.player1.secret === secret) {
    player = Players.player1;
  }

  if (!player) {
    const player0IsActive = await playerIsActive(data.player0.secret);
    const player1IsActive = await playerIsActive(data.player1.secret);

    if (!player0IsActive) {
      player = Players.player0;
      data.player0.secret = secret;
      console.log("joined player0", data.player0.secret);
      calculateGameStage(data);
      await Game.saveGame(data);
    } else if (!player1IsActive) {
      player = Players.player1;
      data.player1.secret = secret;
      console.log("joined player1", data.player0.secret);
      calculateGameStage(data);
      await Game.saveGame(data);
    }
  }
  if (!player)
    throw {
      status: 400,
      message: "wrong secret. player is not in this game. game is full",
    };

  return player;
}

function getOpponent(player: Players): Players {
  let opponent = Players.player1;
  if (player != "player0") opponent = Players.player0;
  return opponent;
}

function calculateGameForPlayer(gameData: GameData, player: Players) {
  const opponent = getOpponent(player);
  const rows = gameData[opponent].field.rows;
  gameData[opponent].secret = "";

  for (let row of rows) {
    for (let cell of row.cells) {
      if (!cell.shelled) cell.ship = false;
    }
  }
  if (player != Players.player0) {
    const d = gameData[opponent];
    gameData[opponent] = gameData[player];
    gameData[player] = d;
    gameData.turn =
      gameData.turn === player ? Players.player0 : Players.player1;
    if (gameData.winner)
      gameData.winner =
        gameData.winner === player ? Players.player0 : Players.player1;
  }
  return gameData;
}

export async function getGameChangeTime(id: string) {
  return await Game.getGameChangeTime(id);
}

export async function getGameForPlayer(
  id: string,
  secret: string
): Promise<GameData> {
  let data;
  try {
    data = await Game.getGame(id);
  } catch (err) {
    data = await createGame(id);
  }
  const player = await getPlayer(secret, data);
  calculateGameForPlayer(data, player);
  return data;
}

function calculateGameStage(data: GameData) {
  if (data.player0.ready && data.player1.ready) data.stage = gameStages.Game;
  else if (data.player0.secret && data.player1.secret)
    data.stage = gameStages.Placement;
  else data.stage = gameStages.WaitingForPlayer;

  if (data.stage === gameStages.Game) {
    data.winner = undefined;
    if (seaFightUtils.allShipsDestroyed(data.player0.field))
      data.winner = Players.player1;
    if (seaFightUtils.allShipsDestroyed(data.player1.field))
      data.winner = Players.player0;
    if (data.winner) data.stage = gameStages.Done;
  }
}

export async function setPlacement(
  id: string,
  secret: string,
  field: FieldData
) {
  if (!seaFightUtils.setupIsCorrect(field, true)) {
    throw {
      status: 400,
      message: "wrong setup",
    };
  }
  const data = await Game.getGame(id);
  const player = await getPlayer(secret, data);
  if (![gameStages.Placement, gameStages.WaitingForPlayer].includes(data.stage))
    return calculateGameForPlayer(data, player);

  if (!data[player].ready) data[player].field = field;
  data[player].ready = !data[player].ready;
  calculateGameStage(data);
  await Game.saveGame(data);
  calculateGameForPlayer(data, player);
  return data;
}

export async function shell(
  id: string,
  secret: string,
  coords: Coords
): Promise<GameData> {
  const data = await Game.getGame(id);
  const player = await getPlayer(secret, data);
  if (data.turn !== player || data.stage !== gameStages.Game)
    return calculateGameForPlayer(data, player);
  const opponent = getOpponent(player);
  const cell = data[opponent].field.rows[coords.row].cells[coords.col];
  cell.shelled = true;
  if (!cell.ship) data.turn = opponent;
  else {
    const field = data[opponent].field;
    //find nested cells that have ship = true
    const shipCells = seaFightUtils.getShipCells(field, coords);
    //if every ship cell is shelled ship is dead
    const shipIsDead = seaFightUtils.shipIsDead(field, shipCells);
    //if shipIsDead mark all nested cells as shelled
    if (shipIsDead) {
      shipCells.forEach((coords) =>
        seaFightUtils
          .getNestedCells(field, coords, true)
          .forEach(
            (value) => (field.rows[value.row].cells[value.col].shelled = true)
          )
      );
    }
  }
  calculateGameStage(data);
  Game.saveGame(data);
  calculateGameForPlayer(data, player);
  return data;
}

export async function getGameList(): Promise<GameList> {
  const gameList = await Game.getGameList();
  const res: GameList = { games: [] };
  const curTime = new Date().getTime();
  for (let game_ of gameList) {
    if (curTime - game_.lastModified.getTime() > GAME_TIMEOUT) continue;
    const game = await Game.getGame(game_.id);
    const playersCount =
      0 +
      Number(await playerIsActive(game.player0.secret)) +
      Number(await playerIsActive(game.player1.secret));
    const timeSinceModified =
      new Date().getTime() - game_.lastModified.getTime();
    res.games.push({ ...game_, playersCount, timeSinceModified });
  }
  return res;
}

export async function playerIsActive(secret: string): Promise<boolean> {
  const lastActivity = await Player.getLastPlayerActivity(secret);
  if (!lastActivity) return false;
  return new Date().getTime() - lastActivity.getTime() < PLAYER_TIMEOUT;
}

export async function updatePlayerActivity(secret: string) {
  Player.updatePlayerActivity(secret);
}
