import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import React from "react";
import ButtonUsage from "./ButtonUsage";
import Dropzone from "./Dropzone";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function TransitionsModal({ file, setFile }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ButtonUsage handleClick={handleOpen} text="Upload YLT File" />
      {/* <div>File: {file.name}</div> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Upload CSV File
            </Typography>
            <Dropzone file={file} setFile={setFile} />
            <ButtonUsage
              handleClick={handleClose}
              isDisabled={file.length === 0}
              text="Upload File"
            />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default TransitionsModal;
