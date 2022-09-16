import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Field, { FieldProps } from "../src/client/components/Field";
import * as gameAPILib from "../src/sever/gameAPIServerLib";
import { Coords } from "../src/types";

export async function getServerSideProps(context: any) {
  const data = await gameAPILib.createGame("test");
  return {
    props: data.player0.field, // will be passed to the page component as props
  };
}

const Home: NextPage<FieldProps> = (props: FieldProps) => {
  const FieldProps = props;
  const handleCellClick = (coords: Coords) => {
    console.log(coords);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Sea fight</title>
        <meta name="description" content="Sea fight game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Field rows={FieldProps.rows} onCellClick={handleCellClick} />
    </div>
  );
};

export default Home;
