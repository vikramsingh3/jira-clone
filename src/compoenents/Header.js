import React from "react";
import { AppBar, Container, Toolbar, Typography, Button } from "@mui/material";

const Header = () => {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
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
          >
            Create New Ticket
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
