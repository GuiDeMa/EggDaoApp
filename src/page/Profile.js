import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Button,
  CircularProgress,
  FormControl,
  Hidden,
  MenuItem,
  Select
} from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import { use100vh } from "react-div-100vh";
import { FetchUserData, FetchUserPosts } from "../api/TwetchGraph";
import StickyButton from "../components/StickyButton";
import LeftPane from "../components/LeftPane";
import RightPane from "../components/RightPane";
import Post from "../components/Post";
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
  const userId = props.match.params.id;
  const [offset, setOffset] = useState(0);
  const [userData, setUserData] = useState({});
  const [postList, setPostList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [boosts, setBoosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
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
    setLoading(true);
    FetchUserData(userId).then((data) => {
      setUserData(data.userById);
      setLoading(false);
    });
    fetchMore();
    //getBoosts().then((res) => setBoosts(res));
  }, [orderBy, userId]);

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
        flexDirection: "row",
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
        <div></div>
        <div
          className="borders"
          style={{
            flex: 2,
            width: "100%",
            maxWidth: "600px"
          }}
        >
          {" "}
          <div style={{ cursor: "pointer" }} onClick={scrollTop}>
            <Hidden smUp>
              <AppBar />
            </Hidden>
            <Hidden xsDown>
              <div
                style={{
                  height: "81px",
                  position: "sticky",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "16px",
                  borderBottom: "1px solid #F2F2F2"
                }}
              >
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
                  {userData.name && `${userData.name}'s`} Profile
                </div>
                <div></div>
              </div>
            </Hidden>
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
                    color: "#000000",
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
                <a href={userData.profileUrl} target="_blank" rel="noreferrer">
                  {userData.profileUrl}
                </a>
              </div>
              <FormControl
                style={{
                  width: "100%",
                  background: "#fafafa",
                  borderBottom: "1px solid #F2F2F2",
                  top: "0px",
                  position: "sticky",
                  zIndex: 1002
                }}
              >
                <Select
                  style={{ marginLeft: "16px" }}
                  variant="standard"
                  disableUnderline
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
                {postList.map((post) => (
                  <Post
                    {...post}
                    boostDiff={getDiff(post.node.transaction)}
                    key={post.node.transaction}
                    tx={post.node.transaction}
                  />
                ))}
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
          <StickyButton />
        </Hidden>
      </div>
    </div>
  );
}
