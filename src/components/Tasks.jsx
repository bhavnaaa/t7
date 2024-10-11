import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, CircularProgress } from "@mui/material";
import axios from "axios";
import './Tasks.css';  // Import the external CSS file

const columns = [
  { field: "taskTitle", headerName: "Task Title", width: 200 },
  { field: "taskDescription", headerName: "Task Description", width: 250 },
  { field: "taskListTitle", headerName: "Task List Title", width: 200 },
  { field: "createdBy", headerName: "Created By (Email ID)", width: 200 },
  { field: "creationTime", headerName: "Creation Time", width: 150 },
];

const Tasks = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://t7-2.onrender.com/tasklists");
        const taskData = [];

        response.data.forEach((user) => {
          user.todoLists.forEach((todoList) => {
            todoList.tasks.forEach((task) => {
              const creationTime = task.createdAt
                ? new Date(task.createdAt._seconds * 1000).toLocaleString()
                : "N/A";
              taskData.push({
                id: task.taskId,
                taskTitle: task.title,
                taskDescription: task.description,
                taskListTitle: todoList.name,
                createdBy: user.email,
                creationTime: creationTime,
              });
            });
          });
        });

        setRows(taskData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <Box className="tasks-container">
      <Typography variant="h4" className="tasks-title">
        Tasks
      </Typography>
      <Box className="data-grid-container">
        {loading ? (
          <CircularProgress className="loading-spinner" />
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            className="custom-data-grid"
          />
        )}
      </Box>
    </Box>
  );
};

export default Tasks;
