// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as gameAPILib from "../../src/sever/gameAPIServerLib";
import { GameData, Players } from "../../src/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data?: GameData; error?: string; status: string }>
) {
  const secret = req.query.secret as string;
  if (req.query.id != undefined) {
    try {
      const data = await gameAPILib.getGameForPlayer(
        String(req.query.id),
        secret
      );
      res.status(200).json({ data: data, status: "OK" });
    } catch (err) {
      res.status(200).json({ error: String(err), status: "ERROR" });
    }
  } else {
    throw new Error("parameter <id> do not found");
  }
}
