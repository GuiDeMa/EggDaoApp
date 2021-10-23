import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  Typography
} from "@mui/material";
import { use100vh } from "react-div-100vh";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTheme, useMediaQuery } from "@mui/material";
import { FetchJobs } from "../api/TwetchGraph";
import Composer from "../components/Composer";
import AppBar from "../components/AppBar";
import LeftPane from "../components/LeftPane";
import RightPane from "../components/RightPane";
import Post from "../components/Post";
import BranchedPost from "../components/BranchedPost";
import QuotedPost from "../components/QuotedPost";
import StickyButton from "../components/StickyButton";

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

export default function Projects(props) {
  const ticker = "$EGG";
  //console.log(filter);
  const [orderBy, setOrderBy] = useState(indexToOrder[0]);
  //const [filter, setFilter] = useState(props.filter);
  const [postList, setPostList] = useState([]);
  const [offset, setOffset] = useState(0);
  //const [boosts, setBoosts] = useState([]);
  const theme = useTheme();
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const height = use100vh();
  const containerHeight = height ? height : "100vh";

  useEffect(() => {
    setLoading(true);
    fetchMore();
    setLoading(false);
    //getBoosts().then((res) => setBoosts(res));
  }, [orderBy]);

  const fetchMore = () => {
    FetchJobs(ticker, orderBy, offset).then((res) => {
      //console.log(res);
      setTotalCount(res.allPosts.totalCount);
      //console.log("total:", totalCount);
      let data = res.allPosts.edges;
      setPostList(postList.concat(data));
      //console.log("postList:", postList.length);
      setOffset(offset + 30);
      if (totalCount !== 0 && postList.length >= totalCount) {
        //console.log("here");
        setHasMore(false);
      }
    });
    //console.log("hasMore:", hasMore);
  };

  const handleChangeOrder = (event) => {
    setPostList([]);
    setTotalCount(0);
    setHasMore(true);
    setOrderBy(indexToOrder[event.target.value]);
    setOffset(0);
  };

  /* const getDiff = (tx) => {
    let diff = 0;
    let found = boosts.find((x) => x.tx === tx);
    if (found) {
      diff = found.diff;
    }
    return diff;
  }; */

  const scrollTop = (e) => {
    document.getElementById("scrollable").scrollTo(0, 0);
  };
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
      {smDown ? null : <LeftPane currentTab="Jobs" />}
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
          <div style={{ cursor: "pointer" }} onClick={scrollTop}>
            {smUp ? null : <AppBar currentTab="Jobs" />}
            {!smUp ? null : (
              <div
                style={{
                  height: "81px",
                  position: "sticky",
                  display: "flex",
                  justifyContent: "center",
                  padding: "16px",
                  borderBottom: `1px solid ${theme.palette.divider}`
                }}
              >
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
                    Jobs
                  </Typography>
                </Button>
              </div>
            )}
            <FormControl
              style={{
                width: "100%"
              }}
            >
              <Select
                variant="standard"
                style={{ paddingLeft: "16px" }}
                value={OrderToIndex[orderBy]}
                onChange={handleChangeOrder}
              >
                <MenuItem value={0}>Latest</MenuItem>
                <MenuItem value={10}>Oldest</MenuItem>
                <MenuItem value={20}>Economy</MenuItem>
              </Select>
            </FormControl>
          </div>

          {!loading ? (
            <div
              id="scrollable"
              style={{
                position: "relative",
                height: `calc(${containerHeight}px - 114px)`,
                overflowY: "auto"
              }}
            >
              {!smUp ? null : (
                <div>
                  <Composer />
                  <div
                    style={{
                      width: "100%",
                      height: "8px",
                      backgroundColor: theme.palette.divider
                    }}
                  />
                </div>
              )}
              <InfiniteScroll
                dataLength={postList.length}
                next={fetchMore}
                hasMore={hasMore}
                scrollableTarget="scrollable"
                loader={
                  <div
                    style={{
                      display: "flex",
                      marginTop: "16px",
                      justifyContent: "center",
                      overflow: "hidden"
                    }}
                  >
                    <CircularProgress />
                  </div>
                }
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>Yay, you've seen it all!</b>
                  </p>
                }
              >
                {postList.map((post) => {
                  if (post.node.type === "branch") {
                    return (
                      <BranchedPost
                        {...post}
                        key={post.node.id}
                        tx={post.node.transaction}
                      />
                    );
                  } else if (post.node.type === "quote") {
                    return (
                      <QuotedPost
                        {...post}
                        key={post.node.id}
                        tx={post.node.transaction}
                      />
                    );
                  } else {
                    //post
                    return (
                      <Post
                        {...post}
                        key={post.node.id}
                        tx={post.node.transaction}
                      />
                    );
                  }
                })}
              </InfiniteScroll>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                marginTop: "16px",
                justifyContent: "center",
                overflow: "hidden"
              }}
            >
              <CircularProgress />
            </div>
          )}
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
      >
        {smUp ? null : <StickyButton />}
      </div>
    </div>
  );
}
