import { twquery } from "../api/TwetchGraph";
const Twetch = require("@twetch/sdk");
const clientId = "";
export const imbCli = window.location.href.includes("csb")
  ? "d1782f2caa2a71f85576cc0423818882"
  : "ce4eb6ea41a4f43044dd7e71c08e50b2";
const twetch = new Twetch({ clientIdentifier: clientId });
class Auth {
  constructor() {
    this.authenticated = localStorage.tokenTwetchAuth || false;
  }

  MBLogin(cb) {
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
                try {
                  twLogin(ops[2].value, resp.message, ops[0].value, () => {
                    console.log("logged in");
                    this.authenticated = true;
                    cb();
                  });
                } catch (error) {
                  this.authenticated = false;
                  console.log(error);
                }
              }
            }
          });
        });
    } else {
      this.authenticated = true;
      cb();
    }
  }

  login(cb) {
    try {
      twetch.authenticate();
      this.authenticated = true;
      cb();
    } catch (e) {
      this.authenticated = false;
      console.log(e);
    }
  }

  logout(cb) {
    localStorage.clear();
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
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
