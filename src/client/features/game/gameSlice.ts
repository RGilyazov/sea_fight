import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { Coords, GameData, gameStages, Players } from "../../../types";
import * as gameAPIClient from "../../gameAPIClientLib";
import { type } from "os";
var crypto = require("crypto");
// declaring the types for our state
export type GameState = {
  gameData: GameData | undefined;
  mTime: Date | undefined;
};

const initialState: GameState = {
  gameData: undefined,
  mTime: undefined,
};

// This action is what we will call using the dispatch in order to trigger the API call.
export const updateGame = createAsyncThunk<
  GameData,
  string,
  { state: RootState }
>("game/updateGame", async (gameId: string, thunkAPI) => {
  const oldState = thunkAPI.getState() as RootState;
  const response = await gameAPIClient.loadGameData(gameId);
  //console.log("resp received", gameId, response);
  if (response.status === "OK") return response.data;
  else return oldState.game.gameData;
});

export const checkGameUpdates = createAsyncThunk<GameData | undefined, string>(
  "game/checkGameUpdates",
  async (gameId: string, thunkAPI) => {
    const oldState = thunkAPI.getState() as RootState;
    const newMTime = await gameAPIClient.checkGameUpdates(gameId);
    if (oldState.game.mTime === newMTime) return undefined;
    const gameData = await gameAPIClient.loadGameData(gameId);
    return gameData;
  }
);

export type MakeActionParams = {
  action: string;
  params: Record<string, string>;
  data?: any;
};

// export const makeAction = createAsyncThunk<
//   GameData | undefined,
//   MakeActionParams
// >("game/makeAction", async (params: MakeActionParams, thunkAPI) => {
//   makeAction(
//       "setPlacement",
//       { id },
//       (data: any) => console.log(data),
//       gameData.player0.field
//     );
//   return gameData;
// });

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setMtime: (state, action: PayloadAction<Date>) => {
      state.mTime = action.payload;
    },
    setGameData: (state, action: PayloadAction<GameData>) => {
      state.gameData = action.payload;
    },
    setShip: (state, action: PayloadAction<Coords>) => {
      if (state.gameData) {
        const field = state.gameData.player0.field;
        const { row, col } = action.payload;
        field.rows[row].cells[col].ship = !field.rows[row].cells[col].ship;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateGame.fulfilled, (state, action) => {
      //console.log("updateGame.fulfilled", action.payload);
      state.gameData = action.payload;
    });
    builder.addCase(checkGameUpdates.fulfilled, (state, action) => {
      if (action.payload !== undefined) state.gameData = action.payload;
    });
  },
});

export const { setMtime, setGameData, setShip } = gameSlice.actions;

export const selectGame = (state: RootState) => state.game;
export const selectStage = (state: RootState) => {
  if (state.game.gameData) return state.game.gameData.stage;
  return gameStages.Placement;
};
export default gameSlice.reducer;
