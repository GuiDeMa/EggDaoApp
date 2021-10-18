import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme
} from "@mui/material";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmojiObjectsOutlinedIcon from "@mui/icons-material/EmojiObjectsOutlined";
import StarsOutlinedIcon from "@mui/icons-material/StarsOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";

import Messages from "./Messages";
import Notifications from "./Notifications";

export default function AppBar(props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { window } = props;
  const theme = useTheme();
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = (e) => {
    e.stopPropagation();
    setMobileOpen(!mobileOpen);
  };

  const selected = props.currentTab;

  const isSelected = (tab) => {
    if (tab === selected) {
      return "primary";
    } else {
      return;
    }
  };

  const drawer = (
    <div>
      <div
        style={{
          width: "90vw",
          display: "flex",
          overflow: "hidden",
          minWidth: "300px",
          flexDirection: "column"
        }}
      >
        <div
          style={{
            height: "54px",
            display: "flex",
            alignItems: "center",
            paddingLeft: "20px",
            borderBottom: `1px solid ${theme.palette.divider}`,
            paddingRight: "16px",
            justifyContent: "space-between"
          }}
        >
          <Typography
            style={{
              height: "54px",
              display: "flex",
              alignItems: "center",
              paddingLeft: "20px",
              paddingRight: "16px",
              justifyContent: "space-between"
            }}
            variant="body1"
          >
            Menu
          </Typography>
          <Typography
            style={{
              color: "rgba(0, 0, 0, .5)",
              cursor: "pointer",
              fontSize: "14px"
            }}
            variant="body1"
            onClick={handleDrawerToggle}
          >
            Close
          </Typography>
        </div>
        <div
          style={{
            overflowY: "auto",
            paddingTop: "16px"
          }}
        >
          <div
            style={{
              paddingLeft: "24px"
            }}
          >
            {localStorage.tokenTwetchAuth ? (
              <Link
                to={`/u/${localStorage.id}`}
                style={{ textDecoration: "None" }}
              >
                <div style={{ cursor: "pointer" }}>
                  <div style={{ display: "flex", marginBottom: "15px" }}>
                    <Avatar
                      style={{
                        cursor: "pointer",
                        background: "rgba(0, 0, 0, .5)",
                        transition: "height .2s ease, width .2s ease",
                        borderRadius: "100%",
                        width: "46px",
                        height: "46px",
                        display: "inline-block",
                        marginRight: "16px"
                      }}
                      src={localStorage.getItem("icon")}
                      alt={`${localStorage.getItem("name")}'s avatar`}
                    />
                    <div>
                      <Typography
                        style={{
                          color: theme.palette.text.primary,
                          fontWeight: "bold"
                        }}
                        variant="body1"
                      >
                        {localStorage.name}
                      </Typography>
                      <Typography style={{ color: "#828282" }} variant="body1">
                        @{localStorage.id}
                      </Typography>
                    </div>
                  </div>
                  <div
                    style={{
                      color: "#000000",
                      display: "flex"
                    }}
                  ></div>
                </div>
              </Link>
            ) : (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  color="primary"
                  variant="contained"
                  component={Link}
                  to="/auth"
                  style={{ textTransform: "none" }}
                >
                  Log In
                </Button>
              </div>
            )}
          </div>
          <div style={{ marginTop: "15px" }}></div>
          <div
            style={{
              paddingLeft: "24px"
            }}
          >
            <div>
              <List style={{ marginLeft: "-16px" }}>
                <ListItem button component={Link} to="/">
                  <ListItemIcon>
                    <HomeOutlinedIcon color={isSelected("Home")} />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body1" color={isSelected("Home")}>
                      Home
                    </Typography>
                  </ListItemText>
                </ListItem>

                <ListItem button component={Link} to="/features">
                  <ListItemIcon>
                    <LockOutlinedIcon color={isSelected("Features")} />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body1" color={isSelected("Features")}>
                      Features
                    </Typography>
                  </ListItemText>
                </ListItem>
                <ListItem button component={Link} to="/settings">
                  <ListItemIcon>
                    <SettingsIcon color={isSelected("Settings")} />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body1" color={isSelected("Settings")}>
                      Settings
                    </Typography>
                  </ListItemText>
                </ListItem>
              </List>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div
        style={{
          position: "sticky",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
          borderBottom: `1px solid ${theme.palette.divider}`
        }}
      >
        <div style={{ float: "left" }}>
          <IconButton
            style={{ height: "36px", width: "36px" }}
            onClick={handleDrawerToggle}
          >
            {localStorage.getItem("tokenTwetchAuth") ? (
              <Avatar
                src={localStorage.getItem("icon")}
                alt={`${localStorage.getItem("name")}`}
              />
            ) : (
              <MenuOutlinedIcon />
            )}
          </IconButton>
          <IconButton
            style={{ height: "36px", width: "36px" }}
            component={Link}
            to="/search/?searchTerm="
          >
            <SearchIcon color="primary" />
          </IconButton>
        </div>
        <div style={{ alignContent: "center" }}>
          <Link
            style={{
              color: "#2F2F2F",
              margin: 0,
              fontSize: "22px",
              fontWeight: "bold",
              textDecoration: "none"
            }}
            to="/"
          >
            <div
              style={{ fontWeight: 669, fontSize: "24px", cursor: "pointer" }}
            >
              <span role="img" aria-label="the egg way">
                (🥚,🐣)
              </span>
            </div>
          </Link>
        </div>
        <div style={{ float: "right" }}>
          {!localStorage.tokenTwetchAuth ? (
            <Link style={{ textDecoration: "none" }} to="/auth">
              <Button style={{ textTransform: "none" }} color="primary">
                Log In
              </Button>
            </Link>
          ) : (
            <div>
              <IconButton
                style={{ height: "36px", width: "36px" }}
                href="https://twetch.app/chat/home"
                target="_blank"
                rel="noreferrer"
              >
                <Messages color="primary" />
              </IconButton>
              <IconButton
                style={{ height: "36px", width: "36px" }}
                component={Link}
                to="/notifications"
              >
                <Notifications color="primary" />
              </IconButton>
            </div>
          )}
        </div>
      </div>
      <nav style={{}}>
        <Hidden smUp>
          <Drawer
            style={{
              position: "fixed",
              zIndex: 1300,
              inset: "0px"
            }}
            anchor="left"
            container={container}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
            onClose={handleDrawerToggle}
            open={mobileOpen}
            variant="temporary"
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}
