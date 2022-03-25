import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@mui/material";
import "./TicketModal.css";

const TicketModal = ({ modalStateHandler, modalState }) => {
  // const [formData, setFormData] = useState({});
  return (
    <div className="ModalTicket">
      <Dialog
        disableEscapeKeyDown
        open={modalState}
        onClose={() => {
          modalStateHandler(false);
        }}
      >
        <DialogTitle>Fill the details</DialogTitle>
        <DialogContent className="TicketModal__content">
          <TextField variant="filled" label="Title" />
          <TextField variant="filled" label="Epic" />
          <TextField multiline rows={3} variant="filled" label="Description" />
          <FormControl variant="filled">
            <InputLabel>Type</InputLabel>
            <Select>
              <MenuItem value="task">Task</MenuItem>
              <MenuItem value="bug">Bug</MenuItem>
              <MenuItem value="story">Story</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="filled">
            <InputLabel>Type</InputLabel>
            <Select>
              <MenuItem value="toDo">To Do</MenuItem>
              <MenuItem value="inProgress">In Progress</MenuItem>
              <MenuItem value="devComplete">Dev Complete</MenuItem>
            </Select>
          </FormControl>
          <TextField variant="filled" label="Assigned To" />
        </DialogContent>
        <DialogActions>
          <Button variant="text">Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TicketModal;
