import { FormControl } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import React from "react";

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

export default function BaseModal({ showModal, modalHandler, data }) {
  const handleClose = () => {
    modalHandler(false);
  };

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "yellow",
        width: "100%",
        height: "100%",
      }}
    >
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, overflowY: "auto" }}>
          <Typography variant="body1">{data}</Typography>
          <FormControl fullWidth sx={{}}></FormControl>
        </Box>
      </Modal>
    </div>
  );
}
