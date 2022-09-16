import { combineReducers } from "@reduxjs/toolkit";
// Reducers
import gameReducer from "../features/game/gameSlice";
//import functionsReducer from "../features/functionsList/functionsSlice";

const rootReducer = combineReducers({
  game: gameReducer,
  //functions: functionsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
