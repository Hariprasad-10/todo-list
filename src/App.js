import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const TodoApp = () => {
  // Local Storage Todos
  const [localTasks, setLocalTasks] = useState(() => {
    const storedTasks = localStorage.getItem("localTasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  // Session Storage Todos
  const [sessionTasks, setSessionTasks] = useState(() => {
    const storedTasks = sessionStorage.getItem("sessionTasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  // Cookies Todos
  const [cookieTasks, setCookieTasks] = useState(() => {
    const storedTasks = Cookies.get("cookieTasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [localTask, setLocalTask] = useState("");
  const [sessionTask, setSessionTask] = useState("");
  const [cookieTask, setCookieTask] = useState("");

  // Save Local Storage Tasks
  useEffect(() => {
    localStorage.setItem("localTasks", JSON.stringify(localTasks));
  }, [localTasks]);

  // Save Session Storage Tasks
  useEffect(() => {
    sessionStorage.setItem("sessionTasks", JSON.stringify(sessionTasks));
  }, [sessionTasks]);

  // Save Cookie Tasks
  useEffect(() => {
    Cookies.set("cookieTasks", JSON.stringify(cookieTasks), { expires: 7 });
  }, [cookieTasks]);

  // Add Task Handlers
  const addLocalTask = () => {
    if (localTask.trim()) {
      setLocalTasks((prev) => [...prev, { text: localTask, completed: false }]);
      setLocalTask("");
    }
  };

  const addSessionTask = () => {
    if (sessionTask.trim()) {
      setSessionTasks((prev) => [...prev, { text: sessionTask, completed: false }]);
      setSessionTask("");
    }
  };

  const addCookieTask = () => {
    if (cookieTask.trim()) {
      setCookieTasks((prev) => [...prev, { text: cookieTask, completed: false }]);
      setCookieTask("");
    }
  };

  // Toggle Completion Handlers
  const toggleLocalTask = (index) => {
    setLocalTasks((prev) =>
      prev.map((task, i) => (i === index ? { ...task, completed: !task.completed } : task))
    );
  };

  const toggleSessionTask = (index) => {
    setSessionTasks((prev) =>
      prev.map((task, i) => (i === index ? { ...task, completed: !task.completed } : task))
    );
  };

  const toggleCookieTask = (index) => {
    setCookieTasks((prev) =>
      prev.map((task, i) => (i === index ? { ...task, completed: !task.completed } : task))
    );
  };

  // Remove Task Handlers
  const removeLocalTask = (index) => {
    setLocalTasks((prev) => prev.filter((_, i) => i !== index));
  };

  const removeSessionTask = (index) => {
    setSessionTasks((prev) => prev.filter((_, i) => i !== index));
  };

  const removeCookieTask = (index) => {
    setCookieTasks((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
      {/* Local Storage */}
      <div style={listStyle}>
        <h3>Local Storage Todo</h3>
        <input
          type="text"
          value={localTask}
          onChange={(e) => setLocalTask(e.target.value)}
          placeholder="Add task"
        />
        <button onClick={addLocalTask}>Add</button>
        <ul>
          {localTasks.map((task, index) => (
            <li key={index} style={taskStyle(task.completed)}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleLocalTask(index)}
              />
              {task.text}
              <button onClick={() => removeLocalTask(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Session Storage */}
      <div style={listStyle}>
        <h3>Session Storage Todo</h3>
        <input
          type="text"
          value={sessionTask}
          onChange={(e) => setSessionTask(e.target.value)}
          placeholder="Add task"
        />
        <button onClick={addSessionTask}>Add</button>
        <ul>
          {sessionTasks.map((task, index) => (
            <li key={index} style={taskStyle(task.completed)}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleSessionTask(index)}
              />
              {task.text}
              <button onClick={() => removeSessionTask(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Cookies */}
      <div style={listStyle}>
        <h3>Cookies Todo</h3>
        <input
          type="text"
          value={cookieTask}
          onChange={(e) => setCookieTask(e.target.value)}
          placeholder="Add task"
        />
        <button onClick={addCookieTask}>Add</button>
        <ul>
          {cookieTasks.map((task, index) => (
            <li key={index} style={taskStyle(task.completed)}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCookieTask(index)}
              />
              {task.text}
              <button onClick={() => removeCookieTask(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const listStyle = {
  width: "30%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  backgroundColor: "#f9f9f9",
};

const taskStyle = (completed) => ({
  textDecoration: completed ? "line-through" : "none",
  marginBottom: "10px",
});

export default TodoApp;
