import { useState } from "react";
import Board from "./compoenents/Board";
import Menu from "./compoenents/Menu";
import { tickets } from "./data/categories";
import { Box } from "@mui/material";
import Header from "./compoenents/Header";

function App() {
  const [toFilterTitle, setToFilterTitle] = useState([]);
  const [toFilterUsers, setToFilterUsers] = useState([]);
  const [toFilterEpics, setToFilterEpics] = useState([]);
  const [toFilterTypes, setToFilterTypes] = useState([]);

  let filteredTickets = tickets;
  if (toFilterTitle && toFilterTitle.length > 0) {
    filteredTickets = filteredTickets.filter((ticket) =>
      toFilterTitle.includes(ticket.title)
    );
  }
  if (toFilterUsers.length > 0) {
    filteredTickets = filteredTickets.filter((ticket) =>
      toFilterUsers.includes(ticket.assignedTo)
    );
  }
  if (toFilterEpics.length > 0) {
    filteredTickets = filteredTickets.filter((ticket) =>
      toFilterEpics.includes(ticket.epic)
    );
  }
  if (toFilterTypes.length > 0) {
    filteredTickets = filteredTickets.filter((ticket) =>
      toFilterTypes.includes(ticket.type)
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      <Menu
        filterTitle={setToFilterTitle}
        filterUsers={setToFilterUsers}
        filterEpics={setToFilterEpics}
        filterTypes={setToFilterTypes}
      />
      <Board tickets={filteredTickets} />
    </Box>
  );
}

export default App;
