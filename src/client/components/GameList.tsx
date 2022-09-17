import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../app/store";
import {
  loadGameList,
  selectGameList,
} from "../features/gameList/gameListSlice";

export default function GameList() {
  const dispatch = useDispatch<AppDispatch>();
  const gameList = useSelector(selectGameList);
  if (!gameList) {
    dispatch(loadGameList());
    return <div> Loading</div>;
  }
  return (
    <div>
      {gameList.map((el) => (
        <div key={el.id}>
          <Link href={`./games/${el.id}`}>{el.id}</Link>
        </div>
      ))}
    </div>
  );
}
