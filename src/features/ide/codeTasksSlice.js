import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  current: [],
  currentTaskProgress: {},
};

const codingTasksSlice = createSlice({
  initialState,
  name: "codingTasks",
  reducers: {
    myCodingTaskesLoaded: (codingTasks, action) => {
      codingTasks.current = action.payload;
    },
    currentTaskProgressLoaded: (codingTasks, action) => {
      codingTasks.currentTaskProgress = action.payload;
      if (!codingTasks.currentTaskProgress.score) {
        codingTasks.currentTaskProgress.score = 0;
      }
    },
  },
});

export const { myCodingTaskesLoaded, currentTaskProgressLoaded } =
  codingTasksSlice.actions;

export default codingTasksSlice.reducer;
export const selectCurrentCodingTasks = (store) => store.codingTasks.current;
export const getCurrentTask = (id) =>
  createSelector(
    (store) => store.codingTasks.current,
    (current) => current.find((task) => task.id === id)
  );
export const selectCurrentTaskProgress = (store) =>
  store.codingTasks.currentTaskProgress;
