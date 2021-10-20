import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Hidden,
  Switch,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import AppBar from "../components/AppBar";
import LeftPane from "../components/LeftPane";
import RightPane from "../components/RightPane";
import auth from "../utils/auth";

export default function Settings(props) {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.colorMode === "dark" ? true : false || false
  );
  const [isOneClick, setIsOneClick] = useState(
    localStorage.isOneClick === "true" ? true : false || false
  );

  const history = useHistory();
  const theme = useTheme();

  const handleChangeDarkMode = (e) => {
    e.preventDefault();
    setIsDarkMode(e.target.checked);
    localStorage.setItem("colorMode", !isDarkMode ? "dark" : "light");
    window.location.reload();
  };

  const handleChange1Click = (e) => {
    e.preventDefault();
    setIsOneClick(e.target.checked);
    localStorage.setItem("isOneClick", !isOneClick);
  };

  const logOut = (e) => {
    e.preventDefault();
    auth.logout(() => {
      props.history.push("/auth");
    });
  };

  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center"
      }}
    >
      <Hidden smDown>
        {smDown ? null : <LeftPane currentTab="Settings" />}
      </Hidden>
      <div
        style={{
          flex: 2,
          width: "100%",
          maxWidth: "600px"
        }}
      >
        <div
          className="borders"
          style={{
            flex: 2,
            width: "100%",
            maxWidth: "600px",
            height: "100vh"
          }}
        >
          <div style={{ cursor: "pointer" }}>
            {smUp ? null : <AppBar currentTab="Settings" />}
          </div>
          {smDown ? null : (
            <div
              style={{
                height: "81px",
                position: "sticky",
                display: "flex",
                justifyContent: "center",
                padding: "16px",
                borderBottom: `1px solid ${theme.palette.divider}`
              }}
            >
              <Button
                style={{
                  margin: 0,
                  textDecoration: "none",
                  textTransform: "none"
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.primary,
                    fontSize: "22px",
                    fontWeight: "bold"
                  }}
                >
                  Settings
                </Typography>
              </Button>
            </div>
          )}
          <div
            style={{
              height: "63px",
              display: "flex",
              padding: "20px",
              borderBottom: `1px solid ${theme.palette.divider}`
            }}
          >
            <Typography
              style={{
                display: "inline-block",
                fontSize: "17px",
                fontWeight: "bold",
                lineHeight: "21px"
              }}
              variant="body1"
            >
              Dark Mode
            </Typography>
            <div style={{ flexGrow: 1 }} />
            <Switch
              checked={isDarkMode}
              onChange={handleChangeDarkMode}
              color="primary"
              style={{
                float: "right"
              }}
            />
          </div>
          <div
            style={{
              height: "63px",
              display: "flex",
              padding: "20px",
              borderBottom: `1px solid ${theme.palette.divider}`
            }}
          >
            <Typography
              style={{
                display: "inline-block",
                fontSize: "17px",
                fontWeight: "bold",
                lineHeight: "21px"
              }}
              variant="body1"
            >
              One Click Payment
            </Typography>
            <div style={{ flexGrow: 1 }} />
            <Switch
              checked={isOneClick}
              onChange={handleChange1Click}
              color="primary"
              style={{
                float: "right"
              }}
            />
          </div>
          <div
            style={{
              cursor: "pointer",
              height: "63px",
              display: "flex",
              justifyContent: "center",
              padding: "20px",
              borderBottom: `1px solid ${theme.palette.divider}`
            }}
          >
            <div
              style={{
                color: "#E81212",
                display: "inline-block",
                fontSize: "17px",
                fontWeight: "bold",
                lineHeight: "21px"
              }}
              onClick={logOut}
            >
              Log Out
            </div>
          </div>
        </div>
      </div>
      {mdDown ? null : <RightPane />}
    </div>
  );
}
