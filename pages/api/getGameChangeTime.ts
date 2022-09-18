import type { NextApiRequest, NextApiResponse } from "next";
import * as gameAPILib from "../../src/sever/gameAPIServerLib";

type RespType = {
  time?: Date;
  error?: string;
  status: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RespType>
) {
  if (!req.query?.id || !req.query?.secret) {
    res.status(400).json({
      status: "FAILED",
      error: "parameter ID or secret is missing or is empty",
    });
    return;
  }
  const id = req.query.id as string;
  const secret = req.query.secret as string;
  try {
    gameAPILib.updatePlayerActivity(secret);
    const data = await gameAPILib.getGameChangeTime(id);
    res.status(200).json({ time: data, status: "OK" });
  } catch (err: any) {
    res
      .status(err?.status || 500)
      .json({ error: err?.message || err, status: "FAILED" });
  }
}
