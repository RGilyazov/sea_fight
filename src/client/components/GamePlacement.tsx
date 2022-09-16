import type { NextPage } from "next";
import Field from "./Field";
import { Coords } from "../../types";
import { useSelector, useDispatch } from "react-redux";
import {
  selectGame,
  selectStage,
  setShip,
  updateGame,
} from "../features/game/gameSlice";
import { AppDispatch } from "../app/store";
import { makeAction, SECRET } from "../gameAPIClientLib";
import Button from "./Button";
import { useEffect } from "react";
import { useGameUpdates } from "../app/hooks";
type GamePops = { id: string };

export default function GamePlacement({ id }: GamePops) {
  const dispatch = useDispatch<AppDispatch>();
  const { gameData } = useSelector(selectGame);
  const gameStage = useSelector(selectStage);
  console.log("rendering", gameData);

  //loading game state from server only on first render
  useEffect(() => {
    dispatch(updateGame(id));
  }, [id, dispatch]);

  useGameUpdates(id, gameStage);

  const handleAdd = () => {
    if (gameData)
      makeAction(
        "setPlacement",
        { id },
        (data: any) => console.log(data),
        gameData.player0.field
      );
  };

  const handleCellClickField1 = (coords: Coords) => {
    dispatch(setShip(coords));
  };
  const handleCellClickField2 = (coords: Coords) => {
    makeAction(
      "shell",
      {
        id,
        col: coords.col.toString(),
        row: coords.row.toString(),
      },
      (data: any) => console.log(data)
    );
  };
  if (!gameData) return <div>Loading...</div>;
  console.log("rendering game comp", gameData, gameData.player0.ready);
  return (
    <div>
      <div>turn={gameData.turn}</div>
      <div>gameStage={gameStage}</div>
      <div>ready={String(gameData.player0.ready)}</div>
      <div>secret={SECRET}</div>

      <div className="flex flex-row gap-10">
        <div>
          <Field
            rows={gameData?.player0.field.rows}
            onCellClick={handleCellClickField1}
          />
          <Button caption="Save" onClick={handleAdd} />
        </div>
        <Field
          rows={gameData?.player1.field.rows}
          onCellClick={handleCellClickField2}
        />
      </div>
    </div>
  );
}
