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
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  maxHeight: "50vh",
  maxWidth: "100vw",
  p: 4,
};

export default function BaseModal({
  showModal,
  modalHandler,
  data,
  widthVW = "100%",
  heightVH = "100%",
}) {
  // const [open, setOpen] = useState(showModal);
  // const [tickerInput, setTickerInput] = useState("");
  // const handleOpen = () => setOpen(true);

  const handleClose = () => {
    // setTickerInput("");
    // setRefreshData(true);
    // setOpen(false);
    modalHandler(false);
  };

  // const onTickerSubmit = async () => {
  //   try {
  //     await beApi.get(`/annual/${tickerInput}`);
  //     setTickerInput("");
  //     handleClose();
  //   } catch (err) {
  //     console.log("unable to add company", err);
  //   }
  // };

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "yellow",
        width: "100%",
        height: "100%",
      }}
    >
      {/* // <div> */}
      {/* <AddCircleIcon
        sx={{ alignSelf: "center", display: displayModal ? "" : "none" }}
        color="primary"
        onClick={handleOpen}
        fontSize="large"
      /> */}
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style }}>
          <Typography variant="body1">{data}</Typography>
          <FormControl fullWidth sx={{}}>
            {/* <TextField
              label="Add Label Here dynamically"
              margin="normal"
              value={"Add Value here dynamically"}
              onChange={(e) => console.log("add on change handler")}
            /> */}
            {/* <Button
              variant="contained"
              onClick={() => console.log("add button click handler")}
            >
              Button Label
            </Button> */}
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
}
