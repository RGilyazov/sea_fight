import { Coords, FieldData } from "../types";
const { uuid } = require("uuidv4");
let _secret = "";
if (typeof window !== "undefined") {
  _secret = localStorage.getItem("secretID") || "";
  if (!_secret) {
    _secret = uuid();
    localStorage.setItem("secretID", _secret);
  }
}
export const SECRET = _secret;

export const shell = async (
  gameId: string,
  coords: Coords,
  callback?: (data: any) => void
) => {
  fetch(
    `/api/shell?id=${gameId}&secret=${SECRET}&row=${coords.row}&col=${coords.col}`
  ).then((response) =>
    response.json().then((data) => {
      if (callback) callback(data);
    })
  );
};

export const setPlacement = async (
  gameId: string,
  field: FieldData,
  callback?: (data: any) => void
) => {
  const body = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(field),
  };
  fetch(`/api/setPlacement?id=${gameId}&secret=${SECRET}`, body).then(
    (response) =>
      response.json().then((data) => {
        if (callback) callback(data);
      })
  );
};

export const loadGameData = async (gameId: string) => {
  const response = await fetch(`/api/getGame?id=${gameId}&secret=${SECRET}`);
  return await response.json();
};

export const checkGameUpdates = async (gameId: string) => {
  const response = await fetch(
    `/api/getGameChangeTime?id=${gameId}&secret=${SECRET}`
  );
  const res = await response.json();
  return res.time;
};

export const gatGameList = async () => {
  const response = await fetch(`/api/games`);
  return await response.json();
};
