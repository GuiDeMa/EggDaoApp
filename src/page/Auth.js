import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

import { twquery } from "../api/TwetchGraph";

const { HandCashConnect } = require("@handcash/handcash-connect");
export const handCashConnect = new HandCashConnect("60d35d1304898f0b46b7da39");
// Use this field to redirect the user to the HandCash authorization screen.
const redirectionLoginUrl = handCashConnect.getRedirectionUrl();

export const imbCli = window.location.href.includes("csb")
  ? "d1782f2caa2a71f85576cc0423818882"
  : "ce4eb6ea41a4f43044dd7e71c08e50b2";

export default function Auth() {
  const history = useHistory();
  const host = window.location.host;

  const TwetchLogin = (e) => {
    // config
    let redirectUrl = `https://${host}/auth/callback/twetch`;
    let appName = "EggDao";
    e.preventDefault();
    window.location.href = `https://twetch.app/auth/authorize?appName=${appName}&redirectUrl=${redirectUrl}`;
  };

  const HandCashLogin = (e) => {
    e.preventDefault();
    window.location.href = redirectionLoginUrl;
  };

  const MBLogin = async () => {
    // is also in TwetchAction component

    let getPermissionForCurrentUser = () => {
      return localStorage.token;
    };
    const imb = new window.moneyButton.IMB({
      clientIdentifier: imbCli,
      permission: getPermissionForCurrentUser(),
      onNewPermissionGranted: (token) => localStorage.setItem("token", token)
    });
    if (!localStorage.getItem("tokenTwetchAuth")) {
      fetch("https://auth.twetch.app/api/v1/challenge")
        .then(function (res) {
          return res.json();
        })
        .then(async (resp) => {
          var cryptoOperations = [
            {
              name: "mySignature",
              method: "sign",
              data: resp.message,
              dataEncoding: "utf8",
              key: "identity",
              algorithm: "bitcoin-signed-message"
            },
            { name: "myPublicKey", method: "public-key", key: "identity" },
            { name: "myAddress", method: "address", key: "identity" }
          ];
          imb.swipe({
            cryptoOperations: cryptoOperations,
            onCryptoOperations: async (ops) => {
              saveWallet(ops[1].paymail, "moneybutton");
              if (localStorage.getItem("paymail")) {
                twLogin(ops[2].value, resp.message, ops[0].value, () => {
                  history.push("/");
                });
              }
            }
          });
        });
    } else {
      history.push("/");
    }
  };
  const RelayXLogin = async () => {
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
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        margin: "0 auto",
        display: "flex",
        padding: "0 16px",
        maxWidth: "100%",
        maxHeight: "100%",
        flexDirection: "column"
      }}
    >
      <div style={{ flexGrow: 1 }} />
      <div
        style={{
          width: "600px",
          margin: "0 auto",
          padding: "36px 44px",
          maxWidth: "100%"
        }}
      >
        <p
          style={{
            color: "#010101",
            margin: "0 auto 20px auto",
            fontSize: "30px",
            textAlign: "center",
            fontWeight: "bold",
            lineWeight: "36px"
          }}
        >
          <span role="img" aria-label="the egg way">
            (🥚,🐣)
          </span>
          <span style={{ fontSize: "18px", marginLeft: "3px" }}>EggDao</span>
        </p>
        <p
          style={{
            color: "#010101",
            margin: "0 auto",
            fontSize: "18px",
            textAlign: "center",
            lineHeight: "20px"
          }}
        >
          Operate onchain or don't, whatever
        </p>
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
            href="https://twet.ch/inv/eggdao"
            target="_blank"
          >
            But ser, I don't have a Twetch account
          </Button>
        </div>
        {/* <div
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
            onClick={MBLogin}
          >
            Log in with MoneyButton
          </Button>
        </div> */}
        <div
          style={{
            width: "100%",
            margin: "20px auto 0 auto",
            display: "block",
            maxWidth: "300px"
          }}
        >
          {/* <Button
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
            onClick={RelayXLogin}
          >
            Log in with RelayX
          </Button> */}
          {/* <div
            style={{
              width: "100%",
              margin: "20px auto 0 auto",
              display: "block",
              maxWidth: "300px"
            }}
          >
            <div id="connectButton" onClick={HandCashLogin}>
              Connect with HandCash
            </div>
          </div> */}
          <div
            style={{
              width: "100%",
              margin: "20px auto 0 auto",
              display: "block",
              maxWidth: "300px"
            }}
          >
            <Link to="/">
              <p
                style={{
                  margin: "0 auto",
                  fontSize: "18px",
                  textAlign: "center",
                  lineHeight: "20px"
                }}
              >
                Navigate anonymously
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div style={{ flexGrow: 1 }} />
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
      callback();
    });
};
