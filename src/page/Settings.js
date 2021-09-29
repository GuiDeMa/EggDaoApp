import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Hidden, Switch, Typography } from "@material-ui/core";
import AppBar from "../components/AppBar";
import LeftPane from "../components/LeftPane";
import RightPane from "../components/RightPane";

export default function Settings(props) {
  const [isOneClick, setIsOneClick] = useState(
    localStorage.isOneClick === "true" ? true : false || false
  );
  const history = useHistory();

  const handleChange1Click = (e) => {
    e.preventDefault();
    setIsOneClick(e.target.checked);
    localStorage.setItem("isOneClick", !isOneClick);
    console.log(localStorage.isOneClick);
  };

  const logOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.alert("Logged Out!");
    history.push("/auth");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center"
      }}
    >
      <Hidden smDown>
        <LeftPane currentTab="Settings" />
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
            maxWidth: "600px"
          }}
        >
          <div style={{ cursor: "pointer" }}>
            <Hidden smUp>
              <AppBar currentTab="Settings" />
            </Hidden>
          </div>
          <div
            style={{
              height: "63px",
              display: "flex",
              padding: "20px",
              borderBottom: "1px solid #F2F2F2"
            }}
          >
            <Typography
              style={{
                color: "#000000",
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
              disabled
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
              borderBottom: "1px solid #F2F2F2"
            }}
          >
            <Typography
              style={{
                color: "#000000",
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
              borderBottom: "1px solid #F2F2F2"
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
      <Hidden mdDown>
        <RightPane />
      </Hidden>
    </div>
  );
}
