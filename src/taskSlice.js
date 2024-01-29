import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [
      {
        id: 1,
        title: "I have to do this work",
        description: "by 6 pm",
        status: "Todo",
        priority: "Major",
        plannedDate: "2024-01-24",
        attachments: ["file1.jpg", "file2.jpg"],
      },
      {
        id: 2,
        title: "I am doing this work",
        description: "will finish it by 7pm",
        status: "In Progress",
        priority: "Major",
        plannedDate: "2024-01-24",
        attachments: ["file1.jpg", "file2.jpg"],
      },
      {
        id: 3,
        title: "Hurrey!! completed this work",
        description: "before 6pm ",
        status: "Completed",
        priority: "Major",
        plannedDate: "2024-01-25",
        attachments: ["file1.jpg", "file2.jpg"],
      },
    ],
    sortBy: null,
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action) => {
      const { id, updatedTask } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        const existingTask = { ...state.tasks[taskIndex] };
        state.tasks[taskIndex] = { ...existingTask, ...updatedTask };
      }
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const { addTask, editTask, setSortBy } = taskSlice.actions;

export default taskSlice.reducer;
