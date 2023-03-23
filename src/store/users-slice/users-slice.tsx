import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DataType } from "../../pages";

type UserSliceStates = {
  users: DataType[];
};
const initialState: UserSliceStates = {
  users: [],
};

export const { reducer: usersReducer, actions: usersActions } = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, { payload }: PayloadAction<DataType[]>) {
      state.users = payload;
    },
  },
});
