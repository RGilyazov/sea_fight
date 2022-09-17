import type { NextApiRequest, NextApiResponse } from "next";
import * as gameAPILib from "../../../src/sever/gameAPIServerLib";
import { GameList } from "../../../src/types";

type RespType = {
  data?: GameList;
  error?: string;
  status: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RespType>
) {
  try {
    const data = await gameAPILib.getGameList();
    res.status(200).json({ status: "OK", data: data });
  } catch (err: any) {
    res
      .status(err?.status || 500)
      .json({ error: err?.message || err, status: "FAILED" });
  }
}
