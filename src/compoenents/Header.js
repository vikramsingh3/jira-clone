import React, { useState } from "react";
import { AppBar, Container, Toolbar, Typography, Button } from "@mui/material";
import TicketModal from "./TicketModal";
import JiraLiteLogo from "../assets/jira-lite.png";

const Header = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const createNewTicketHandler = () => {
    setModalOpen(true);
  };
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            src={JiraLiteLogo}
            alt="Jira Lite"
            height={30}
            style={{
              marginRight: "10px",
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 0, marginRight: "10px" }}
          >
            J I R A
          </Typography>
          <Typography variant="h6" noWrap component="em" sx={{ flexGrow: 1 }}>
            lite
          </Typography>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            sx={{ flexGrow: 0 }}
            onClick={createNewTicketHandler}
          >
            Create New Ticket
          </Button>
        </Toolbar>
      </Container>
      {isModalOpen && <TicketModal isModalOpen setModalOpen={setModalOpen} />}
    </AppBar>
  );
};

export default Header;
