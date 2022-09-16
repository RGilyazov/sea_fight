import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import GamePlacement from "../src/client/components/GamePlacement";

type GamePagePops = {};

const GamePage: NextPage<GamePagePops> = () => {
  const router = useRouter();
  const id = String(router.query["id"]);

  return (
    <div>
      <Head>
        <title>Sea fight</title>
        <meta name="description" content="Sea fight game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GamePlacement id={id} />
    </div>
  );
};

export default GamePage;
