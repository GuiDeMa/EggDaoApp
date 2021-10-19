import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, OutlinedInput, Typography, useTheme } from "@mui/material";
import Logo from "../resources/Logo";
import { userData } from "../api/TwetchGraph";

const axios = require("axios");
const Twetch = require("@twetch/sdk");

export default function TwetchCallback() {
  const [recoveryPhrase, setRecoveryPhrase] = useState("");
  const [error, setError] = useState(false);
  const [errorDesc, setErrorDesc] = useState("");
  const history = useHistory();
  const theme = useTheme();
  let params = new URLSearchParams(document.location.search.substring(1));
  let tokenTwetch = params.get("token");
  localStorage.setItem("tokenTwetchAuth", tokenTwetch);
  const twetch = new Twetch();

  const axiosTwetchGraphQL = axios.create({
    baseURL: "https://api.twetch.app/v1/",
    headers: {
      Authorization: `Bearer ${tokenTwetch}`
    }
  });

  useEffect(() => {
    axiosTwetchGraphQL
      .post("/graphql", {
        query: userData
      })
      .then((resp) => {
        localStorage.setItem("icon", resp.data.data.me.icon);
        localStorage.setItem("id", resp.data.data.me.id);
        localStorage.setItem("name", resp.data.data.me.name);
        localStorage.setItem("isOneClick", "false");
      });
  }, []);

  const handleChangeRecoveryPhrase = (e) => {
    e.preventDefault();
    setError(false);
    setRecoveryPhrase(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const pKey = twetch.crypto.privFromMnemonic(recoveryPhrase);
      twetch.wallet.restore(pKey);
      localStorage.setItem("mnemonic", recoveryPhrase);
      history.push("/");
    } catch (err) {
      setError(true);
      setErrorDesc(err.message);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex"
      }}
    >
      <div style={{ flexGrow: 1 }} />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ flexGrow: 1 }} />
        <div
          style={{
            width: "100%",
            padding: "36px 44px",
            maxWidth: "600px",
            boxShadow: "0px 0px 60px rgb(0 0 0 / 10%)",
            borderRadius: "6px"
          }}
        >
          <div style={{ margin: "0 auto", maxWidth: "100%" }}>
            <div style={{ position: "relative", marginBottom: "36px" }}>
              <Logo style={{ color: "#000000" }} />
            </div>
            <Typography
              variant="body1"
              style={{
                marginTop: "9px",
                fontSize: "29px",
                textAlign: "center",
                fontWeight: "bold",
                lineHeight: "24px"
              }}
            >
              One Last Thing...
            </Typography>
            <Typography
              variant="body1"
              style={{ marginTop: "16px", textAlign: "center" }}
            >
              We need you to manually link your{" "}
              <a
                className="Links"
                href="https://twetch.app/wallet"
                rel="noreferrer"
                target="_blank"
              >
                <span style={{ color: theme.palette.primary.main }}>
                  Twetch Wallet
                </span>
              </a>{" "}
              to EggDao.
            </Typography>
            <Typography
              variant="body1"
              style={{ textAlign: "center", marginBottom: "36px" }}
            >
              <strong>We will never store your phrase.</strong>
            </Typography>
            <div
              style={{
                position: "relative",
                height: "175px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around"
              }}
            >
              <form
                style={{
                  margin: "24px auto",
                  maxWidth: "300px"
                }}
              >
                <OutlinedInput
                  style={{
                    padding: "18px 12px",
                    marginBottom: "9px",
                    backgroundColor: "#F0F0F6 !important"
                  }}
                  value={recoveryPhrase}
                  onChange={handleChangeRecoveryPhrase}
                  error={error}
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Paste your Twetch Wallet Recovery Phrase here"
                />
                {error && (
                  <Typography
                    variant="body1"
                    style={{
                      color: theme.palette.error.main,
                      marginBottom: "9px"
                    }}
                  >
                    {errorDesc}
                  </Typography>
                )}
                <Button
                  color="primary"
                  variant="contained"
                  style={{ textTransform: "none" }}
                  fullWidth
                  disabled={recoveryPhrase.length === 0}
                  onClick={handleSubmit}
                >
                  <Typography variant="body1">
                    Link Twetch Wallet and start
                    <span
                      role="img"
                      aria-label="the egg way"
                      style={{ marginLeft: "3px" }}
                    >
                      (🥚,🐣)
                    </span>
                  </Typography>
                </Button>
              </form>
            </div>
          </div>
        </div>
        <div style={{ flexGrow: 1 }} />
      </div>
      <div style={{ flexGrow: 1 }} />
    </div>
  );
}
