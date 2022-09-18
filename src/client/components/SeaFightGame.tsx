import Field from "./Field";
import { Coords, gameStages, Players } from "../../types";
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
  const { gameData, error, canSavePlacement } = useSelector(selectGame);
  const gameStage = useSelector(selectStage);

  console.log("rendering", gameData);
  //loading game state from server only on first render
  useEffect(() => {
    dispatch(updateGame(id));
  }, [id, dispatch]);

  useGameUpdates(id, gameStage, gameData?.player0?.ready === true);

  const handleSave = () => {
    if (gameData)
      setPlacement(id, gameData.player0.field, (data: any) => {
        if ((data.status = "OK")) dispatch(setGameData(data.data));
      });
  };

  const handleCellClickField1 = (coords: Coords) => {
    if ([gameStages.Placement, gameStages.WaitingForPlayer].includes(gameStage))
      if (gameData) {
        dispatch(setShip(coords));
      }
  };
  const handleCellClickField2 = (coords: Coords) => {
    if (gameStage === gameStages.Game)
      shell(id, coords, (data: any) => {
        if ((data.status = "OK")) dispatch(setGameData(data.data));
      });
  };
  if (error) return <div>{error}</div>;
  if (!gameData) return <div>Loading...</div>;

  let GameStageDescription = "";
  if (gameStage === gameStages.Game)
    GameStageDescription = `Fight:${
      gameData.turn === Players.player0 ? "Your  turn" : "Opponents turn"
    }`;
  else if (gameStage === gameStages.Done) {
    GameStageDescription =
      gameData.winner === Players.player0 ? "You won" : "You loose";
  } else if (
    [gameStages.Placement, gameStages.WaitingForPlayer].includes(gameStage)
  ) {
    const textReady = gameData.player0.ready
      ? "You are ready"
      : "Place your ships";
    const textOtherPlayer =
      gameStage === gameStages.WaitingForPlayer
        ? "waiting for player to join"
        : "";
    GameStageDescription = `${textReady}. ${textOtherPlayer}`;
  }

  return (
    <div>
      <div>{GameStageDescription}</div>
      <div className="hidden">secret={SECRET}</div>
      <div className="flex flex-row gap-10">
        <div>
          <Field
            rows={gameData?.player0.field.rows}
            onCellClick={handleCellClickField1}
          />
          {[gameStages.Placement, gameStages.WaitingForPlayer].includes(
            gameStage
          ) && (
            <Button
              disabled={canSavePlacement}
              caption={gameData.player0.ready ? "Cancel" : "Ready"}
              onClick={handleSave}
            />
          )}
        </div>
        <Field
          rows={gameData?.player1.field.rows}
          onCellClick={handleCellClickField2}
        />
      </div>
    </div>
  );
}
