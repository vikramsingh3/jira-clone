import { useState } from "react";
import CustomCard from "./CustomCard";
import { status } from "../data/categories";
import { Box, Toolbar, Typography, Divider } from "@mui/material";
import TicketModal from "./TicketModal";

const Board = ({ tickets }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const toDoList = tickets.filter((ticket) => ticket.status === status.toDo);
  const inProgressList = tickets.filter(
    (ticket) => ticket.status === status.inProgress
  );
  const devCompleteList = tickets.filter(
    (ticket) => ticket.status === status.devComplete
  );
  const inQAList = tickets.filter((ticket) => ticket.status === status.inQA);
  const doneList = tickets.filter((ticket) => ticket.status === status.done);
  const viewOrEditTicketHandler = (ticket) => {
    setSelectedCard(ticket);
    setModalOpen(true);
  };
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
      <Toolbar />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(5,1fr)",
          gridGap: "8px",
        }}
      >
        <Box sx={{ backgroundColor: "#f4f5f7", padding: "8px" }}>
          <Typography align="center" component="div" variant="h6" gutterBottom>
            {status.toDo}
          </Typography>
          <Divider />
          {toDoList.map((ticket) => (
            <CustomCard
              ticket={ticket}
              key={ticket.id}
              onClick={() => {
                viewOrEditTicketHandler(ticket);
              }}
            />
          ))}
        </Box>
        <Box sx={{ backgroundColor: "#f4f5f7", padding: "8px" }}>
          <Typography align="center" component="div" variant="h6" gutterBottom>
            {status.inProgress}
          </Typography>
          <Divider />
          {inProgressList.map((ticket) => (
            <CustomCard
              ticket={ticket}
              key={ticket.id}
              onClick={() => {
                viewOrEditTicketHandler(ticket);
              }}
            />
          ))}
        </Box>
        <Box sx={{ backgroundColor: "#f4f5f7", padding: "8px" }}>
          <Typography align="center" component="div" variant="h6" gutterBottom>
            {status.devComplete}
          </Typography>
          <Divider />
          {devCompleteList.map((ticket) => (
            <CustomCard
              ticket={ticket}
              key={ticket.id}
              onClick={() => {
                viewOrEditTicketHandler(ticket);
              }}
            />
          ))}
        </Box>
        <Box sx={{ backgroundColor: "#f4f5f7", padding: "8px" }}>
          <Typography align="center" component="div" variant="h6" gutterBottom>
            {status.inQA}
          </Typography>
          <Divider />
          {inQAList.map((ticket) => (
            <CustomCard
              ticket={ticket}
              key={ticket.id}
              onClick={() => {
                viewOrEditTicketHandler(ticket);
              }}
            />
          ))}
        </Box>
        <Box sx={{ backgroundColor: "#f4f5f7", padding: "8px" }}>
          <Typography align="center" component="div" variant="h6" gutterBottom>
            {status.done}
          </Typography>
          <Divider />
          {doneList.map((ticket) => (
            <CustomCard
              ticket={ticket}
              key={ticket.id}
              onClick={() => {
                viewOrEditTicketHandler(ticket);
              }}
            />
          ))}
        </Box>
      </Box>
      {isModalOpen && (
        <TicketModal
          isModalOpen
          setModalOpen={setModalOpen}
          initialValues={selectedCard}
        />
      )}
    </Box>
  );
};

export default Board;
