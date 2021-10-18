import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Grid,
  Hidden,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { use100vh } from "react-div-100vh";

import AppBar from "../components/AppBar";
import Feature from "../components/Feature";
import LeftPane from "../components/LeftPane";
import RightPane from "../components/RightPane";

export default function Features(props) {
  const history = useHistory();
  const theme = useTheme();
  const height = use100vh();
  const containerHeight = height ? height : "100vh";

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
      {smDown ? null : <LeftPane currentTab="Features" />}
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
            {smUp ? null : <AppBar currentTab="Features" />}
            {smDown ? null : (
              <div
                style={{
                  height: "81px",
                  position: "sticky",
                  display: "flex",
                  justifyContent: "center",
                  padding: "16px",
                  borderBottom: "1px solid #F2F2F2"
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
                    Features
                  </Typography>
                </Button>
              </div>
            )}
          </div>
          <Grid
            container
            style={{
              padding: "16px",
              position: "relative",
              height: `calc(${containerHeight}px - 84px)`,
              overflowY: "auto"
            }}
          >
            <Grid item xs={12}>
              <Feature
                title="Unlimited Character Count"
                description="No more character restrictions for a single Twetch post"
                address="1C2meU6ukY9S4tY6DdbhNqc8PuDhif5vPE"
                target={21.8}
              />
              <Feature
                title="Advanced Search"
                description="Leverage the power of magic numbers to help you search and index the best content by topic"
                address="1C2meU6ukY9S4tY6DdbhNqc8PuDhif5vPE"
                target={218}
              />
              <Feature
                title="Boost Content"
                description="Attach energy to your ideas to signal their value in the most honest way possible"
                address="1C2meU6ukY9S4tY6DdbhNqc8PuDhif5vPE"
                target={2.18}
              />
              <Typography
                variant="body1"
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  lineHeight: "36px",
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  marginBottom: "12px"
                }}
              >
                Completed
              </Typography>
            </Grid>
          </Grid>
        </div>
      </div>
      {mdDown ? null : <RightPane />}
    </div>
  );
}
