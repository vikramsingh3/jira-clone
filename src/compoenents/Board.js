import React from "react";
import CustomCard from "./CustomCard";
import { category } from "../data/categories";
import { Box, Toolbar, Typography, Divider } from "@mui/material";

const Board = ({ tickets }) => {
  const toDoList = tickets.filter(
    (ticket) => ticket.category === category.toDo
  );
  const inProgressList = tickets.filter(
    (ticket) => ticket.category === category.inProgress
  );
  const devCompleteList = tickets.filter(
    (ticket) => ticket.category === category.devComplete
  );
  const inQAList = tickets.filter(
    (ticket) => ticket.category === category.inQA
  );
  const doneList = tickets.filter(
    (ticket) => ticket.category === category.done
  );

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
            {category.toDo}
          </Typography>
          <Divider />
          {toDoList.map((ticket, index) => (
            <CustomCard ticket={ticket} key={index} />
          ))}
        </Box>
        <Box sx={{ backgroundColor: "#f4f5f7", padding: "8px" }}>
          <Typography align="center" component="div" variant="h6" gutterBottom>
            {category.inProgress}
          </Typography>
          <Divider />
          {inProgressList.map((ticket, index) => (
            <CustomCard ticket={ticket} key={index} />
          ))}
        </Box>
        <Box sx={{ backgroundColor: "#f4f5f7", padding: "8px" }}>
          <Typography align="center" component="div" variant="h6" gutterBottom>
            {category.devComplete}
          </Typography>
          <Divider />
          {devCompleteList.map((ticket, index) => (
            <CustomCard ticket={ticket} key={index} />
          ))}
        </Box>
        <Box sx={{ backgroundColor: "#f4f5f7", padding: "8px" }}>
          <Typography align="center" component="div" variant="h6" gutterBottom>
            {category.inQA}
          </Typography>
          <Divider />
          {inQAList.map((ticket, index) => (
            <CustomCard ticket={ticket} key={index} />
          ))}
        </Box>
        <Box sx={{ backgroundColor: "#f4f5f7", padding: "8px" }}>
          <Typography align="center" component="div" variant="h6" gutterBottom>
            {category.done}
          </Typography>
          <Divider />
          {doneList.map((ticket, index) => (
            <CustomCard ticket={ticket} key={index} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Board;
