import { createSlice } from "@reduxjs/toolkit";

import { authStateListener } from "../../app/firebase/auth";
import { getUserProfile } from "../../app/firebase/firestore/firestoreService";

const initialState = { data: { isTeacher: false }, hasProfileData: null };

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    profileLoaded: (profile, action) => {
      profile.data = action.payload;
      profile.hasProfileData = true;
    },
    profileCleared: (profile) => {
      profile.data = initialState.data;
      profile.hasProfileData = false;
    },
  },
});

export const { profileLoaded, profileCleared } = profileSlice.actions;
export default profileSlice.reducer;

export function getProfileData() {
  return function (dispatch) {
    authStateListener(async (userInfo) => {
      if (userInfo) {
        const profile = await getUserProfile(userInfo.uid);
        if(profile)
          dispatch(profileLoaded(profile));
      } else {
        dispatch(profileCleared());
      }
    });
  };
}

export const selectHasProfileData = (store) => store.profile.hasProfileData;
export const selectProfileData = (store) => store.profile.data;

