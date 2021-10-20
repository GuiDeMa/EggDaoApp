import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Button,
  CircularProgress,
  FormControl,
  Hidden,
  MenuItem,
  Select,
  useMediaQuery,
  useTheme,
  Typography
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { use100vh } from "react-div-100vh";
import { FetchUserData, FetchUserPosts } from "../api/TwetchGraph";
import StickyButton from "../components/StickyButton";
import LeftPane from "../components/LeftPane";
import RightPane from "../components/RightPane";
import Post from "../components/Post";
import BranchedPost from "../components/BranchedPost";
import QuotedPost from "../components/QuotedPost";
import AppBar from "../components/AppBar";

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

export default function Profile(props) {
  const [orderBy, setOrderBy] = useState(indexToOrder[0]);
  const [userId, setUserId] = useState(props.match.params.id);
  const [offset, setOffset] = useState(0);
  const [userData, setUserData] = useState({});
  const [postList, setPostList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [boosts, setBoosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const theme = useTheme();
  const history = useHistory();
  const height = use100vh();
  const containerHeight = height ? height : "100vh";
  const fetchMore = async () => {
    FetchUserPosts(userId, orderBy, offset).then((res) => {
      setTotalCount(res.allPosts.totalCount);
      setPostList(postList.concat(res.allPosts.edges));
      if (totalCount !== 0 && postList.length >= totalCount) {
        setHasMore(false);
      }
      setOffset(offset + 30);
    });
  };

  useEffect(() => {
    setUserData({});
    setPostList([]);
    setTotalCount(0);
    setHasMore(true);
    setOrderBy(indexToOrder[0]);
    setOffset(0);
    setUserId(props.match.params.id);
  }, [props.match.params.id]);

  useEffect(() => {
    FetchUserData(userId).then((data) => {
      setUserData(data.userById);
    });
    //getBoosts().then((res) => setBoosts(res));
  }, [userId]);

  useEffect(() => {
    setLoading(true);
    FetchUserPosts(userId, orderBy, offset).then((res) => {
      setTotalCount(res.allPosts.totalCount);
      setPostList(postList.concat(res.allPosts.edges));
      setLoading(false);
      if (totalCount !== 0 && postList.length >= totalCount) {
        setHasMore(false);
      }
      setOffset(offset + 30);
    });
  }, [userId, orderBy]);

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
            {smUp ? null : <AppBar />}
            {smDown ? null : (
              <div
                style={{
                  height: "81px",
                  position: "sticky",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
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
                    {userData.name && `${userData.name}'s`} Profile
                  </Typography>
                </Button>
                <div></div>
              </div>
            )}
          </div>
          {!loading ? (
            <div
              id="scrollable"
              style={{
                position: "relative",
                height: `calc(${containerHeight}px - 84px)`,
                overflowY: "scroll"
              }}
            >
              <div
                style={{
                  padding: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <Avatar
                  src={userData.icon}
                  style={{ height: "64px", width: "64px" }}
                />
              </div>
              <div
                style={{
                  width: `calc(${containerHeight} - 58px)`,
                  display: "inline-block",
                  verticalAlign: "top",
                  paddingLeft: "16px"
                }}
              >
                <div
                  style={{
                    color: theme.palette.text.primary,
                    display: "inline-block",
                    overflow: "hidden",
                    fontSize: "16px",
                    fontWeight: "bold",
                    lineHeight: "24px",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    verticalAlign: "top",
                    textDecoration: "none"
                  }}
                >
                  {userData.name}
                </div>
                <div
                  style={{
                    color: "#828282",
                    fontSize: "16px",
                    display: "inline-block",
                    verticalAlign: "top",
                    marginLeft: "4px"
                  }}
                >{`@${userData.id}`}</div>
                <div>{userData.description}</div>
                <a
                  className="Links"
                  href={userData.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span style={{ color: theme.palette.primary.main }}>
                    {userData.profileUrl}
                  </span>
                </a>
              </div>
              <FormControl
                sx={{
                  width: "100%",
                  top: "0px",
                  position: "sticky",
                  zIndex: 1002
                }}
              >
                <Select
                  style={{ paddingLeft: "16px" }}
                  variant="standard"
                  value={OrderToIndex[orderBy]}
                  onChange={handleChangeOrder}
                >
                  <MenuItem value={0}>Latest</MenuItem>
                  <MenuItem value={10}>Oldest</MenuItem>
                  <MenuItem value={20}>Economy</MenuItem>
                </Select>
              </FormControl>
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
                height: `calc(${containerHeight}px - 84px)`,
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
