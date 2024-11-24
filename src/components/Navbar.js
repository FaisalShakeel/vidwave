import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import { Menu as MenuIcon, Notifications, Add, Search } from "@mui/icons-material";

const Navbar = ({ toggleSidebar }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        backgroundColor: "#ffffff", 
        boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
        borderRadius: { xs: 0, md: "10px" },
        m: { xs: 0, md: 2 },
        zIndex: 1200,  // Ensure it stays above content
      }}
    >
      <Toolbar>
        {/* Toggle Sidebar - Only visible on mobile */}
        <IconButton
          edge="start"
          color="primary"
          onClick={toggleSidebar}
          sx={{ marginRight: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Project Name */}
        <Typography variant="h5" sx={{ color: "#007BFF", fontWeight: "bold", flexGrow: { xs: 1, md: 0 }, mr: 4 }}>
          Vidwave
        </Typography>

        {/* Search Bar */}
        <Box
          sx={{
            backgroundColor: "#f1f5fc",
            borderRadius: 3,
            padding: "4px 8px",
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            width: "40%",
            boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
            mx: 2,
          }}
        >
          <Search sx={{ color: "#007BFF", marginRight: 1 }} />
          <InputBase placeholder="Search…" sx={{ color: "#333", flexGrow: 1 }} />
        </Box>

        {/* Icons */}
        <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton color="primary">
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton color="primary">
            <Add />
          </IconButton>

          {/* Profile */}
          <IconButton onClick={handleMenuOpen}>
            <img
              src="https://via.placeholder.com/32"
              alt="Profile"
              style={{ borderRadius: "50%" }}
            />
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ mt: 2 }}
        >
          <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Go to Studio</MenuItem>
          <MenuItem onClick={handleMenuClose}>Sign Out</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
