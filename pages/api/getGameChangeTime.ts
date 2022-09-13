// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as gameAPILib from "../../src/utils/gameAPILib";

type Data = {
  name: Date;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.query.id != undefined) {
    const data = await gameAPILib.getGameChangeTime(String(req.query.id));
    res.status(200).json(data);
  } else {
    throw new Error("parameter <id> do not found");
  }
}
