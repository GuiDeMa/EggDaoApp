import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  CircularProgress,
  FormControl,
  Button,
  IconButton,
  MenuItem,
  Select,
  useMediaQuery,
  useTheme,
  Typography
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { use100vh } from "react-div-100vh";
import { FetchPostDetail, FetchPostReplies } from "../api/TwetchGraph";
import LeftPane from "../components/LeftPane";
import RightPane from "../components/RightPane";
import AppBar from "../components/AppBar";
import Post from "../components/Post";

const indexToOrder = {
  0: "CREATED_AT_DESC",
  10: "CREATED_AT_ASC",
  20: "RANKING_DESC"
};

const OrderToIndex = {
  CREATED_AT_DESC: 0,
  CREATED_AT_ASC: 10,
  RANKING_DESC: 20
};

export default function Detail(props) {
  const [txId, setTxId] = useState(props.match.params.id);
  const [postData, setPostData] = useState([]);
  const [orderRepliesBy, setOrderRepliesBy] = useState(indexToOrder[0]);
  const [children, setChildren] = useState([]);
  const [parents, setParents] = useState([]);
  const [boosts, setBoosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const history = useHistory();
  const height = use100vh();
  const containerHeight = height ? height : "100vh";

  useEffect(() => {
    setPostData([]),
      setOrderRepliesBy(indexToOrder[0]),
      setChildren([]),
      setParents([]);
    setTxId(props.match.params.id);
  }, [props.match.params.id]);

  useEffect(() => {
    setLoading(true);
    FetchPostDetail(txId).then((data) => {
      setPostData(data.allPosts.edges);
      FetchPostReplies(txId, orderRepliesBy).then((data) => {
        setChildren(data.allPosts.nodes[0].children.edges);
        setParents(data.allPosts.nodes[0].parents.edges);
        setLoading(false);
      });
    });
    //getBoosts().then((res) => setBoosts(res));
  }, [txId, orderRepliesBy]);

  const handleChangeOrder = (event) => {
    setChildren([]);
    setOrderRepliesBy(indexToOrder[event.target.value]);
  };

  const getDiff = (tx) => {
    let diff = 0;
    let found = boosts.find((x) => x.tx === tx);
    if (found) {
      diff = found.diff;
    }
    return diff;
  };

  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        {smDown ? null : <LeftPane />}
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
                  borderBottom: "1px solid #F2F2F2"
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
                    Post Detail
                  </Typography>
                </Button>
                <div></div>
              </div>
            )}
          </div>
          <div
            style={{
              position: "relative",
              height: `calc(${containerHeight}px - 84px)`,
              overflowY: "auto"
            }}
          >
            {parents.map((parent) => (
              <Post
                {...parent}
                boostDiff={0}
                key={parent.node.transaction}
                tx={parent.node.transaction}
              />
            ))}
            {postData.map((data) => (
              <Post {...data} boostDiff={getDiff(txId)} key={txId} tx={txId} />
            ))}
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "16px"
                }}
              >
                <CircularProgress />
              </div>
            ) : (
              <div>
                {children.length > 1 && (
                  <FormControl
                    style={{
                      width: "100%"
                    }}
                  >
                    <Select
                      variant="standard"
                      style={{ paddingLeft: "16px" }}
                      value={OrderToIndex[orderRepliesBy]}
                      onChange={handleChangeOrder}
                    >
                      <MenuItem value={0}>Latest</MenuItem>
                      <MenuItem value={10}>Oldest</MenuItem>
                      <MenuItem value={20}>Economy</MenuItem>
                    </Select>
                  </FormControl>
                )}
                {children.map((child) => (
                  <Post
                    {...child}
                    boostDiff={0}
                    key={child.node.transaction}
                    tx={child.node.transaction}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        {mdDown ? null : <RightPane />}
      </div>
      <div></div>
    </div>
  );
}
