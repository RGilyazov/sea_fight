import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";
import { useEffect } from "react";
import { checkGameUpdates } from "../features/game/gameSlice";
import { gameStages } from "../../types";

export const useGameUpdates = (
  id: string,
  gameStage: gameStages,
  playerReady: boolean
) => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    let interval = window.setInterval(() => {
      // if (gameStage === gameStages.Game || playerReady)
      dispatch(checkGameUpdates(id));
    }, 1000);
    return () => {
      window.clearInterval(interval);
    };
  }, [id, gameStage, playerReady, dispatch]);
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
