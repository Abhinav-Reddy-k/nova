import { createSlice } from "@reduxjs/toolkit";

import { authStateListener } from "../../app/firebase/authService";
import { getUserProfile } from "../../app/firebase/firestoreService";
import { hideSpinner, showSpinner } from "../home/homeSlice";

const initialState = {
  data: {},
  hasProfileData: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    profileLoaded: (profile, action) => {
      profile.data = action.payload;
      if (!profile.data.photoURL) {
        profile.data.photoURL =
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
      }
      profile.hasProfileData = true;
    },
    profileCleared: (profile) => {
      profile.data = initialState.data;
      profile.hasProfileData = false;
    },
  },
});

export const {
  profileLoaded,
  profileCleared,
  loadingProfile,
  loadingProfileFailed,
} = profileSlice.actions;
export default profileSlice.reducer;

export function getProfileData() {
  return function (dispatch) {
    authStateListener(async (userInfo) => {
      if (userInfo) {
        try {
          dispatch(showSpinner());
          const profile = await getUserProfile(userInfo.uid);
          if (profile) {
            dispatch(profileLoaded(profile));
          }
          dispatch(hideSpinner());
        } catch (error) {
          console.log(error);
        }
      } else {
        dispatch(profileCleared());
      }
    });
  };
}

export const selectHasProfileData = (store) => store.profile.hasProfileData;
export const selectIsProfileDataLoading = (store) => store.profile.isLoading;
export const selectProfileData = (store) => store.profile.data;
