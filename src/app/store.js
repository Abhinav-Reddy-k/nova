import { configureStore } from "@reduxjs/toolkit";

import authReduser, { verifyAuth } from "../features/auth/authSlice";
import counterReducer from "../features/counter/counterSlice";
import profileReducer from "../features/Profile/profileSlice";
import { getProfileData } from "./../features/Profile/profileSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReduser,
    profile: profileReducer,
  },
});

store.dispatch(verifyAuth());
store.dispatch(getProfileData());
