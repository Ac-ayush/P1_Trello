import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: {
    Todo: [],
    Doing: [],
    Done: [],
  },
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { card, task } = action.payload;
      state.tasks[card].push(task);
    },
    updateTask: (state, action) => {
      const { card, updatedTask } = action.payload;
      state.tasks[card] = state.tasks[card].map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
    },
    moveTask: (state, action) => {
      const { sourceCard, targetCard, task } = action.payload;
      state.tasks[sourceCard] = state.tasks[sourceCard].filter((t) => t.id !== task.id);
      state.tasks[targetCard].push(task);
    },
  },
});

export const { addTask, updateTask, moveTask } = tasksSlice.actions;
export default tasksSlice.reducer;
