import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import GamePlacement from "../../src/client/components/SeaFightGame";

type GamePagePops = {};

const GamePage: NextPage<GamePagePops> = () => {
  const router = useRouter();
  const { gameId } = router.query;
  if (gameId === undefined) return <div>Loading...</div>;
  return (
    <div>
      <Head>
        <title>Sea fight</title>
        <meta name="description" content="Sea fight game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GamePlacement id={gameId.toString()} />
    </div>
  );
};

export default GamePage;
