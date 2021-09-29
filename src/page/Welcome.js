import React from "react";
import { Button, Grid, Hidden } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Welcome() {
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
            backgroundColor: "#e7ab3e",
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            backgroundImage: "url('./icon.png')",
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
                <Hidden smDown>
                  <span style={{ fontSize: "18px", marginLeft: "3px" }}>
                    EggDao
                  </span>
                </Hidden>
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
                  maxHeight: "333px"
                }}
              >
                <h1 style={{ color: "#000000" }}>
                  Upgrade your Twetch community
                </h1>
                <p>
                  Community tools to grow your wealth - twetch and earn
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
          <Hidden smDown>
            <Grid
              container
              style={{
                backgroundColor: "#7d5000",
                height: "99px",
                textAlign: "center"
              }}
            >
              <Grid item xs={12} sm={4}>
                <h4 style={{ color: "#e7ab3e" }}>Total Eggs Stacked</h4>
                <h3 style={{ color: "#e7ab3e" }}>3/2066</h3>
              </Grid>
              <Grid item xs={12} sm={4}>
                <h4 style={{ color: "#e7ab3e" }}>Community Ventures</h4>
                <h3 style={{ color: "#e7ab3e" }}>33</h3>
              </Grid>
              <Grid item xs={12} sm={4}>
                <h4 style={{ color: "#e7ab3e" }}>Current APY%</h4>
                <h3 style={{ color: "#e7ab3e" }}>333%</h3>
              </Grid>
            </Grid>
          </Hidden>
        </div>
      </div>
      <Hidden smUp>
        <Grid
          container
          style={{
            marginTop: "-99px",
            height: "100%",
            backgroundColor: "#7d5000",
            textAlign: "center"
          }}
        >
          <Grid style={{ height: "99px" }} item xs={12} sm={4}>
            <h4 style={{ color: "#e7ab3e" }}>Total Eggs Stacked</h4>
            <h3 style={{ color: "#e7ab3e" }}>3/2066</h3>
          </Grid>
          <Grid style={{ height: "99px" }} item xs={12} sm={4}>
            <h4 style={{ color: "#e7ab3e" }}>Community Ventures</h4>
            <h3 style={{ color: "#e7ab3e" }}>33</h3>
          </Grid>
          <Grid style={{ height: "99px" }} item xs={12} sm={4}>
            <h4 style={{ color: "#e7ab3e" }}>Current APY%</h4>
            <h3 style={{ color: "#e7ab3e" }}>333%</h3>
          </Grid>
        </Grid>
      </Hidden>
    </div>
  );
}
