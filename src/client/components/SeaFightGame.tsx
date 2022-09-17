import Field from "./Field";
import { Coords } from "../../types";
import { useSelector, useDispatch } from "react-redux";
import {
  selectGame,
  selectStage,
  setShip,
  updateGame,
  setGameData,
} from "../features/game/gameSlice";
import { AppDispatch } from "../app/store";
import { SECRET, setPlacement, shell } from "../gameAPIClientLib";
import Button from "./Button";
import { useEffect } from "react";
import { useGameUpdates } from "../app/hooks";
type GamePops = { id: string };

export default function GamePlacement({ id }: GamePops) {
  const dispatch = useDispatch<AppDispatch>();
  const { gameData, error } = useSelector(selectGame);
  const gameStage = useSelector(selectStage);

  console.log("rendering", gameData);
  //loading game state from server only on first render
  useEffect(() => {
    dispatch(updateGame(id));
  }, [id, dispatch]);

  useGameUpdates(id, gameStage, gameData?.player0?.ready === true);

  const handleAdd = () => {
    if (gameData)
      setPlacement(id, gameData.player0.field, (data: any) => {
        if ((data.status = "OK")) dispatch(setGameData(data.data));
      });
  };

  const handleCellClickField1 = (coords: Coords) => {
    dispatch(setShip(coords));
  };
  const handleCellClickField2 = (coords: Coords) => {
    shell(id, coords, (data: any) => {
      if ((data.status = "OK")) dispatch(setGameData(data.data));
    });
  };
  if (error) return <div>{error}</div>;
  if (!gameData) return <div>Loading...</div>;

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
