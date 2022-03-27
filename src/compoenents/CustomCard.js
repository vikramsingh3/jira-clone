import React from "react";
import { Card, Typography, Chip, Avatar } from "@mui/material";
import BugReportIcon from "@mui/icons-material/BugReport";
import ArticleIcon from "@mui/icons-material/Article";
import SplitscreenIcon from "@mui/icons-material/Splitscreen";

const typeCustomization = {
  task: { color: "green", icon: <SplitscreenIcon fontSize="small" /> },
  bug: { color: "red", icon: <BugReportIcon fontSize="small" /> },
  story: { color: "orange", icon: <ArticleIcon fontSize="small" /> },
};

const CustomCard = ({ ticket, onClick }) => {
  const { title, type, assignedTo, epic } = ticket;
  return (
    <Card
      variant="outlined"
      sx={{ margin: "8px 0", padding: "8px", cursor: "move" }}
      onClick={onClick}
    >
      <Typography component="div" sx={{ fontWeight: "bold" }}>
        {title}
      </Typography>
      <Typography
        component="div"
        sx={{
          borderRadius: "5px",
          textAlign: "center",
          margin: "4px 0",
          color: "white",
          backgroundColor: "#1976d2",
        }}
      >
        {epic}
      </Typography>
      <Typography
        component="div"
        sx={{
          color: typeCustomization[type].color || "",
          textTransform: "capitalize",
          display: "flex",
          marginBottom: "8px",
        }}
      >
        {typeCustomization[type].icon}
        {type}
      </Typography>
      <Chip
        avatar={<Avatar>{assignedTo[0].toUpperCase()}</Avatar>}
        label={assignedTo}
        variant="outlined"
        size="small"
      />
    </Card>
  );
};

export default CustomCard;
