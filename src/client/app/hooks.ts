import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";
import { useEffect } from "react";
import { checkGameUpdates } from "../features/game/gameSlice";
import { gameStages } from "../../types";

export const useGameUpdates = (id: string, gameStage: gameStages) => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    let interval = window.setInterval(() => {
      if (gameStage === gameStages.Game) dispatch(checkGameUpdates(id));
    }, 1000);
    return () => {
      window.clearInterval(interval);
    };
  }, [id, gameStage, dispatch]);
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
