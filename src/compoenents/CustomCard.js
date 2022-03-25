import React from "react";
import { Card, Typography } from "@mui/material";

const CustomCard = ({ ticket }) => {
  const { title, type, assignedTo, epic } = ticket;
  return (
    <Card
      variant="outlined"
      sx={{ margin: "8px 0", padding: "8px", cursor: "move" }}
    >
      <Typography component="div" sx={{ fontWeight: "bold" }}>
        {title}
      </Typography>
      <Typography component="div">epic : {epic}</Typography>
      <Typography component="div">type : {type}</Typography>
      <Typography component="div">assigned : {assignedTo}</Typography>
    </Card>
  );
};

export default CustomCard;
