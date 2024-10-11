import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, CircularProgress } from "@mui/material";
import './Users.css';  // Import the external CSS file

const columns = [
  { field: "email", headerName: "Email ID", width: 300 },
  { field: "password", headerName: "Password", width: 350 },
  { field: "signupTime", headerName: "Signup Time", width: 200 },
  { field: "ip", headerName: "IP", width: 150 },
];

const Users = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await fetch("https://t7-2.onrender.com/users");
        const data = await response.json();
        setRows(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchUsers();
  }, []);

  return (
    <Box className="users-container">
      <Typography variant="h4" className="users-title">
        Users
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

export default Users;
