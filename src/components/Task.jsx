import React, { useState } from "react";
import EditTaskModal from "./EditTaskModal";

const Task = ({ task }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const toggleEditModal = (e) => {
    // e.stopPropagation();
    setShowDetails(false);
    setEditModalOpen(!isEditModalOpen);
  };
  return (
    <div className="w-full bg-teal-400 p-2 m-2 rounded-lg">
      <div
        onClick={toggleDetails}
        className="bg-green-500  p-2 cursor-pointer text-center font-bold rounded-lg"
      >
        {task.title}
      </div>
      {showDetails && (
        <div >
          
          <p>Description: {task.description}</p>
          <p>Priority: {task.priority}</p>
          <p>Planned Date: {task.plannedDate}</p>
          <p>Status: {task.status}</p>
          <p>Assignee: {task.assignee}</p>
          <p>Reporter: {task.reporter}</p>
          {task.attachments && (
            <div>
              <h4>Attachments:</h4>
              <select>
                {task.attachments.map((attachment, index) => (
                  <option key={index}>{attachment}</option>
                ))}
              </select>
            </div>
          )}
          <button
            onClick={toggleEditModal}
            className="bg-green-500  p-2 m-2 rounded-lg w-full mx-auto"
          >
            Edit
          </button> 
        </div>
      )}
      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={toggleEditModal}
        task={editedTask}
      />
    </div>
  );
};

export default Task;
