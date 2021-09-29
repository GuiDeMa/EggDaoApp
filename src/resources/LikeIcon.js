import {
  Button,
  Drawer,
  SvgIcon,
  IconButton,
  Typography
} from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { useState, useEffect } from "react";

const Twetch = require("@twetch/sdk");

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#E81212"
    },
    secondary: {
      main: "#b17c01"
    }
  }
});

export default function LikeIcon(props) {
  const window1 = props.window;
  const twetch = new Twetch({
    clientIdentifier: "10d3b9a3-3733-4769-9f97-d255ee37113b"
  });
  const container =
    window1 !== undefined ? () => window().document.body : undefined;
  const txId = props.tx;
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(props.count);
  const [likedCalc, setLikedCalc] = useState(props.likedCalc);

  useEffect(() => {
    const pKey = twetch.crypto.privFromMnemonic(localStorage.mnemonic);
    twetch.wallet.restore(pKey);
  });

  const handleClick = (e) => {
    e.stopPropagation();

    if (!localStorage.tokenTwetchAuth) {
      alert("Please Log in"); //Snackbar
      return;
    }
    if (localStorage.isOneClick === "true") {
      likePost(txId);
    } else {
      setOpen(true);
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
              id="button"
              style={{
                marginBottom: "16px"
              }}
            >
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
                  $0.05
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
                  0.00039463 BSV
                </Typography>
                <div style={{ display: "flex" }}>
                  <div style={{ flexGrow: 1 }} />
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
                    color="secondary"
                    variant="contained"
                    onClick={() => {
                      likePost(txId);
                    }}
                  >
                    Like It!
                  </Button>
                  <div style={{ flexGrow: 1 }} />
                </div>
              </div>
            </div>
            <div style={{ height: "10vh" }}></div>
          </div>
          <div style={{ flexGrow: 1 }}></div>
        </div>
      </div>
    </main>
  );

  async function likePost(txid) {
    twetch
      .publish("twetch/like@0.0.1", { postTransaction: txid })
      .then((res) => {
        setCount(parseInt(count) + 1);
        setLikedCalc(parseInt(likedCalc) + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <IconButton
          onClick={handleClick}
          className="hoverRed"
          color="primary"
          disabled={likedCalc > 0}
        >
          <SvgIcon
            className="hoverRed"
            style={{
              color: likedCalc < 1 ? "#696969" : "#E81212",
              width: "18px",
              cursor: "pointer",
              height: "18px",
              display: "inline-block",
              verticalAlign: "top"
            }}
            focusable="false"
            viewBox="0 0 20 17"
            aria-hidden="true"
          >
            <path
              fillRule={likedCalc < 1 ? "evenodd" : ""}
              clipRule={likedCalc < 1 ? "evenodd" : ""}
              d="M9.74127 14.9568C10.2839 14.5155 10.8198 14.0888 11.3019 13.705C11.4398 13.5952 11.5733 13.4889 11.7013 13.3868C11.8247 13.2871 11.9464 13.1889 12.0664 13.0921C13.8956 11.6157 15.3393 10.4505 16.3311 9.32802L16.3332 9.32571C17.4653 8.04931 17.8517 7.02288 17.8517 5.96972C17.8517 4.87264 17.4572 3.90333 16.7871 3.22975C16.0717 2.51231 15.1214 2.1085 14.0341 2.1085C13.2416 2.1085 12.5576 2.32726 11.947 2.77483C11.5879 3.04065 11.2894 3.32411 11.0307 3.66337L9.74083 5.35475L8.45095 3.66337C8.19487 3.32758 7.89988 3.04646 7.54567 2.783C6.90926 2.3355 6.21443 2.1085 5.44757 2.1085C4.34828 2.1085 3.38518 2.51997 2.70738 3.21675L2.70102 3.22329L2.6946 3.22975C2.02212 3.90568 1.62998 4.85339 1.62998 5.96972C1.62998 7.00293 2.01879 8.05209 3.14847 9.32571L3.15052 9.32802C4.14236 10.4505 5.58606 11.6157 7.4153 13.0921C7.53176 13.1861 7.64979 13.2813 7.76936 13.3779C8.38869 13.8549 9.06068 14.3999 9.74127 14.9568ZM6.76482 14.6518C7.44784 15.1772 8.20404 15.7941 8.98463 16.4339C9.20417 16.6166 9.4725 16.708 9.74083 16.708C10.0092 16.708 10.2775 16.6166 10.497 16.4339C11.1215 15.9221 11.746 15.4249 12.3081 14.9774C12.4486 14.8656 12.5851 14.7568 12.7168 14.6518C12.8569 14.5386 12.9957 14.4267 13.1331 14.3158C14.9106 12.8819 16.4599 11.6322 17.5468 10.4021C18.864 8.91704 19.4739 7.52335 19.4739 5.96972C19.4739 4.48463 18.9372 3.09094 17.9371 2.08565C16.9125 1.05751 15.5465 0.486328 14.0341 0.486328C12.912 0.486328 11.8875 0.806192 10.9849 1.46877C10.9569 1.48947 10.9291 1.51034 10.9015 1.53138C10.4715 1.85874 10.0846 2.22887 9.74083 2.67968C9.39703 2.22887 9.01016 1.85874 8.58021 1.53138C8.55257 1.51034 8.52476 1.48947 8.49676 1.46877C7.5942 0.82904 6.56967 0.486328 5.44757 0.486328C3.93517 0.486328 2.54474 1.05751 1.5446 2.08565C0.54447 3.09094 0.0078125 4.46179 0.0078125 5.96972C0.0078125 7.5005 0.617651 8.91704 1.9349 10.4021C3.02177 11.6322 4.57104 12.8819 6.3486 14.3158C6.48601 14.4267 6.62479 14.5386 6.76482 14.6518Z"
              style={{
                stroke: likedCalc > 0 ? "#E81212" : "#696969",
                color: likedCalc > 0 && "E81212",
                strokeMiterlimit: 10,
                strokeWidth: "0px"
              }}
            ></path>
          </SvgIcon>
        </IconButton>
        <Typography
          className="hoverRed"
          color={likedCalc > 0 ? "primary" : "inherit"}
          component="span"
          variant="body1"
        >
          {count}
        </Typography>
      </div>
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
    </ThemeProvider>
  );
}
