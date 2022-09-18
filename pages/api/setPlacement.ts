import type { NextApiRequest, NextApiResponse } from "next";
import * as gameAPILib from "../../src/sever/gameAPIServerLib";
import { GameData } from "../../src/types";

type RespType = {
  data?: GameData;
  error?: string;
  status: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RespType>
) {
  if (!req.query.id || !req.query.secret) {
    res.status(400).json({
      status: "FAILED",
      error:
        "One of the following parameters is missing or is empty id, secret",
    });
    return;
  }
  try {
    const secret = req.query.secret as string;
    const id = req.query.id as string;
    gameAPILib.updatePlayerActivity(secret);
    const data = await gameAPILib.setPlacement(id, secret, req.body);
    res.status(200).json({ status: "OK", data: data });
  } catch (err: any) {
    res
      .status(err?.status || 500)
      .json({ error: err?.message || err, status: "FAILED" });
  }
}
