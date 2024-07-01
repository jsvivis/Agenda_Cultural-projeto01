import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, CssBaseline, Typography, Avatar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Navbar() {
  return (
    <Box
      sx={{
        backgroundColor: "#1976d2",
        color: "white",
        paddingTop: 1,
        paddingBottom: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1200px",
          margin: "auto",
          paddingLeft: 2,
          paddingRight: 2,
        }}
      >
        <Box>
          <Button component={RouterLink} to="/" color="inherit">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Home
            </Typography>
          </Button>
        </Box>
        <Box>
          <Button color="inherit">
            <Avatar sx={{ bgcolor: "transparent" }}>
              <AccountCircleIcon />
            </Avatar>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
