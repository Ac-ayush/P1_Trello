import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LoginPage from "./components/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
import TaskBoard from "./components/TaskBoard";
import FilteredTasks from "./components/FilteredTasksByPriority";
import FilteredTasksByPriority from "./components/FilteredTasksByPriority";
import FilteredTasksByDate from "./components/FilteredTasksByDate";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/taskboard"
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              Component={TaskBoard}
            />
          }
        />
        <Route
          path="/filteredTasksByPriority"
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              Component={FilteredTasksByPriority}
            />
          }
        />
        <Route
          path="/FilteredTasksByDate"
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              Component={FilteredTasksByDate}
            />
          }
        />
        <Route
          path="/taskboard"
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              Component={TaskBoard}
            />
          }
        />
        {/* <Route path="/" element={<Redirect to="/login" />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
