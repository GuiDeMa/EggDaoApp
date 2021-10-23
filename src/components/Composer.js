import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Drawer,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Snackbar,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  useTheme,
  Paper
} from "@mui/material";
import { Alert } from "@mui/material";
import { Link, useHistory, useLocation } from "react-router-dom";
import { twquery } from "../api/TwetchGraph";

const Twetch = require("@twetch/sdk");

export default function Composer(props) {
  const window = props.window;
  const location = useLocation();
  let hash = "";
  if (location.hash) {
    hash = location.hash;
  } else if (props.hash) {
    hash = props.hash;
  }
  const history = useHistory();
  const theme = useTheme();
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const ticker = "$EGG";
  const replyTx = location.pathname.split("/")[2];
  const [type, setType] = useState("default");
  const [placeholder, setPlaceholder] = useState("What's the latest?");
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [replyCount, setReplyCount] = useState(0);
  const [error, setError] = useState(false);
  const twetch = new Twetch({
    clientIdentifier: "10d3b9a3-3733-4769-9f97-d255ee37113b"
  });
  const exchangeRate = twetch.Helpers.exchangeRate.price;
  const dolAmount = 0.02; //config
  const bitAmount = parseFloat(dolAmount / exchangeRate).toFixed(8);

  useEffect(() => {
    const pKey = twetch.crypto.privFromMnemonic(localStorage.mnemonic);
    twetch.wallet.restore(pKey);
    if (replyTx) {
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
  });

  const handleChangeType = (e) => {
    setType(e.target.value);
  };
  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localStorage.isOneClick === "false") {
      setOpen(true);
    } else {
      twetchPost(content, replyTx)
        .then((res) => {
          //console.log(res);
          setContent("");
          if (replyTx) {
            history.push(`/t/${replyTx}`);
          } else {
            history.push("/");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const getColor = () => {
    //console.log(256 - content.length);
    if (content.length >= 250) {
      return "#E81212";
    } else {
      if (251 - content.length < 21) {
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

  const handle1Click = (e) => {
    e.stopPropagation();
    twetchPost(content, replyTx)
      .then((res) => {
        //console.log(res)
        setOpen(false);
        setContent("");
        if (replyTx) {
          history.push(`/t/${replyTx}`);
        } else {
          history.push("/");
        }
      })
      .catch((e) => {
        console.log(e);
      });
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
          <Paper
            style={{
              width: "600px",
              maxWidth: "calc(100% - 24px)",
              borderRadius: "6px 6px 0 0"
            }}
          >
            <Paper elevation={3} style={{ padding: "16px", display: "flex" }}>
              <Typography
                style={{
                  margin: 0,
                  fontWeight: "bold",
                  fontSize: "22px",
                  textDecoration: "none"
                }}
              >
                Twetch
                <span
                  style={{
                    color: theme.palette.primary.main,
                    fontSize: "16px"
                  }}
                >
                  Pay
                </span>
              </Typography>
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
            </Paper>
            <div
              id="detail"
              style={{
                padding: "16px",
                borderTop: `2px solid ${theme.palette.divider}`
              }}
            >
              <div
                style={{
                  margin: "0 0 26px 0",
                  borderRadius: "6px"
                }}
              >
                <Paper
                  elevation={12}
                  style={{
                    display: "block",
                    margin: "21px",
                    padding: "21px",
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
                        className="Links"
                        to={`/u/${localStorage.id}`}
                        onClick={(e) => e.stopPropagation()}
                        style={{}}
                      >
                        <Typography
                          style={{
                            color: theme.palette.text.primary,
                            cursor: "pointer",
                            display: "inline-block",
                            overflow: "hidden",
                            fontSize: "16px",
                            maxWidth: "calc(100% - 64px)",
                            fontWeight: "bold",
                            lineHeight: "24px",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            verticalAlign: "top"
                          }}
                        >
                          {localStorage.name}
                        </Typography>
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
                </Paper>
              </div>
            </div>
            <div id="detail" style={{}}>
              <div
                style={{
                  margin: "0 0 26px 0",
                  borderRadius: "6px"
                }}
              >
                <Typography
                  style={{
                    color: theme.palette.text.primary,
                    margin: "0 auto",
                    fontSize: "36px",
                    textAlign: "center",
                    fontWeight: 600,
                    lineHeight: "44px"
                  }}
                  variant="h3"
                >
                  ${dolAmount}
                </Typography>
                <Typography
                  sx={{
                    color: theme.palette.text.secondary,
                    margin: "0 auto",
                    fontSize: "16px",
                    marginTop: "2px",
                    textAlign: "center",
                    lineHeight: "20px",
                    marginBottom: "18px"
                  }}
                  variant="h6"
                >
                  {bitAmount} BSV
                </Typography>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ flexGrow: 1 }} />
              <Button
                style={{
                  width: "257px",
                  padding: "14px",
                  fontSize: "16px",
                  fontWeight: 600,
                  lineWeight: "24px",
                  textTransform: "none"
                }}
                color="primary"
                variant="contained"
                onClick={handle1Click}
              >
                Twetch It!
              </Button>
              <div style={{ flexGrow: 1 }} />
            </div>
            <div style={{ height: "10vh" }} />
          </Paper>
          <div style={{ flexGrow: 1 }}></div>
        </div>
      </div>
    </main>
  );

  const twetchPost = async (text, replyTx) => {
    const payload = {
      bContent: text,
      mapReply: replyTx,
      mapComment: type !== "default" ? `${ticker} #${type}` : ticker
    };

    twetch
      .publish("twetch/post@0.0.1", payload)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
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
        <Grid container direction="column" style={{ padding: "16px" }}>
          <Grid item>
            <TextField
              placeholder={placeholder}
              InputProps={{
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
              <Paper
                elevation={24}
                style={{
                  top: "unset",
                  margin: "8px 0",
                  display: "inline-block",
                  position: "relative",
                  right: "0px",
                  width: "30px",
                  fontSize: "12px",
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
                  {250 - content.length}
                </Typography>
              </Paper>
            </div>
          </Grid>
          <Grid item>
            <Grid container style={{ width: "100%" }}>
              <div style={{ flexGrow: 1 }}></div>
              <Grid item xs={9}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Post Type</FormLabel>
                  <RadioGroup
                    row
                    aria-label="type"
                    name="row-radio-buttons-group"
                    value={type}
                    onChange={handleChangeType}
                  >
                    <FormControlLabel
                      value="default"
                      control={<Radio />}
                      label=""
                    />
                    <FormControlLabel
                      value="ideas"
                      control={<Radio />}
                      label="🥚"
                    />
                    <FormControlLabel
                      value="projects"
                      control={<Radio />}
                      label="🐣"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={3}>
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
              </Grid>
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
