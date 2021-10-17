import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IconButton, Hidden } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
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
  const history = useHistory();

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

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center"
      }}
    >
      <Hidden smDown>
        <LeftPane />
      </Hidden>
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
            <Hidden smUp>
              <AppBar />
            </Hidden>
            <Hidden xsDown>
              <div
                style={{
                  height: "81px",
                  position: "sticky",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px",
                  borderBottom: "1px solid #F2F2F2"
                }}
              >
                <IconButton onClick={() => history.goBack()}>
                  <KeyboardBackspaceIcon color="primary" />
                </IconButton>
                <div
                  style={{
                    color: "#2F2F2F",
                    margin: 0,
                    fontSize: "22px",
                    fontWeight: "bold",
                    textDecoration: "none",
                    cursor: "pointer"
                  }}
                >
                  {postData[0]
                    ? `In reply to ${postData[0].node.userByUserId.name}`
                    : "New Post"}
                </div>
                <div></div>
              </div>
            </Hidden>
          </div>
          {txId &&
            postData.map((data) => <Post {...data} key={txId} tx={txId} />)}
          <Composer />
        </div>
      </div>
      <Hidden mdDown>
        <RightPane />
      </Hidden>
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
