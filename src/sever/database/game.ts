//functions used to make API work on server side
import path from "path";
import { GameData, GameList } from "../../types";

const fsAsync = require("fs").promises;
const ROOT_DIR = path.join(process.cwd(), "data/");
const GAMES_DIR = path.join(ROOT_DIR, "/games/");

function gameFilePath(id: string) {
  return GAMES_DIR + `${id}.json`;
}

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
    throw { status: 500, message: `error reading game data ${error}` };
  }
}

export async function saveGame(GameData: GameData) {
  const date = new Date();
  console.log("saved game id=" + GameData.id, date);
  try {
    const jsonData = JSON.stringify(GameData);
    await fsAsync.writeFile(gameFilePath(GameData.id), jsonData);
  } catch (error) {
    throw { status: 500, message: `error saving game data ${error}` };
  }
}

export async function getGameList() {
  const res: { id: string; lastModified: Date }[] = [];
  const filenames: string[] = await fsAsync.readdir(GAMES_DIR);
  for (let filename of filenames) {
    const basename = path.basename(filename, path.extname(filename));
    const lastModified = await getGameChangeTime(basename);
    res.push({ id: basename, lastModified: lastModified });
  }
  res.sort((a, b) => {
    return Number(a.lastModified > b.lastModified);
  });
  return res;
}
