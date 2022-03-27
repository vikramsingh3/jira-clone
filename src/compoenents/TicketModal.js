import React, { useState } from "react";
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
  Grid,
  IconButton,
  FormHelperText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import baseUrl from "../data/baseUrl";
import { status, type } from "../data/categories";
import { useQueryClient, useMutation } from "react-query";

const postTicket = (formValues) => {
  return axios.post(baseUrl + "tickets.json", formValues);
};

const putTicket = ({ id, formVal }) => {
  return axios.put(baseUrl + "tickets/" + id + ".json", formVal);
};

const deleteTicket = ({ id }) => {
  return axios.delete(baseUrl + "tickets/" + id + ".json");
};

const TicketModal = ({ isModalOpen, setModalOpen, initialValues }) => {
  // React Query POST and PUT for automatic refetching
  const queryClient = useQueryClient();
  const { mutate: addMutation } = useMutation(
    (formVal) => postTicket(formVal),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("tickets");
        setModalOpen(false);
      },
    }
  );
  const { mutate: updateMutation } = useMutation((data) => putTicket(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("tickets");
      setModalOpen(false);
    },
  });
  const { mutate: deleteMutation } = useMutation((id) => deleteTicket(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("tickets");
      setModalOpen(false);
    },
  });

  const [formValues, setFormValues] = useState(
    initialValues || {
      title: "",
      description: "",
      epic: "",
      type: "",
      status: "",
      assignedTo: "",
    }
  );
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    epic: "",
    type: "",
    status: "",
    assignedTo: "",
  });

  const onChangeHandler = (event) => {
    setFormValues((prevFormValues) => {
      return { ...prevFormValues, [event.target.name]: event.target.value };
    });
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        [event.target.name]: event.target.value ? "" : "This field is required",
      };
    });
  };

  const setErrorsOnSubmit = () => {
    const errorBeforeSubmit = {};
    if (!formValues.title) errorBeforeSubmit.title = "This field is required";
    if (!formValues.description)
      errorBeforeSubmit.description = "This field is required";
    if (!formValues.epic) errorBeforeSubmit.epic = "This field is required";
    if (!formValues.type) errorBeforeSubmit.type = "This field is required";
    if (!formValues.status) errorBeforeSubmit.status = "This field is required";
    if (!formValues.assignedTo)
      errorBeforeSubmit.assignedTo = "This field is required";

    setErrors((prevErrors) => {
      return { ...prevErrors, ...errorBeforeSubmit };
    });
  };

  const onSubmitHandler = () => {
    if (
      formValues.title &&
      formValues.description &&
      formValues.epic &&
      formValues.type &&
      formValues.status &&
      formValues.assignedTo
    ) {
      initialValues
        ? updateMutation({ id: initialValues.id, formVal: formValues })
        : addMutation(formValues);
    } else {
      setErrorsOnSubmit();
    }
  };

  const onDeleteHandler = () => {
    deleteMutation({ id: initialValues.id });
  };
  return (
    <Dialog
      disableEscapeKeyDown
      maxWidth="md"
      fullWidth
      open={isModalOpen}
      onClose={() => {
        setModalOpen(false);
      }}
    >
      <DialogTitle>
        {initialValues
          ? "Ticket ID : " + initialValues.id
          : "Fill the details of ticket"}

        <IconButton
          sx={{ float: "right" }}
          onClick={() => {
            setModalOpen(false);
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={4}>
          <Grid item xs={8}>
            <TextField
              variant="outlined"
              label="Title"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              defaultValue={formValues.title}
              name="title"
              onChange={onChangeHandler}
              error={!!errors.title}
              helperText={errors.title}
            />
            <TextField
              multiline
              rows={8.8}
              variant="outlined"
              label="Description"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              defaultValue={formValues.description}
              name="description"
              onChange={onChangeHandler}
              error={!!errors.description}
              helperText={errors.description}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              label="Epic"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              defaultValue={formValues.epic}
              name="epic"
              onChange={onChangeHandler}
              error={!!errors.epic}
              helperText={errors.epic}
            />
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel variant="outlined">Type</InputLabel>
              <Select
                label="Type"
                defaultValue={formValues.type}
                value={formValues.type}
                name="type"
                onChange={onChangeHandler}
                error={!!errors.type}
              >
                {Object.values(type).map((t) => (
                  <MenuItem value={t} key={t}>
                    {t}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error>{errors.type}</FormHelperText>
            </FormControl>
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel variant="outlined">Status</InputLabel>
              <Select
                label="Status"
                defaultValue={formValues.status}
                value={formValues.status}
                name="status"
                onChange={onChangeHandler}
                error={!!errors.status}
              >
                {Object.values(status).map((s) => (
                  <MenuItem value={s} key={s}>
                    {s}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error>{errors.status}</FormHelperText>
            </FormControl>
            <TextField
              variant="outlined"
              label="Assigned To"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              defaultValue={formValues.assignedTo}
              name="assignedTo"
              onChange={onChangeHandler}
              error={!!errors.assignedTo}
              helperText={errors.assignedTo}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        {initialValues && (
          <Button
            variant="text"
            color="error"
            sx={{ marginRight: "20px" }}
            onClick={onDeleteHandler}
          >
            Delete
          </Button>
        )}
        <Button variant="text" onClick={onSubmitHandler}>
          {initialValues ? "Save" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TicketModal;
