import React, { useState } from 'react';

const TaskDetailsModal = ({ onSave, onClose, card, task }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [priority, setPriority] = useState(task?.priority || 'Normal');
  const [plannedDate, setPlannedDate] = useState(task?.plannedDate || '');
  const [status, setStatus] = useState(task?.status || 'Todo');
  const [assignee, setAssignee] = useState(task?.assignee || '');
  const [reporter, setReporter] = useState(task?.reporter || '');
  const [attachments, setAttachments] = useState(task?.attachments || []);


  const handleStatusChange = (newStatus) => {
    // Set the new status in the state
    setStatus(newStatus);

    // Move task to the corresponding card based on status change
    moveTaskToCard({ ...task, status: newStatus });
  };



  const handleSave = () => {
    const newTask = {
      title,
      description,
      priority,
      plannedDate,
      status,
      assignee,
      reporter,
      attachments,
    };

    if (task) {
      // If task exists, it's an edit, so pass the updated task with its id
      onSave({ ...newTask, id: task.id });
    } else {
      // If no task, it's a new task, so just pass the new task
      onSave(newTask);
    }

    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
        {console.log(task)}
      <div className="bg-gray-300 p-8 rounded-md w-96">
        <h2 className="text-xl font-semibold mb-4">{task ? 'Edit Task' : 'Add Task'}</h2>

        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="Major">Major</option>
            <option value="Normal">Normal</option>
            <option value="Minor">Minor</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="plannedDate" className="block text-sm font-medium text-gray-700">
            Planned Date
          </label>
          <input
            id="plannedDate"
            type="date"
            value={plannedDate}
            onChange={(e) => setPlannedDate(e.target.value)}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

        <div className="mb-4">
          <label htmlFor="assignee" className="block text-sm font-medium text-gray-700">
            Assignee
          </label>
          <input
            id="assignee"
            type="text"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="reporter" className="block text-sm font-medium text-gray-700">
            Reporter
          </label>
          <input
            id="reporter"
            type="text"
            value={reporter}
            onChange={(e) => setReporter(e.target.value)}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="attachments" className="block text-sm font-medium text-gray-700">
            Attachments
          </label>
          <input
            id="attachments"
            type="file"
            multiple
            onChange={(e) => setAttachments(e.target.files)}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {attachments.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Attached Files:</label>
            <ul className="list-disc list-inside">
              {Array.from(attachments).map((file, index) => (
                <li key={index}>
                  <a
                    href={URL.createObjectURL(file)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {file.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-between">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:border-blue-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;
