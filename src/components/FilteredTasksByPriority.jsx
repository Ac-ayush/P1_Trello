import React from "react";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import Task from "./Task";

const FilteredTasksByPriority = () => {
  const tasks = useSelector((state) => state.task.tasks);
  console.log(tasks);
  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = {
      Major: 1,
      Normal: 2,
      Minor: 3,
    };

    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
  return (
    <div className="flex bg-indigo-800 h-screen">
      <div className="w-1/5 p-4 bg-teal-400  text-white h-1/2 rounded-lg mx-1 my-2">
        <Sidebar />
      </div>

      <div>
        <h2 className="ml-4 p-2 font-bold">Sorted Tasks By Priority</h2>
        {sortedTasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default FilteredTasksByPriority;
