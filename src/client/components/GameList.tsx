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
    <div className="flex flex-col items-center m-4">
      <div className="flex flex-col w-fit items-center bg-teal-50 rounded-lg p-4 shadow-2xl">
        <h1 className="text-2xl"> Select game to join:</h1>
        <div className="flex flex-col gap-2">
          {gameList
            .filter((el) => el.playersCount === 1)
            .map((el) => (
              <Link key={el.id} href={`./games/${el.id}`}>
                <div className="hover:bg-blue-400 hover:shadow-2xl rounded-lg p-2 transition-all duration-500 cursor-pointer">
                  <span className="text-xl ">
                    {el.id + "   " + el.playersCount + " players"}
                  </span>
                </div>
              </Link>
            ))}
          <div className="flex flex-row items-stretch  gap-2">
            <input
              id="newGameInput"
              placeholder="enter new game name"
              className="border-2 text-xl flex-1 text-blue-900"
              value={newGameName}
              onChange={handleChange}
            ></input>
            <Button caption="new game" onClick={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
}
