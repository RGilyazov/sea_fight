import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { GameList } from "../../../types";
import * as gameAPIClient from "../../gameAPIClientLib";

export type GameListState = {
  gameListData: GameList | undefined;
  error?: string;
};

const initialState: GameListState = {
  gameListData: undefined,
};

export const loadGameList = createAsyncThunk<
  GameList,
  void,
  { state: RootState }
>("gameList/loadGameList", async (_: void, thunkAPI) => {
  const response = await gameAPIClient.gatGameList();
  if (response.status === "OK") return response.data;
  else return thunkAPI.rejectWithValue(response.error);
});

export const gameListSlice = createSlice({
  name: "gameList",
  initialState,
  reducers: {
    nothing: (state, action: PayloadAction<Date>) => {
      // state.mTime = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadGameList.fulfilled, (state, action) => {
      state.gameListData = action.payload;
    });
  },
});

export const { nothing } = gameListSlice.actions;
export const selectGameList = (state: RootState) =>
  state.gameList.gameListData?.games;
export default gameListSlice.reducer;
