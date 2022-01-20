import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  current: [],
  progress: [],
  currentTaskProgress: {},
};

const codingTasksSlice = createSlice({
  initialState,
  name: "codingTasks",
  reducers: {
    myCodingTaskesLoaded: (codingTasks, action) => {
      codingTasks.current = action.payload;
    },
    updateCodeTestProgress: (codingTasks, action) => {
      const task = codingTasks.progress.find(
        (task) => task.taskId === action.payload.taskId
      );
      if (task) {
        codingTasks.progress = codingTasks.progress.map((task) =>
          task.taskId === action.payload.taskId ? action.payload : task
        );
      } else {
        codingTasks.progress.push(action.payload);
      }
    },
    currentTaskProgressLoaded: (codingTasks, action) => {
      codingTasks.currentTaskProgress = action.payload;
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
