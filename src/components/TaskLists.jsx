import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import './TaskLists.css';

const columns = [
  { field: "taskListTitle", headerName: "Task List Title", width: 200 },
  { field: "createdBy", headerName: "Created By (Email ID)", width: 200 },
  { field: "noOfTasks", headerName: "No. of Tasks", type: "number", width: 150 },
  { field: "creationTime", headerName: "Creation Time", width: 150 },
  { field: "lastUpdated", headerName: "Last Updated", width: 150 },
];

const TaskLists = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTaskLists = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:4000/tasklists");
        const formattedData = [];

        response.data.forEach((user) => {
          user.todoLists.forEach((todoList) => {
            const createdAt = todoList.createdAt
              ? new Date(todoList.createdAt._seconds * 1000).toLocaleString()
              : "N/A";
            const updatedAt = todoList.updatedAt
              ? new Date(todoList.updatedAt._seconds * 1000).toLocaleString()
              : "N/A";

            formattedData.push({
              id: todoList.todoListId,
              taskListTitle: todoList.name,
              createdBy: user.email,
              noOfTasks: todoList.no_of_tasks,
              creationTime: createdAt,
              lastUpdated: updatedAt,
            });
          });
        });

        setRows(formattedData);
      } catch (error) {
        console.error("Error fetching task lists:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskLists();
  }, []);

  return (
    <Box className="task-lists-container">
      <Typography variant="h4" className="task-lists-title">
        Task Lists
      </Typography>
      <Box className="data-grid-container">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          loading={loading}
          className="custom-data-grid"
        />
      </Box>
    </Box>
  );
};

export default TaskLists;