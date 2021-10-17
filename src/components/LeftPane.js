import React from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from "@mui/material";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmojiObjectsOutlinedIcon from "@mui/icons-material/EmojiObjectsOutlined";
import StarsOutlinedIcon from "@mui/icons-material/StarsOutlined";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import SettingsIcon from "@mui/icons-material/Settings";

import Notifications from "./Notifications";
import Messages from "./Messages";

export default function LeftPane(props) {
  const selected = props.currentTab;

  const isSelected = (tab) => {
    if (tab === selected) {
      return "primary";
    } else {
      return;
    }
  };

  return (
    <div
      style={{
        top: "0px",
        flex: "1 1 0px",
        height: "100vh",
        position: "sticky",
        maxWidth: "380px",
        minWidth: "300px",
        padding: "20px 0px 25px 45px",
        zIndex: 1,
        overflowX: "hidden",
        overflowY: "auto"
      }}
    >
      <div>
        <div
          style={{
            overflowY: "auto",
            paddingTop: "16px"
          }}
        >
          <div style={{ paddingBottom: "35px" }}>
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
                <span style={{ fontSize: "18px", marginLeft: "3px" }}>
                  EggDao
                </span>
              </div>
            </Link>
          </div>
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
                      alt={`Avatar de ${localStorage.getItem("name")}`}
                    />
                    <div>
                      <Typography
                        style={{
                          color: "#000000",
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
                <ListItem button component={Link} to="/notifications">
                  <ListItemIcon>
                    <Notifications color={isSelected("Notifications")} />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography
                      variant="body1"
                      color={isSelected("Notifications")}
                    >
                      Notifications
                    </Typography>
                  </ListItemText>
                </ListItem>
                <ListItem
                  button
                  component="a"
                  href="https://twetch.app/chat/home"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ListItemIcon>
                    <Messages color={isSelected("Chat")} />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body1" color={isSelected("Chat")}>
                      Chat
                    </Typography>
                  </ListItemText>
                </ListItem>
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
          <div>
            <Button
              component={Link}
              to="/compose"
              style={{
                height: "35px",
                overflow: "hidden",
                fontSize: "18px",
                fontWeight: 600,
                paddingLeft: "4px",
                paddingRight: "14px",
                textTransform: "none"
              }}
              variant="contained"
              color="primary"
              startIcon={
                <div
                  style={{
                    display: "flex",
                    padding: "8px 11px",
                    marginLeft: "-4px",
                    marginRight: "13px",
                    borderRadius: "6px",
                    backgroundColor: "rgba(0, 0, 0, 0.1)"
                  }}
                >
                  <AddCircleOutlineRoundedIcon
                    style={{
                      height: "18px",
                      width: "18px"
                    }}
                  />
                </div>
              }
            >
              Create Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
