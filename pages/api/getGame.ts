// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as gameAPILib from "../../src/utils/gameAPILib";
import { GameData } from "../../src/utils/types";

type Data = {
  name: GameData;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GameData>
) {
  if (req.query.id != undefined) {
    const data = await gameAPILib.getGame(String(req.query.id));
    res.status(200).json(data);
  } else {
    throw new Error("parameter <id> do not found");
  }
}
