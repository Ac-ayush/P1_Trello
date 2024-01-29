import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center space-y-8 h-full">

      <div className="w-full">
        <button
          className="bg-indigo-800 p-2 rounded-lg w-full"
          onClick={(e) => navigate("/filteredTasksByPriority")}
        >
          Sort by Priority
        </button>
      </div>
      <div className="w-full">
        <button
          className="bg-indigo-800 p-2 rounded-lg w-full"
          onClick={(e) => navigate("/filteredTasksByDate")}
        >
          Sort by Date
        </button>
      </div>

      <div className="w-full">
        <button
          className="bg-slate-600 p-2 rounded-lg w-full"
          onClick={(e) => {
            e.preventDefault();
            navigate("/login");
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
