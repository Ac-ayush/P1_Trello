import React, { useState } from 'react';
import TaskCard from './TaskCard';
import TaskDetailsModal from './TaskDetailsModal';

const Taskboard = () => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState({
    Todo: [],
    Doing: [],
    Done: [],
  });

  const handleAddTask = (card) => {
    setSelectedCard(card);
    setShowTaskModal(true);
    setSelectedTask(null);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };


  const handleSaveTask = (newTask) => {
    setShowTaskModal(false);
  
    if (selectedTask) {
      // Update existing task
      const updatedTasks = {
        ...tasks,
        [selectedCard]: tasks[selectedCard].map((t) => (t.id === selectedTask.id ? newTask : t)),
      };
      setTasks(updatedTasks);
  
      // Move task to the corresponding card if status changes
      if (selectedCard !== newTask.status) {
        const updatedTasks = {
          ...updatedTasks,
          [newTask.status]: [...updatedTasks[newTask.status], newTask],
        };
        setTasks(updatedTasks);
      }
    } else {
      // Add new task
      const updatedTasks = { ...tasks, [selectedCard]: [...tasks[selectedCard], newTask] };
      setTasks(updatedTasks);

      if (newTask.status !== 'Todo') {
        const updatedTasks = {
          ...updatedTasks,
          [newTask.status]: [...updatedTasks[newTask.status], newTask],
        };
        setTasks(updatedTasks);
      }
    }
  };
  

  const handleCloseModal = () => {
    setShowTaskModal(false);
    setSelectedCard('');
    setSelectedTask(null);
  };

  return (
    <div className="flex space-x-4">
      {Object.keys(tasks).map((card) => (
        <TaskCard
          key={card}
          card={card}
          tasks={tasks[card]}
          onAddTask={() => handleAddTask(card)}
          onTaskClick={(task) => handleTaskClick(task)}
        />
      ))}

      {showTaskModal && (
        <TaskDetailsModal
          onSave={handleSaveTask}
          onClose={handleCloseModal}
          card={selectedCard}
          task={selectedTask}
        />
      )}
    </div>
  );
};

export default Taskboard;
