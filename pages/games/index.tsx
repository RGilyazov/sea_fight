import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import GameList from "../../src/client/components/GameList";
import GamePlacement from "../../src/client/components/SeaFightGame";

type GamePagePops = {};

const GamePage: NextPage<GamePagePops> = () => {
  return (
    <div>
      <GameList></GameList>
    </div>
  );
};

export default GamePage;
