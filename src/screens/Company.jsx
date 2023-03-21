import React, { useEffect, useContext, useState } from "react";
import { TextField, Button, Container, FormControl } from "@mui/material";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";

import { Context as AuthContext } from "../context/authContext";
import beApi from "../api/beApi";

function Company() {
  const { isSignedIn } = useContext(AuthContext);
  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState("");

  useEffect(() => {
    try {
      const getCompanies = async () => {
        const response = await beApi("/companies");
        if (response?.data) {
          setCompanies(response.data);
        }
      };
      getCompanies();
    } catch (err) {
      console.log("error fetching companies", err);
    }
  }, [companies]);

  const addCompany = async () => {
    try {
      await beApi.get(`/annual/${company}`);
      setCompanies([...companies, company]);
      setCompany("");
    } catch (err) {
      console.log("unable to add company", err);
    }
  };

  return (
    <div
      style={{
        width: "40%",
        backgroundColor: "#fff",
        margin: "auto",
        padding: "5%",
      }}
    >
      <List>
        {companies.map((company) => {
          return (
            <ListItem
              key={company}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={addCompany}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={company.toUpperCase()} />
            </ListItem>
          );
        })}
      </List>
      <FormControl fullWidth>
        <TextField
          label="Add Company"
          required
          margin="normal"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <Button
          variant="contained"
          style={{ margin: "5% 0" }}
          onClick={addCompany}
        >
          Add Company
        </Button>
      </FormControl>
    </div>
  );
}

export default Company;
