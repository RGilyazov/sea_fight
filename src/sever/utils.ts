import { Players } from "../types";
export function getCls(classes: { [key: string]: boolean }) {
  let res = "";
  for (let key of Object.keys(classes)) {
    if (classes[key]) res += " " + key;
  }
  return res;
}
export function getOpponent(player: Players): Players {
  let opponent = Players.player1;
  if (player != "player0") opponent = Players.player0;
  return opponent;
}
