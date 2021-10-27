import React from "react";
import { Button, Grid, Hidden, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "../resources/Logo";
import TwetchEgg from "../resources/twetchEgg.png";

export default function Welcome() {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        overflow: "auto"
      }}
    >
      <div>
        <div
          style={{
            backgroundColor: theme.palette.primary.main,
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            backgroundImage: `url(${TwetchEgg})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          }}
        >
          <div
            style={{
              height: "100%"
            }}
          >
            <div style={{ padding: "24px" }}>
              <div
                style={{ fontWeight: 669, fontSize: "24px", cursor: "pointer" }}
              >
                <span role="img" aria-label="the egg way">
                  (🥚,🐣)
                </span>
                {smDown ? null : (
                  <span style={{ fontSize: "18px", marginLeft: "3px" }}>
                    EggDao
                  </span>
                )}
              </div>
            </div>
            <div style={{ display: "flex", height: "100%" }}>
              <div style={{ flexGrow: 1 }} />
              <div
                style={{
                  marginTop: "calc((100vh/2) - 309px",
                  textAlign: "center",
                  backgroundColor: "rgb(177, 124, 1, 0.15)",
                  backdropFilter: "blur(5px)",
                  padding: "12px",
                  borderRadius: "24px",
                  maxWidth: "333px",
                  maxHeight: "369px"
                }}
              >
                <h1 style={{ color: "#000000" }}>Upgrade your community</h1>
                <p style={{ color: "#000000" }}>
                  Community tools to grow your wealth - Twetch and earn
                  compounding interest
                </p>
                <Grid
                  container
                  spacing={2}
                  style={{ justifyContent: "center" }}
                >
                  <Grid item>
                    <Button
                      style={{ width: 222 }}
                      variant="contained"
                      color="secondary"
                    >
                      <Link
                        to="/auth"
                        style={{
                          color: "#000000",
                          textDecoration: "none",
                          textTransform: "none"
                        }}
                      >
                        Sign In
                      </Link>
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      href="https://eggdao.notion.site/EggDAO-cd8f099107704fecac5b8f318d41a330"
                      target="_blank"
                      style={{
                        width: 222,
                        textTransform: "none",
                        color: "black"
                      }}
                      variant="outlined"
                      color="secondary"
                    >
                      Documentation
                    </Button>
                  </Grid>
                </Grid>
              </div>
              <div style={{ flexGrow: 1 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
