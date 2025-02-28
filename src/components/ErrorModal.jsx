import ErrorIcon from "@mui/icons-material/Error";
import MuiModal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

import { Button } from "@mui/material";
import "./ErrorModal.css";

export default function ErrorModal({
  openModal,
  onClose,
  title = "",
  content,
}) {
  return (
    <div>
      <MuiModal
        open={openModal}
        onClose={onClose}
        aria-labelledby="error-modal-title"
        aria-describedby="error-modal-description"
      >
        <div className="error-modal-container">
          <div className="error-modal-icon">
            <ErrorIcon sx={styles.errorIcon} />
          </div>
          <div className="error-modal-content">
            <div>
              <Typography
                id="error-modal-title"
                sx={{
                  ...styles.text,
                  fontSize: "25px",
                }}
              >
                {title}
              </Typography>

              <Typography
                id="error-modal-description"
                sx={{
                  ...styles.text,
                  fontSize: "20px",
                  fontStyle: "italic",
                }}
              >
                {content}
              </Typography>
            </div>

            <Button
              fullWidth
              variant="contained"
              onClick={onClose}
              sx={styles.btn}
            >
              ok
            </Button>
          </div>
        </div>
      </MuiModal>
    </div>
  );
}

const styles = {
  errorIcon: {
    color: "#EF4040",
    fontSize: "100px",
  },

  text: {
    textAlign: "center",
  },

  btn: {
    backgroundColor: "#ef4040",
    "&:hover": {
      backgroundColor: "#FF6868",
    },
  },
};
