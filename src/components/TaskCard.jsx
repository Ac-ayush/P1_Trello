import React from 'react';

const TaskCard = ({ card, tasks, onAddTask, onTaskClick }) => {
    console.log(tasks);
  return (
    <div className="flex-1 bg-gray-300  border m-2 p-4 rounded-md shadow-xl ">
      <h2 className="text-lg font-semibold mb-4">{card}</h2>
      {(tasks).map((task) => (
        <div 
          key={task.id}
          className="mb-2 p-2 border rounded-md cursor-pointer  border-white"
          onClick={() => onTaskClick(task)}
        >
          <h3 className="text-md font-medium">{task.title}</h3>
          <p className="text-sm text-gray-500">{task.description}</p>
        </div>
      ))}
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md"
        onClick={onAddTask}
      >
        Add Task
      </button>
    </div>
  );
};

export default TaskCard;
