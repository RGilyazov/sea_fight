import { combineReducers } from "@reduxjs/toolkit";
// Reducers
import gameReducer from "../features/game/gameSlice";
import gameListReducer from "../features/gameList/gameListSlice";

const rootReducer = combineReducers({
  game: gameReducer,
  gameList: gameListReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
