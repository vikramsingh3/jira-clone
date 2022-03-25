import { useState } from "react";
import {
  Checkbox,
  TextField,
  Autocomplete,
  Button,
  Drawer,
  Toolbar,
} from "@mui/material";
import { CheckBoxOutlineBlank, CheckBox } from "@mui/icons-material";
import { type, tickets } from "../data/categories";

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

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      elevation={0}
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Button
        variant="text"
        onClick={clearAllFiltersHandler}
        sx={{ margin: "10px" }}
      >
        Clear All Filters
      </Button>

      <Autocomplete
        id="type"
        options={uniqueTicketTitle}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search tickets by title"
            variant="outlined"
          />
        )}
        value={defaultValues.title}
        onChange={(event, newValue) => {
          setDefaultValues((prevDefaults) => {
            return { ...prevDefaults, title: newValue };
          });
          filterTitle(newValue);
        }}
        sx={{ margin: "10px" }}
      />

      <Autocomplete
        className="Menu__input"
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
          <TextField {...params} label="Select User" variant="outlined" />
        )}
        value={defaultValues.users}
        onChange={(event, newValue) => {
          setDefaultValues((prevDefaults) => {
            return { ...prevDefaults, users: newValue };
          });
          filterUsers(newValue);
        }}
        sx={{ margin: "10px" }}
      />

      <Autocomplete
        className="Menu__input"
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
          <TextField {...params} label="Select Epic" variant="outlined" />
        )}
        value={defaultValues.epics}
        onChange={(event, newValue) => {
          setDefaultValues((prevDefaults) => {
            return { ...prevDefaults, epics: newValue };
          });
          filterEpics(newValue);
        }}
        sx={{ margin: "10px" }}
      />

      <Autocomplete
        className="Menu__input"
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
          <TextField {...params} label="Select Type" variant="outlined" />
        )}
        value={defaultValues.types}
        onChange={(event, newValue) => {
          setDefaultValues((prevDefaults) => {
            return { ...prevDefaults, types: newValue };
          });
          filterTypes(newValue);
        }}
        sx={{ margin: "10px" }}
      />
    </Drawer>
  );
}
