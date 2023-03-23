import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth-slice";
import { usersReducer } from "./users-slice/users-slice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
