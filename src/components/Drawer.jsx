import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Drawer as DrawerMUI,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

function Drawer({ links }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  return (
    <>
      <DrawerMUI
        PaperProps={{ sx: { backgroundColor: "#576CBC" } }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <List>
          {links.map((link) => {
            return (
              <ListItemButton
                key={link.name}
                divider
                onClick={() => setOpen(false)}
              >
                <ListItemIcon onClick={() => navigate(link.path)}>
                  <ListItemText sx={{ color: "white" }}>
                    {link.name}
                  </ListItemText>
                </ListItemIcon>
              </ListItemButton>
            );
          })}
        </List>
      </DrawerMUI>
      <IconButton
        sx={{ marginLeft: "auto", color: "white" }}
        onClick={() => setOpen(!open)}
      >
        <MenuRoundedIcon />
      </IconButton>
    </>
  );
}

export default Drawer;
