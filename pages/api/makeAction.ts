// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as gameAPILib from "../../src/sever/gameAPIServerLib";
import { GameData, gameStages } from "../../src/types";
import { getOpponent } from "../../src/sever/utils";

type Data = {
  result: boolean;
  data?: GameData;
};

export enum gameActions {
  SavePlacement = "setPlacement",
  Shell = "shell",
  Game = "game",
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = await gameAPILib.getGame(String(req.query.id));
  const player = await gameAPILib.getPlayer(req.query.secret as string, data);
  if (!player) throw new Error("wrong player secret");
  const opponent = getOpponent(player);
  const action = req.query.action;
  switch (action) {
    case "setPlacement": {
      if (req.query.id === undefined) {
        throw new Error("wrong query parameters");
      }
      const data = await gameAPILib.getGame(String(req.query.id));
      if (!data[player].ready) data[player].field = req.body;
      data[player].ready = !data[player].ready;
      if (data.player0.ready && data.player1.ready)
        data.stage = gameStages.Game;
      else data.stage = gameStages.Placement;
      gameAPILib.saveGame(data);
      res.status(200).json({ result: true });
      break;
    }
    case "shell": {
      if (
        req.query.id === undefined ||
        req.query.row === undefined ||
        req.query.col === undefined
      ) {
        throw new Error("wrong query parameters");
      } else {
        const data = await gameAPILib.getGame(String(req.query.id));
        const cell =
          data[opponent].field.rows[Number(req.query.row)].cells[
            Number(req.query.col)
          ];
        cell.shelled = !cell.shelled;
        if (!cell.ship) data.turn = getOpponent(player);
        gameAPILib.saveGame(data);

        res.status(200).json({ result: true, data: data });
      }
      break;
    }
  }
}
