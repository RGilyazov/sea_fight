import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Field from "../src/components/Field";
import { Coords, GameData } from "../src/utils/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

type GamePops = {};

const Game: NextPage<GamePops> = () => {
  const router = useRouter();
  const id = String(router.query["id"]);
  const [mtime, setMtime] = useState(0);
  const [game, setGame] = useState<GameData | undefined>(undefined);

  useEffect(() => {
    let interval = window.setInterval(() => {
      fetch(`/api/getGameChangeTime?id=${id}`)
        .then((response) => response.json())
        .then((newMtime) => setMtime(newMtime));
    }, 1000);
    return () => {
      window.clearInterval(interval);
    };
  }, [id]);

  useEffect(() => {
    fetch(`/api/getGame?id=${id}`)
      .then((response) => response.json())
      .then((newGame) => setGame(newGame));
  }, [id, mtime]);

  const handleCellClick = (coords: Coords) => {
    console.log(coords);
  };
  if (!game) return <div>Loading...</div>;
  return (
    <div className={styles.container}>
      <Head>
        <title>Sea fight</title>
        <meta name="description" content="Sea fight game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Field rows={game?.player0.field.rows} onCellClick={handleCellClick} />
    </div>
  );
};

export default Game;
