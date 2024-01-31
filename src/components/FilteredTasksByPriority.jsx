import React from "react";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import Task from "./Task";

const FilteredTasksByPriority = () => {
  const tasks = useSelector((state) => state.task.tasks);

  // Separate tasks into different categories
  const todoTasks = tasks.filter((task) => task.status === "Todo");
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress");
  const completedTasks = tasks.filter((task) => task.status === "Completed");

  // Sort tasks within each category based on priority
  const sortedTodoTasks = todoTasks.sort((a, b) => {
    const priorityOrder = { Major: 1, Normal: 2, Minor: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const sortedInProgressTasks = inProgressTasks.sort((a, b) => {
    const priorityOrder = { Major: 1, Normal: 2, Minor: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const sortedCompletedTasks = completedTasks.sort((a, b) => {
    const priorityOrder = { Major: 1, Normal: 2, Minor: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="flex bg-indigo-800 h-screen">
      <div className="w-1/5 p-4 bg-teal-400 text-white h-1/2 rounded-lg mx-1 my-2">
        <Sidebar />
      </div>

      <div className="flex-1 flex m-2">
        <div className="w-1/3 p-4 bg-indigo-500 rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-center">Todo</h2>
          {sortedTodoTasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>

        <div className="w-1/3 p-4 bg-indigo-500 rounded-lg mx-2">
          <h2 className="text-xl font-bold mb-4 text-center">In Progress</h2>
          {sortedInProgressTasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>

        <div className="w-1/3 p-4 bg-indigo-500 rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-center">Completed</h2>
          {sortedCompletedTasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilteredTasksByPriority;
