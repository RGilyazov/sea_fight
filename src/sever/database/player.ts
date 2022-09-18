//functions used to make API work on server side
import path from "path";

const fsAsync = require("fs").promises;
const ROOT_DIR = path.join(process.cwd(), "data/");
const USERS_DIR = path.join(ROOT_DIR, "/users/");

function userFilePath(secret: string) {
  return USERS_DIR + `${secret}.json`;
}

export async function updatePlayerActivity(secret: string) {
  fsAsync.writeFile(userFilePath(secret), "{}");
}

export async function getLastPlayerActivity(
  secret: string
): Promise<Date | undefined> {
  try {
    const stats = await fsAsync.stat(userFilePath(secret));
    return stats.mtime;
  } catch (error) {
    return undefined;
  }
}
