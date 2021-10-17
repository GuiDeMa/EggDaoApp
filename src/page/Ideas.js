import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  CircularProgress,
  FormControl,
  Hidden,
  MenuItem,
  Select
} from "@mui/material";
import { use100vh } from "react-div-100vh";
import InfiniteScroll from "react-infinite-scroll-component";

import { FetchIdeas } from "../api/TwetchGraph";
import StickyButton from "../components/StickyButton";
import Composer from "../components/Composer";
import AppBar from "../components/AppBar";
import LeftPane from "../components/LeftPane";
import RightPane from "../components/RightPane";
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

export default function Ideas(props) {
  const filter = "#ideas";
  //console.log(filter);
  const [orderBy, setOrderBy] = useState(indexToOrder[0]);
  //const [filter, setFilter] = useState(props.filter);
  const [postList, setPostList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [boosts, setBoosts] = useState([]);
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
  }, [orderBy, filter]);

  const fetchMore = () => {
    FetchIdeas(filter, orderBy, offset).then((res) => {
      //console.log(res);
      setTotalCount(res.allPosts.totalCount);
      let data = res.allPosts.edges;
      setPostList(postList.concat(data));
      if (totalCount !== 0 && postList.length >= totalCount) {
        setHasMore(false);
      }

      setOffset(offset + 30);
    });
  };

  const handleChangeOrder = (event) => {
    setPostList([]);
    setTotalCount(0);
    setHasMore(true);
    setOrderBy(indexToOrder[event.target.value]);
    setOffset(0);
  };

  const getDiff = (tx) => {
    let diff = 0;
    let found = boosts.find((x) => x.tx === tx);
    if (found) {
      diff = found.diff;
    }
    return diff;
  };

  const scrollTop = (e) => {
    document.getElementById("scrollable").scrollTo(0, 0);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center"
      }}
    >
      <Hidden smDown>
        <LeftPane currentTab="Ideas" />
      </Hidden>
      <div
        style={{
          flex: 2,
          width: "100%",
          maxWidth: "600px"
        }}
      >
        <div></div>
        <div
          className="borders"
          style={{
            flex: 2,
            width: "100%",
            maxWidth: "600px"
          }}
        >
          <div style={{ cursor: "pointer" }} onClick={scrollTop}>
            <Hidden smUp>
              <AppBar currentTab="Ideas" />
            </Hidden>
            <Hidden xsDown>
              <div
                style={{
                  height: "81px",
                  position: "sticky",
                  display: "flex",
                  justifyContent: "center",
                  padding: "16px",
                  borderBottom: "1px solid #F2F2F2"
                }}
              >
                <Button
                  style={{
                    color: "#2F2F2F",
                    margin: 0,
                    fontSize: "22px",
                    fontWeight: "bold",
                    textDecoration: "none",
                    textTransform: "none"
                  }}
                  onClick={() => history.push("/methods")}
                >
                  Ideas
                </Button>
              </div>
            </Hidden>
            <FormControl
              style={{
                width: "100%",
                borderBottom: "1px solid #F2F2F2"
              }}
            >
              <Select
                variant="standard"
                style={{ paddingLeft: "16px" }}
                disableUnderline
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
              <Hidden xsDown>
                <Composer hash="#ideas" />
                <div
                  style={{
                    width: "100%",
                    height: "8px",
                    backgroundColor: "#F2F2F2"
                  }}
                />
              </Hidden>
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
                  return (
                    <Post
                      {...post}
                      boostDiff={getDiff(post.node.transaction)}
                      key={post.node.transaction}
                      tx={post.node.transaction}
                    />
                  );
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
      >
        <Hidden smUp>
          <StickyButton hash="#ideas" />
        </Hidden>
      </div>
    </div>
  );
}
