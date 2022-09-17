import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../app/store";
import {
  loadGameList,
  selectGameList,
} from "../features/gameList/gameListSlice";
import Button from "./Button";

export default function GameList() {
  const dispatch = useDispatch<AppDispatch>();
  const gameList = useSelector(selectGameList);
  const router = useRouter();
  const [newGameName, setNewGameName] = useState("");

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setNewGameName(e.currentTarget.value);
  };

  const handleClick = () => router.push(`/games/${newGameName}`);
  if (!gameList) {
    dispatch(loadGameList());
    return <div> Loading</div>;
  }
  return (
    <div className="flex flex-col items-center ">
      <h1 className="text-2xl"> Select game to join:</h1>
      <div className="flex flex-col gap-2">
        {gameList.map((el) => (
          <div className="" key={el.id}>
            <Link href={`./games/${el.id}`}>
              <span className="hover:underline cursor-pointer text-2xl ">
                {el.id}
              </span>
            </Link>
          </div>
        ))}
        <div className="flex flex-row items-center">
          <input
            id="newGameInput"
            placeholder="enter new game name"
            className="border-2 text-2xl flex-1 text-blue-900 mr-1"
            value={newGameName}
            onChange={handleChange}
          ></input>
          <Button caption="new game" onClick={handleClick} />
        </div>
      </div>
    </div>
  );
}
