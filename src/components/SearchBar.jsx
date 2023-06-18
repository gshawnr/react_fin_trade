import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar({ handleTermSearch }) {
  const onTermChange = async (e) => {
    const value = e.target.value;
    setSearchText(value);
    await handleTermSearch(value);
  };
  const [searchText, setSearchText] = useState("");
  return (
    <TextField
      variant="outlined"
      placeholder="Search"
      value={searchText}
      onChange={onTermChange}
      size="small"
      sx={{ margin: "10px" }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default SearchBar;
