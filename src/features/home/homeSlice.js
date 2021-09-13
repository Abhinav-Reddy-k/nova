import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  ui: {
    showSpinner: false,
  },
};

const homeSlice = createSlice({
  initialState,
  name: "home",
  reducers: {
    tasksLoaded: (home, action) => {
      console.log(action.payload);
      home.tasks = action.payload;
    },
    showSpinner: (home) => {
      home.ui.showSpinner = true;
    },
    hideSpinner: (home) => {
      home.ui.showSpinner = false;
    },
  },
});

export const { tasksLoaded, showSpinner, hideSpinner } = homeSlice.actions;
export default homeSlice.reducer;

export const selectIsLoading = (store) => store.home.ui.showSpinner;
