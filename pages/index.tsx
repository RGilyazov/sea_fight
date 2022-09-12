import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Row, { RowProps } from "../src/components/Row";
import Field, { FieldProps } from "../src/components/Field";
const Home: NextPage = () => {
  const FieldProps: FieldProps = {
    rows: [
      {
        cells: [
          { shelled: false, ship: true },
          { shelled: false, ship: true },
          { shelled: true, ship: true },
          { shelled: false, ship: true },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: true, ship: false },
          { shelled: true, ship: false },
          { shelled: true, ship: false },
          { shelled: false, ship: false },
        ],
      },
      {
        cells: [
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
        ],
      },
      {
        cells: [
          { shelled: false, ship: true },
          { shelled: false, ship: true },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
        ],
      },
      {
        cells: [
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
        ],
      },
      {
        cells: [
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: true, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: true, ship: false },
          { shelled: true, ship: false },
          { shelled: true, ship: false },
          { shelled: false, ship: false },
        ],
      },
      {
        cells: [
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
        ],
      },
      {
        cells: [
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
        ],
      },
      {
        cells: [
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
        ],
      },
      {
        cells: [
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
        ],
      },
      {
        cells: [
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
          { shelled: false, ship: false },
        ],
      },
    ],
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Sea fight</title>
        <meta name="description" content="Sea fight game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Field rows={FieldProps.rows} />
    </div>
  );
};

export default Home;
