import { useState } from "react";
import { Checkbox, TextField, Autocomplete, Button } from "@mui/material";
import { CheckBoxOutlineBlank, CheckBox } from "@mui/icons-material";
import TicketModal from "../TicketModal/TicketModal";
import { type, tickets } from "../../data/categories";
import "./Menu.css";
const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

export default function Menu({
  filterTitle,
  filterUsers,
  filterEpics,
  filterTypes,
}) {
  const [defaultValues, setDefaultValues] = useState({
    title: [],
    users: [],
    epics: [],
    types: [],
  });
  const [modalOpen, setModalOpen] = useState(false);
  const uniqueTicketTitle = [
    ...tickets.reduce((acc, item) => {
      acc.add(item.title);
      return acc;
    }, new Set()),
  ];
  const uniqueUsers = [
    ...tickets.reduce((acc, item) => {
      acc.add(item.assignedTo);
      return acc;
    }, new Set()),
  ];
  const uniqueEpics = [
    ...tickets.reduce((acc, item) => {
      acc.add(item.epic);
      return acc;
    }, new Set()),
  ];
  const clearAllFiltersHandler = () => {
    filterTitle([]);
    filterUsers([]);
    filterEpics([]);
    filterTypes([]);
    setDefaultValues({
      title: [],
      users: [],
      epics: [],
      types: [],
    });
  };
  const createNewTicketHandler = () => {
    setModalOpen(true);
  };
  return (
    <div className="Menu">
      <div className="Menu__filters">
        <Autocomplete
          className="Menu__input"
          size="small"
          id="type"
          options={uniqueTicketTitle}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search tickets by title"
              variant="filled"
            />
          )}
          value={defaultValues.title}
          onChange={(event, newValue) => {
            setDefaultValues((prevDefaults) => {
              return { ...prevDefaults, title: newValue };
            });
            filterTitle(newValue);
          }}
        />

        <Button
          variant="contained"
          size="small"
          onClick={clearAllFiltersHandler}
        >
          Clear All Filters
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={createNewTicketHandler}
        >
          Create new ticket
        </Button>
      </div>
      <div className="Menu__filters">
        <Autocomplete
          className="Menu__input"
          size="small"
          multiple
          id="type"
          options={uniqueUsers}
          disableCloseOnSelect
          getOptionLabel={(option) => option}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option}
            </li>
          )}
          renderInput={(params) => (
            <TextField {...params} label="Select User" variant="filled" />
          )}
          value={defaultValues.users}
          onChange={(event, newValue) => {
            setDefaultValues((prevDefaults) => {
              return { ...prevDefaults, users: newValue };
            });
            filterUsers(newValue);
          }}
        />

        <Autocomplete
          className="Menu__input"
          size="small"
          multiple
          id="type"
          options={uniqueEpics}
          disableCloseOnSelect
          getOptionLabel={(option) => option}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option}
            </li>
          )}
          renderInput={(params) => (
            <TextField {...params} label="Select Epic" variant="filled" />
          )}
          value={defaultValues.epics}
          onChange={(event, newValue) => {
            setDefaultValues((prevDefaults) => {
              return { ...prevDefaults, epics: newValue };
            });
            filterEpics(newValue);
          }}
        />

        <Autocomplete
          className="Menu__input"
          size="small"
          multiple
          id="type"
          options={Object.values(type)}
          disableCloseOnSelect
          getOptionLabel={(option) => option}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option}
            </li>
          )}
          renderInput={(params) => (
            <TextField {...params} label="Select Type" variant="filled" />
          )}
          value={defaultValues.types}
          onChange={(event, newValue) => {
            setDefaultValues((prevDefaults) => {
              return { ...prevDefaults, types: newValue };
            });
            filterTypes(newValue);
          }}
        />
      </div>
      <TicketModal modalStateHandler={setModalOpen} modalState={modalOpen} />
    </div>
  );
}
