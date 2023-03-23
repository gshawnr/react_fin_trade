import React, { useState } from "react";
import { FormControl, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import beApi from "../api/beApi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddCompanyModal({ setRefreshData, displayModal }) {
  const [open, setOpen] = useState(false);
  const [tickerInput, setTickerInput] = useState("");
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setTickerInput("");
    setRefreshData(true);
    setOpen(false);
  };

  const onTickerSubmit = async () => {
    try {
      await beApi.get(`/annual/${tickerInput}`);
      setTickerInput("");
      handleClose();
    } catch (err) {
      console.log("unable to add company", err);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <AddCircleIcon
        sx={{ alignSelf: "center", display: displayModal ? "" : "none" }}
        color="primary"
        onClick={handleOpen}
        fontSize="large"
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a Company
          </Typography>
          <FormControl fullWidth sx={{ width: "100%" }}>
            <TextField
              label="Ticker"
              margin="normal"
              value={tickerInput}
              onChange={(e) => setTickerInput(e.target.value)}
            />
            <Button variant="contained" onClick={onTickerSubmit}>
              Add Company
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
}
