import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Backdrop, Button, Paper, Typography, useTheme } from "@mui/material";
import Logo from "../resources/Logo";
import MBLogo from "../resources/moneybutton.png";
import RelayLogo from "../resources/relay.png";
import HandCashLogo from "../resources/handcash.png";
import auth from "../utils/auth";
import { twquery } from "../api/TwetchGraph";

export const imbCli = window.location.href.includes("csb")
  ? "d1782f2caa2a71f85576cc0423818882"
  : "ce4eb6ea41a4f43044dd7e71c08e50b2";

export default function Auth() {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const host = window.location.host;
  const theme = useTheme();
  const TwetchLogin = (e) => {
    // config
    let redirectUrl = `https://${host}/auth/callback/twetch`;
    let appName = "EggDao";
    e.preventDefault();
    window.location.href = `https://twetch.app/auth/authorize?appName=${appName}&redirectUrl=${redirectUrl}`;
  };

  const handleDrawerToggle = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };

  /* const HandCashLogin = (e) => {
    e.preventDefault();
    window.location.href = redirectionLoginUrl;
  }; */

  /*const RelayXLogin = async () => {
    let token = await window.relayone.authBeta({ withGrant: true }),
      res;
    localStorage.setItem("token", token);
    let [payload, signature] = token.split(".");
    //console.log(signature);
    const data = JSON.parse(atob(payload));

    fetch("https://auth.twetch.app/api/v1/challenge", { method: "get" })
      .then((res) => {
        return res.json();
      })
      .then(async (resp) => {
        try {
          res = await window.relayone.sign(resp.message);
          const publicKey = window.bsv.PublicKey.fromHex(data.pubkey);
          const signAddr = window.bsv.Address.fromPublicKey(
            publicKey
          ).toString();
          if (res) {
            saveWallet(data.paymail, "relayx");
            if (localStorage.getItem("paymail")) {
              twLogin(signAddr, resp.message, res.value, () => {
                history.push("/");
              });
            }
          }
        } catch (e) {
          console.log(e);
        }
      });
  }; */

  const selectWallet = (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        maxHeight: "100vh",
        flexDirection: "column"
      }}
    >
      <div
        style={{
          display: "flex",
          flexGrow: 1,
          userSelect: "none"
        }}
      ></div>
      <div
        style={{
          transform: "none",
          transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
          width: "100%",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          maxWidth: "600px",
          maxHeight: "50vh",
          flexSirection: "column"
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "16px",
            background: "#F6F5FB",
            borderRadius: "12px 12px 0 0"
          }}
        >
          <Typography
            variant="body1"
            style={{
              color: "#010101",
              fontSize: "18px",
              fontWeight: "bold",
              lineHeight: "24px"
            }}
          >
            Select Wallet
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <Typography
            variant="body1"
            style={{
              color: "#838388",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "24px"
            }}
          >
            Cancel
          </Typography>
        </div>
        <div
          style={{
            flexGrow: 1,
            background: "#FFFFFF",
            overflowY: "auto"
          }}
        >
          {/* <div
            style={{
              cursor: "pointer",
              display: "flex",
              padding: "10px",
              borderTop: "1px solid #F0F0F6"
            }}
            onClick={RelayXLogin}
          >
            <img
              src={RelayLogo}
              alt="RelayX"
              style={{ height: "32px", width: "32px" }}
            />
            <Typography
              variant="body1"
              style={{
                color: "#010101",
                fontSize: "16px",
                lineHeight: "34px",
                marginLeft: "10px"
              }}
            >
              RelayX
            </Typography>
          </div> */}
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              padding: "10px",
              borderTop: "1px solid #F0F0F6"
            }}
            onClick={() => {
              auth.MBLogin(() => {
                history.push("/");
              });
            }}
          >
            <img
              src={MBLogo}
              alt="MoneyButton"
              style={{ height: "32px", width: "32px" }}
            />
            <Typography
              variant="body1"
              style={{
                color: "#010101",
                fontSize: "16px",
                lineHeight: "34px",
                marginLeft: "10px"
              }}
            >
              MoneyButton
            </Typography>
          </div>
          {/* <div
            style={{
              cursor: "pointer",
              display: "flex",
              padding: "10px",
              borderTop: "1px solid #F0F0F6"
            }}
            onClick={HandCashLogin}
          >
            <img
              src={HandCashLogo}
              alt="HandCash"
              style={{ height: "32px", width: "32px" }}
            />
            <Typography
              variant="body1"
              style={{
                color: "#010101",
                fontSize: "16px",
                lineHeight: "34px",
                marginLeft: "10px"
              }}
            >
              HandCash
            </Typography>
          </div> */}
        </div>
      </div>
    </div>
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        margin: "0 auto",
        display: "flex",
        padding: "0 16px",
        maxWidth: "100%",
        maxHeight: "100%",
        flexDirection: "column"
      }}
    >
      <div style={{ flexGrow: 1 }} />
      <Paper
        elevation={9}
        style={{
          width: "600px",
          margin: "0 auto",
          padding: "36px 44px",
          maxWidth: "100%",
          borderRadius: "6px"
        }}
      >
        <Logo style={{ alignContent: "center" }} />
        <Typography
          variant="body1"
          style={{
            paddingTop: "21px",
            margin: "0 auto",
            fontSize: "18px",
            textAlign: "center",
            lineHeight: "20px"
          }}
        >
          We like the egg
        </Typography>
        <div
          style={{
            width: "100%",
            margin: "20px auto 0 auto",
            display: "block",
            maxWidth: "300px"
          }}
        >
          <Button
            style={{
              color: "white",
              width: "100%",
              padding: "14px",
              fontSize: "16px",
              boxShadow: "none !important",
              fontWeight: 600,
              lineHeight: "24px",
              borderRadius: "6px",
              textTransform: "none"
            }}
            variant="contained"
            color="primary"
            onClick={TwetchLogin}
          >
            Log in with Twetch
          </Button>
        </div>
        <div
          style={{
            width: "100%",
            margin: "20px auto 0 auto",
            display: "block",
            maxWidth: "300px"
          }}
        >
          <Button
            style={{
              width: "100%",
              padding: "14px",
              fontSize: "16px",
              boxShadow: "none !important",
              fontWeight: 600,
              lineHeight: "24px",
              borderRadius: "6px",
              textTransform: "none",
              textAlign: "center"
            }}
            variant="outlined"
            color="primary"
            onClick={handleDrawerToggle}
          >
            Log in with wallet provider
          </Button>
        </div>
        <div
          style={{
            width: "100%",
            margin: "20px auto 0 auto",
            display: "block",
            maxWidth: "300px"
          }}
        >
          <div
            style={{
              width: "100%",
              margin: "20px auto 0 auto",
              display: "block",
              maxWidth: "300px"
            }}
          >
            <Typography
              variant="body1"
              style={{
                margin: "0 auto",
                fontSize: "18px",
                textAlign: "center",
                lineHeight: "20px"
              }}
            >
              Don't have a Twetch account? Grab an invite{" "}
              <a
                className="Links"
                href="/"
                target="_blank"
                style={{ color: theme.palette.primary.main }}
              >
                here
              </a>
            </Typography>
          </div>
        </div>
      </Paper>
      <div style={{ flexGrow: 1 }} />
      <Backdrop
        style={{
          opacity: 1,
          transition: "opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          width: "100%",
          height: "100%",
          zIndex: 1400,
          position: "absolute",
          background: "rgba(26, 26, 28, .5)",
          userSelect: "none"
        }}
        open={open}
        onClick={() => setOpen(false)}
      >
        {selectWallet}
      </Backdrop>
    </div>
  );
}

export const saveWallet = (paymail, wallet) => {
  localStorage.setItem("paymail", paymail);
  localStorage.setItem("wallet", wallet);
};

export const twLogin = (address, message, signature, callback) => {
  let obj = { address, message, signature };
  fetch("https://auth.twetch.app/api/v1/authenticate", {
    method: "post",
    body: JSON.stringify(obj),
    headers: { "Content-type": "application/json" }
  })
    .then((res) => {
      return res.json();
    })
    .then(async (resp) => {
      //console.log(resp);
      localStorage.setItem("tokenTwetchAuth", resp.token);
      let { me } = await twquery(`{ me { id icon name } }`);
      //console.log({ me });
      localStorage.setItem("id", me.id);
      localStorage.setItem("icon", me.icon);
      localStorage.setItem("name", me.name);
      localStorage.setItem("isOneClick", "false");
      callback();
    });
};
