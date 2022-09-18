import {
  createAsyncThunk,
  createSlice,
  current,
  PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { Coords, GameData, gameStages, Players } from "../../../types";
import * as gameAPIClient from "../../gameAPIClientLib";
import * as seaFightUtils from "../../../seaFightUtils";

// declaring the types for our state
export type GameState = {
  gameData: GameData | undefined;
  mTime: Date | undefined;
  error?: string;
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
  const response = await gameAPIClient.loadGameData(gameId);
  if (response.status === "OK") return response.data;
  else return thunkAPI.rejectWithValue(response.error);
});

export const checkGameUpdates = createAsyncThunk<GameState | undefined, string>(
  "game/checkGameUpdates",
  async (gameId: string, thunkAPI) => {
    let oldState = thunkAPI.getState() as RootState;
    const newMTime = await gameAPIClient.checkGameUpdates(gameId);
    if (oldState.game.mTime === newMTime) return;
    const response = await gameAPIClient.loadGameData(gameId);
    oldState = thunkAPI.getState() as RootState;
    if (response.status === "OK") {
      switch (response.data.stage) {
        case gameStages.Game: {
          return { mTime: newMTime, gameData: response.data };
        }
        default: {
          const gameData = {
            ...(oldState.game.gameData as GameData),
            stage: response.data.stage,
          };
          return { mTime: newMTime, gameData: gameData };
        }
      }
    } else return thunkAPI.rejectWithValue(response.error);
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
        const cell = field.rows[row].cells[col];
        cell.ship = !cell.ship;
        if (!seaFightUtils.setupIsCorrect(current(field), false)) {
          cell.ship = !cell.ship;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateGame.fulfilled, (state, action) => {
      state.gameData = action.payload;
    });
    builder.addCase(updateGame.rejected, (state, action) => {
      state.error = String(action.payload);
    });
    builder.addCase(checkGameUpdates.fulfilled, (state, action) => {
      state.error = "";
      if (action.payload !== undefined) {
        if (action.payload.mTime) state.mTime = action.payload.mTime;
        if (action.payload.gameData) state.gameData = action.payload.gameData;
      }
    });
  },
});

export const { setMtime, setGameData, setShip } = gameSlice.actions;
export const selectError = (state: RootState) => state.game.error;
export const selectGame = (state: RootState) => {
  return state.game;
};
export const selectStage = (state: RootState) => {
  if (state.game.gameData) return state.game.gameData.stage;
  return gameStages.Placement;
};
export default gameSlice.reducer;
