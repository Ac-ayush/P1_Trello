import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editTask } from "../taskSlice";

const EditTaskModal = ({ isOpen, onClose, task }) => {
  const [editedTask, setEditedTask] = useState({ ...task });
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };
  const handleEditClick = () => {
    dispatch(editTask({ id: task.id, updatedTask: editedTask }));
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 ${
        isOpen ? "block" : "hidden"
      } flex items-center justify-center z-50`}
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>

      <div className=" bg-slate-400 p-4 shadow-md rounded-lg w-2/4 relative">
        <h3 className="text-2xl font-bold mb-4">Edit Task</h3>
        <label className="mb-2">Title:</label>
        <input
          type="text"
          name="title"
          value={editedTask.title}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 mb-4 w-full rounded-xl"
        />
        <label className="mb-2">Description:</label>
        <input
          type="text"
          name="description"
          value={editedTask.description}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 mb-4 w-full rounded-xl"
        />
        <label className="mb-2">Priority::</label>
        <input
          type="text"
          name="priority"
          value={editedTask.priority}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 mb-4 w-full rounded-xl"
        />

        <label className="">Status:</label>
        <select
          name="status"
          value={editedTask.status}
          onChange={handleInputChange}
        >
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <div className="flex justify-end">
          <button
            onClick={handleEditClick}
            className="bg-indigo-800 text-white px-4 py-2 mr-2 rounded"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
