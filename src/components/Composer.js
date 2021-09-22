import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Drawer,
  Grid,
  FormControl,
  MenuItem,
  Select,
  Snackbar,
  InputAdornment,
  LinearProgress,
  TextField,
  Typography
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";
import { imbCli } from "../page/Auth";
import { handCashConnect } from "../page/Auth";
import { BSVABI } from "../utils/BSVABI";
import { twquery } from "../api/TwetchGraph";
import {
  arrToScript,
  digestMessage,
  getABI,
  getPayees,
  publishRequest
} from "../api/TwetchActions";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Composer(props) {
  const window = props.window;
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const replyTx = props.replyTx;
  const [placeholder, setPlaceholder] = useState(
    "What do you *really* wanna learn?"
  );
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (replyTx) {
      console.log(replyTx);
      twquery(`{
        allPosts(
          condition: {transaction: "${replyTx}"}
        ) {
          edges {
            node {
              userByUserId {
                name
              }
            }
          }
        }
      }`).then((res) =>
        setPlaceholder(
          `In reply to ${res.allPosts.edges[0].node.userByUserId.name}`
        )
      );
    }
  }, []);

  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localStorage.isOneClick === "false") {
      setOpen(true);
      localStorage.wallet !== "handcash" && twetchPost(content, replyTx);
    } else {
      twetchPost(content, replyTx);
      setContent("");
    }
  };

  const getColor = () => {
    //console.log(256 - content.length);
    if (content.length > 255) {
      return "#E81212";
    } else {
      if (256 - content.length < 21) {
        return "#085AF6";
      } else {
        return "#696969";
      }
    }
  };
  const handleDrawerToggle = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };

  const pay = (
    <main>
      <div
        style={{
          height: "100%",
          width: "100vw",
          background: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          bottom: 0
        }}
      >
        <div
          style={{
            display: "flex",
            position: "fixed",
            bottom: 0,
            width: "100%"
          }}
        >
          <div style={{ flexGrow: 1 }}></div>
          <div
            style={{
              width: "600px",
              maxWidth: "calc(100% - 24px)",
              background: "white",
              borderRadius: "6px 6px 0 0"
            }}
          >
            <div style={{ padding: "16px", display: "flex" }}>
              <div
                style={{
                  color: "#2F2F2F",
                  margin: 0,
                  fontSize: "22px",
                  fontWeight: "bold",
                  textDecoration: "none"
                }}
              >
                Twetch
                <span style={{ color: "#085AF6", fontSize: "16px" }}>Pay</span>
              </div>
              <div style={{ flexGrow: 1 }} />
              <p
                style={{
                  fontSize: "18px",
                  lineHeight: "21px",
                  color: "#bdbdbd",
                  margin: 0,
                  fontWeight: "normal",
                  cursor: "pointer"
                }}
                onClick={handleDrawerToggle}
              >
                Close
              </p>
            </div>
            <div
              id="detail"
              style={{
                padding: "16px",
                borderTop: "2px solid #f2f2f2"
              }}
            >
              <div
                style={{
                  margin: "0 0 26px 0",
                  borderRadius: "6px"
                }}
              >
                <div
                  style={{
                    display: "block",
                    padding: "16px",
                    background: "#F6F5FB",
                    borderRadius: "6px",
                    textDecoration: "none"
                  }}
                >
                  <Link
                    style={{
                      display: "inline-block",
                      position: "relative",
                      marginRight: "12px",
                      verticalAlign: "top"
                    }}
                    to={`/u/${localStorage.id}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Avatar src={localStorage.icon} />
                  </Link>
                  <div
                    style={{
                      width: "calc(100% - 58px)",

                      display: "inline-block",
                      verticalAlign: "top"
                    }}
                  >
                    <div
                      style={{
                        width: "calc(100% - 58px)",
                        display: "inline-block",
                        verticalAlign: "top"
                      }}
                    >
                      <Link
                        to={`/u/${localStorage.id}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div
                          style={{
                            color: "#000000",
                            cursor: "pointer",
                            display: "inline-block",
                            overflow: "hidden",
                            fontSize: "16px",
                            maxWidth: "calc(100% - 64px)",
                            fontWeight: "bold",
                            lineHeight: "24px",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            verticalAlign: "top",
                            textDecoration: "none"
                          }}
                        >
                          {localStorage.name}
                        </div>
                      </Link>
                      <Typography
                        variant="body1"
                        style={{
                          color: "#828282",
                          display: "inline-block",
                          verticalAlign: "top"
                        }}
                      >{`@${localStorage.id}`}</Typography>
                    </div>
                    <div style={{ position: "relative" }}>
                      <Typography
                        variant="body1"
                        style={{
                          fontSize: "1rem",
                          fontFamily:
                            '"Roboto", "Helvetica", "Arial", sans-serif',
                          fontWeight: 400,
                          lineHeight: 1.5,
                          letterSpacing: "0.00938em",
                          wordWrap: "break-word"
                        }}
                      >
                        {content}
                      </Typography>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
            <div
              id="button"
              style={{
                marginBottom: "16px"
              }}
            >
              {localStorage.wallet === "handcash" && (
                <div>
                  <Typography
                    style={{
                      color: "#1A1A1C",
                      margin: "0 auto",
                      fontSize: "36px",
                      textAlign: "center",
                      fontWeight: 600,
                      lineHeight: "44px"
                    }}
                    variant="body1"
                  >
                    $0.02
                  </Typography>
                  <Typography
                    style={{
                      color: "#A5A4A9",
                      margin: "0 auto",
                      fontSize: "16px",
                      marginTop: "2px",
                      textAlign: "center",
                      lineHeight: "20px",
                      marginBottom: "18px"
                    }}
                    variant="body1"
                  >
                    0.00013378 BSV
                  </Typography>
                  <Button
                    style={{
                      width: "257px",
                      display: "block",
                      padding: "14px",
                      fontSize: "16px",
                      fontWeight: 600,
                      lineWeight: "24px",
                      textTransform: "none"
                    }}
                    color="primary"
                    variant="contained"
                    onClick={() => {
                      twetchPost(content, replyTx);
                      setContent("");
                    }}
                  >
                    Twetch It!
                  </Button>
                </div>
              )}
              {localStorage.wallet === "moneybutton" && (
                <div
                  id="moneybutton-post"
                  style={{
                    width: "257px",
                    display: "block",
                    padding: "14px",
                    fontSize: "16px",
                    fontWeight: 600,
                    lineWeight: "24px",
                    textTransform: "none"
                  }}
                ></div>
              )}
              {localStorage.wallet === "relayx" && (
                <Button
                  style={{
                    width: "257px",
                    display: "block",
                    padding: "14px",
                    fontSize: "16px",
                    fontWeight: 600,
                    lineWeight: "24px",
                    textTransform: "none"
                  }}
                  color="primary"
                  variant="contained"
                >
                  Twetch It!
                </Button>
              )}
            </div>
            <div style={{ height: "10vh" }}></div>
          </div>
          <div style={{ flexGrow: 1 }}></div>
        </div>
      </div>
    </main>
  );

  const twetchPost = async (text, replyTx) => {
    const action = "twetch/post@0.0.1";
    let abi;
    if (!localStorage.tokenTwetchAuth) {
      alert("Please login!");
      return;
    }
    //Construct Twetch ABI
    if (localStorage.abi) {
      abi = new BSVABI(JSON.parse(localStorage.getItem("abi")), { action });
    } else {
      abi = await getABI();
      localStorage.setItem("abi", JSON.stringify(abi));
    }

    let content = text;
    let hash = window.location.hash;
    if (!hash) {
      hash = "$zeroschool";
    }
    //content += ` ${hash}`;

    let obj = {
      bContent: content,
      mapReply: replyTx
    };

    abi.fromObject(obj);

    let payees = await getPayees({ args: abi.toArray(), action });
    await abi.replace({ "#{invoice}": () => payees.invoice });

    let arg = abi.action.args.find((e) => e.type === "Signature");
    const ab = abi
      .toArray()
      .slice(arg.messageStartIndex || 0, arg.messageEndIndex + 1);
    const contentHash = await digestMessage(ab);

    if (localStorage.wallet === "handcash") {
      return;
      const account = handCashConnect.getAccountFromAuthToken(
        localStorage.token
      );

      const { publicKey, signature } = await account.profile.signData({
        value: contentHash,
        format: "utf-8"
      });
      console.log(publicKey);
      let myAddress = await window.bsv.PublicKey.fromHex(publicKey)
        .toAddress()
        .toString();
      console.log(myAddress);
      await abi.replace({ "#{myAddress}": () => myAddress });
      await abi.replace({ "#{mySignature}": () => signature });

      let outputScript = abi.args.toString("hex");
      outputScript = Buffer.from(outputScript).toString("hex");
      const paymentParameters = {
        appAction: "EggDao post",
        payments: payees.payees.map((p) => {
          return {
            destination: p.to,
            currencyCode: p.currency,
            sendAmount: p.amount
          };
        }),
        attachment: { format: "hex", value: outputScript }
      };
      return;
      //console.log(paymentParameters);
      let payment = await account.wallet
        .pay(paymentParameters)
        .catch((err) => console.log(err));
      if (payment) {
        console.log(payment);
        console.log(payment.rawTransactionHex);
        await publishRequest({
          signed_raw_tx: payment.rawTransactionHex,
          action: action,
          broadcast: true,
          invoice: payees.invoice,
          payParams: {
            tweetFromTwetch: false,
            hideTweetFromTwetchLink: false
          }
        });
      }
    } else if (localStorage.wallet === "moneybutton") {
      let outputScript = window.bsv.Script.buildSafeDataOut(
        abi.toArray()
      ).toASM();
      let outputs = [{ currency: "BSV", amount: 0, script: outputScript }];
      outputs = outputs.concat(payees.payees);
      console.log(outputs);
      let cryptoOperations = [
        { name: "myAddress", method: "address", key: "identity" },
        {
          name: "mySignature",
          method: "sign",
          data: contentHash,
          dataEncoding: "utf8",
          key: "identity",
          algorithm: "bitcoin-signed-message"
        }
      ];
      let getPermissionForCurrentUser = () => {
        return localStorage.token;
      };
      if (localStorage.isOneClick === "false") {
        window.moneyButton.render(document.getElementById("moneybutton-post"), {
          label: "Twetch it!",
          outputs,
          cryptoOperations,
          onPayment: async (payment) => {
            await publishRequest({
              signed_raw_tx: payment.rawtx,
              action: action,
              broadcast: true,
              invoice: payees.invoice,
              payParams: {
                tweetFromTwetch: false,
                hideTweetFromTwetchLink: false
              }
            })
              .then((res) => {
                console.log(res);
                setSuccess(true);
              })
              .err((e) => {
                console.log(e);
                setError(true);
              });
          },
          onError: (err) => console.log(err)
        });
      } else {
        const imb = new window.moneyButton.IMB({
          clientIdentifier: imbCli,
          permission: getPermissionForCurrentUser(),
          onNewPermissionGranted: (token) =>
            localStorage.setItem("token", token)
        });
        imb.swipe({
          outputs,
          cryptoOperations,
          onPayment: async (payment) => {
            await publishRequest({
              signed_raw_tx: payment.rawtx,
              action: action,
              broadcast: true,
              invoice: payees.invoice,
              payParams: {
                tweetFromTwetch: false,
                hideTweetFromTwetchLink: false
              }
            })
              .then((res) => {
                console.log(res);
                setSuccess(true);
              })
              .err((e) => {
                console.log(e);
                setError(true);
              });
          },
          onError: (err) => console.log(err)
        });
      }
    } else if (localStorage.wallet === "relayx") {
      return;
      let outputs = {
        currency: "BSV",
        amount: 0,
        signatures: ["TWETCH-AIP"],
        script: arrToScript(abi.args.slice(0, abi.args.length - 5))
      };
      outputs = outputs.concat(payees.payees);
      let res = await window.relayone.send({ outputs });
      if (res.txid) {
        await publishRequest({
          signed_raw_tx: res.rawTx,
          action: action,
          broadcast: true,
          invoice: payees.invoice,
          payParams: {
            tweetFromTwetch: false,
            hideTweetFromTwetchLink: false
          }
        });
      } else {
        console.log("Failed to broadcast");
      }
    }
    /* window.twetchPay
    .pay({
      //wallets: ["moneybutton", "relayx"],
      outputs: outputs,
      label: "Twetch it",
      moneybuttonProps: {
        cryptoOperations: cryptoOperations,
        onCryptoOperations: (cryptoOperations) => {
          console.log(cryptoOperations);
        }
      },
      relayxProps: {
        outputs: relayOutputs
      },
      onPayment: (payment) => {
        console.log({ payment });
        let paymail, pubkey;
        if (payment.walletResponse.senderPaymail) {
          paymail = payment.walletResponse.senderPaymail;
          pubkey = payment.walletResponse.signaturePubkey;
        } else {
          paymail = payment.walletResponse.paymail;
          pubkey = payment.walletResponse.identity;
        }
        console.log("Paymail: ", paymail);
        console.log("Public (Identity) key: ", pubkey);
        console.log("txid: ", payment.txid);
        console.log("rawTx: ", payment.rawtx);

        let params = {
          signed_raw_tx: payment.rawtx,
          action: action,
          broadcast: true,
          invoice: payees.invoice,
          payParams: {
            tweetFromTwetch: false,
            hideTweetFromTwetchLink: false
          }
        };

        publishRequest(params).then((res) => console.log(res));
      }
    })
    .then((res) => {
      console.log(res);
    }); */

    //await build(content, "twetch/post@0.0.1", replyTx);
    //let res = await send("twetch/post@0.0.1");
    //console.log(res);
  };

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setError(false);
  };

  return (
    <div>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid
          container
          direction="column"
          style={{ padding: "16px", borderBottom: "1px solid #f2f2f2" }}
        >
          <Grid item>
            <TextField
              placeholder={placeholder}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <Avatar src={localStorage.getItem("icon")} />
                  </InputAdornment>
                )
              }}
              style={{ width: "100%" }}
              multiline
              rows={3}
              value={content}
              onChange={(event) => handleChangeContent(event)}
            />
          </Grid>
          <Grid item>
            <div style={{ display: "flex" }}>
              <div style={{ flexGrow: 1 }}></div>
              <div
                style={{
                  top: "unset",
                  margin: "8px 0",
                  display: "inline-block",
                  position: "relative",
                  right: "0px",
                  width: "30px",
                  fontSize: "12px",
                  background: "#F2F2F2",
                  lineHeight: "20px",
                  borderRadius: "9px"
                }}
              >
                <Typography
                  style={{
                    color: getColor(),
                    padding: "0 4px",
                    fontSize: "12px",
                    textAlign: "center",
                    fontWeight: "bold",
                    lineHeight: "20px"
                  }}
                  variant="body1"
                >
                  {256 - content.length}
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid item>
            <Grid container style={{ width: "100%" }}>
              <div style={{ flexGrow: 1 }}></div>
              <div>
                <Button
                  style={{
                    height: "32px",
                    marginLeft: "16px",
                    marginTop: "10px",
                    textTransform: "none",
                    transition: "color .01s"
                  }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!content || content.length > 256}
                  onClick={handleSubmit}
                >
                  Post
                </Button>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={success}
        autoHideDuration={4200}
        onClose={handleCloseSuccess}
      >
        <Alert onClose={handleCloseSuccess} severity="info"></Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={4200} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error">
          Error
        </Alert>
      </Snackbar>
      <Drawer
        style={{
          position: "fixed",
          inset: "0px"
        }}
        anchor="bottom"
        container={container}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
        onClose={handleDrawerToggle}
        open={open}
        variant="temporary"
      >
        {pay}
      </Drawer>
    </div>
  );
}
