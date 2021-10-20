import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { use100vh } from "react-div-100vh";
import { FetchPostDetail } from "../api/TwetchGraph";
import LeftPane from "../components/LeftPane";
import RightPane from "../components/RightPane";
import AppBar from "../components/AppBar";
import Post from "../components/Post";
import Composer from "../components/Composer";

export default function Compose(props) {
  const txId = props.match.params.id;
  const [postData, setPostData] = useState([]);
  //const [boosts, setBoosts] = useState([]);
  const theme = useTheme();
  const history = useHistory();
  const height = use100vh();
  const containerHeight = height ? height : "100vh";

  useEffect(() => {
    if (txId) {
      FetchPostDetail(txId).then((data) => {
        //console.log(data);
        setPostData(data.allPosts.edges);
      });
    }
    //getBoosts().then((res) => setBoosts(res));
  }, [txId]);

  /* const getDiff = (tx) => {
    let diff = 0;
    let found = boosts.find((x) => x.tx === tx);
    if (found) {
      diff = found.diff;
    }
    return diff;
  }; */

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
      {smDown ? null : <LeftPane />}
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
            {smUp ? null : <AppBar />}
            {smDown ? null : (
              <div
                style={{
                  height: "81px",
                  position: "sticky",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px",
                  borderBottom: `1px solid ${theme.palette.divider}`
                }}
              >
                <IconButton onClick={() => history.goBack()}>
                  <KeyboardBackspaceIcon color="primary" />
                </IconButton>
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
                    {postData[0]
                      ? `In reply to ${postData[0].node.userByUserId.name}`
                      : "New Post"}
                  </Typography>
                </Button>
                <div></div>
              </div>
            )}
          </div>
          <div
            style={{
              position: "relative",
              height: `calc(${containerHeight}px - 81px)`,
              overflowY: "auto"
            }}
          >
            {txId &&
              postData.map((data) => <Post {...data} key={txId} tx={txId} />)}
            <Composer />
          </div>
        </div>
      </div>
      {mdDown ? null : <RightPane />}
      <div
        style={{
          width: "100%",
          bottom: 0,
          zIndex: 1002,
          position: "fixed"
        }}
      ></div>
    </div>
  );
}
