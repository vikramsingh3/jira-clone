import { useEffect, useState } from "react";
import Board from "./compoenents/Board";
import Menu from "./compoenents/Menu";
import { Box } from "@mui/material";
import Header from "./compoenents/Header";
import axios from "axios";
import baseUrl from "./data/baseUrl";

function App() {
  const [tickets, setTickets] = useState([]);
  const [toFilterTitle, setToFilterTitle] = useState([]);
  const [toFilterUsers, setToFilterUsers] = useState([]);
  const [toFilterEpics, setToFilterEpics] = useState([]);
  const [toFilterTypes, setToFilterTypes] = useState([]);

  const ticketsArray = Object.keys(tickets).map((id) => {
    return { ...tickets[id], id: id };
  });
  let filteredTickets = ticketsArray;
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
  const fetchTickets = async () => {
    try {
      const response = await axios.get(baseUrl + "tickets.json");
      console.log(response);
      if (response.data) {
        setTickets(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      <Menu
        tickets={ticketsArray}
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
