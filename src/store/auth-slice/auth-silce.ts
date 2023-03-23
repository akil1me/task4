import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DataType } from "../../pages";

type StatusType = {
  status: "blocked" | "active";
  id: React.Key[];
};
type User = {
  id: number;
  email: string;
  name: string;
};
type UserSliceStates = {
  user: User | null;
};
const getUser: User = JSON.parse(localStorage.getItem("user") || "null");

const initialState: UserSliceStates = {
  user: getUser,
};

export const { reducer: authReducer, actions: authActions } = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<UserSliceStates | null>) {
      if (payload !== null) {
        state.user = payload.user;
        localStorage.setItem("user", JSON.stringify(payload.user));
      } else {
        state.user = payload;
        localStorage.removeItem("user");
      }
    },
    setDeletedUsers(state, { payload }: PayloadAction<DataType[]>) {
      const deleted = payload.some(
        (item) => item.id === (state.user && state.user.id)
      );
      if (deleted) {
        state.user = null;
        localStorage.removeItem("user");
      }
    },
  },
});
