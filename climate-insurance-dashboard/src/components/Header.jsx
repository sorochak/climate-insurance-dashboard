import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  useTheme,
  Container,
} from "@mui/material";
import reaskLogo from "../static/reaskLogo.webp";

function Header() {
  const theme = useTheme();

  return (
    <Box>
      <AppBar color="default" sx={{ backgroundColor: "#E0E0E0" }}>
        <Container maxWidth="lg">
          <Toolbar>
            <Box
              sx={{
                display: { xs: "none", md: "block" },
                mt: "4px",
              }}
            >
              <a
                href="https://reask.earth/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={reaskLogo} // Use the imported variable here
                  alt="Reask Logo"
                  style={{ height: "3rem", width: "auto" }}
                />
              </a>
            </Box>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, textAlign: "center" }}
            >
              Climate Resilient Property Dashboard
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default Header;
