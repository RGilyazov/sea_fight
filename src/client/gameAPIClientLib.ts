import { Players } from "../types";
let _secret = "";
if (typeof window !== "undefined") {
  // Perform localStorage action
  _secret = localStorage.getItem("secretID") || "";
  if (!_secret) {
    _secret = crypto.randomUUID();
    localStorage.setItem("secretID", _secret);
  }
}
export const SECRET = _secret;
export const makeAction = (
  action: string,
  params: Record<string, string>,
  callback?: (data: any) => void,
  data?: any
) => {
  let queryString = `/api/makeAction?action=${action}&secret=${SECRET}`;
  for (let key of Object.keys(params)) {
    queryString = queryString + `&${key}=${params[key]}`;
  }
  const body = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  };
  //to do. force game reload using callback
  fetch(queryString, body).then((response) =>
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
  return await response.json();
};
