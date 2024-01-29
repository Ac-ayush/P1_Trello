import React, { useState } from 'react';
import TaskCard from './TaskCard';
import TaskDetailsModal from './TaskDetailsModal';
import taskSlice from '../taskSlice';

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
  } else {
    // Add new task
    const updatedTasks = { ...tasks, [selectedCard]: [...tasks[selectedCard], newTask] };
    setTasks(updatedTasks);
  }

  // Move task to the corresponding card based on status change
  moveTaskToCard(newTask);
};


  const moveTaskToCard = (task) => {
    const { status } = task;

    if (status === 'Todo' || status === 'In Progress' || status === 'Completed') {
      const sourceCard = selectedTask ? selectedCard : 'Todo';
      const targetCard = status === 'Todo' ? 'Todo' : status === 'In Progress' ? 'Doing' : 'Done';

      if (sourceCard !== targetCard) {
        const updatedTasks = {
          ...tasks,
          [sourceCard]: tasks[sourceCard].filter(t => t.id !== task.id),
          [targetCard]: [...tasks[targetCard], task],
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
