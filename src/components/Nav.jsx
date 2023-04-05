import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Grid,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AnalyticsIcon from "@mui/icons-material/Analytics";

import Drawer from "./Drawer";

const links = [
  { name: "Home", path: "/" },
  { name: "Company", path: "/investing/company" },
  { name: "Summary", path: "/investing/summary" },
  { name: "Metrics", path: "/investing/metric" },
  { name: "About", path: "/about" },
];

function Nav() {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("lg"));

  const handleTabChange = (link) => {
    navigate(link.path);
  };

  return (
    <div
      style={
        isMatch
          ? { marginBottom: "15%" }
          : { marginBottom: "0%", height: "15px" }
      }
    >
      <AppBar
        sx={{
          backgroundImage:
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(66,99,196,1) 35%, rgba(0,212,255,1) 100%)",
        }}
      >
        <Toolbar>
          {isMatch ? (
            <>
              <Typography>
                <AnalyticsIcon sx={{ fontSize: 45 }} />
              </Typography>
              <Drawer links={[...links, { name: "Login", path: "/login" }]} />
            </>
          ) : (
            <Grid container spacing={1} sx={{ placeItems: "center" }}>
              <Grid item xs={2}>
                <Typography>
                  <AnalyticsIcon sx={{ fontSize: 45 }} />
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Tabs
                  centered
                  textColor="inherit"
                  indicatorColor="primary"
                  value={value}
                  onChange={(e, value) => setValue(value)}
                >
                  {links.map((link) => {
                    return (
                      <Tab
                        key={link.name}
                        label={link.name}
                        onClick={() => handleTabChange(link)}
                        sx={{ fontSize: "1em" }}
                      />
                    );
                  })}
                </Tabs>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={3}>
                <Box sx={{ display: "flex" }}>
                  <Button
                    variant="contained"
                    sx={{ marginLeft: "auto", background: "rgba(2,0,36,1)" }}
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </Button>
                  <Button variant="contained" sx={{ marginLeft: 1 }}>
                    Signup
                  </Button>
                </Box>
              </Grid>
            </Grid>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Nav;
