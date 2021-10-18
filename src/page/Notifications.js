import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  CircularProgress,
  Hidden,
  useMediaQuery,
  useTheme,
  Typography
} from "@mui/material";
import { use100vh } from "react-div-100vh";
import InfiniteScroll from "react-infinite-scroll-component";

import { FetchNotifications } from "../api/TwetchGraph";
import AppBar from "../components/AppBar";
import LeftPane from "../components/LeftPane";
import RightPane from "../components/RightPane";
import NotifDetail from "../components/NotifDetail";

export default function Notifications(props) {
  //const filter = "";
  //console.log(filter);
  //const [filter, setFilter] = useState(props.filter);
  const [notificationList, setNotificationList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const history = useHistory();
  const height = use100vh();
  const containerHeight = height ? height : "100vh";

  useEffect(() => {
    setLoading(true);
    if (localStorage.tokenTwetchAuth) {
      fetchMore();
    }

    setLoading(false);
    //getBoosts().then((res) => setBoosts(res));
  });

  const fetchMore = () => {
    FetchNotifications(offset).then((res) => {
      //console.log(res);
      setTotalCount(res.me.notificationsByUserId.totalCount);
      //console.log("total:", totalCount);
      let data = res.me.notificationsByUserId.nodes;
      setNotificationList(notificationList.concat(data));
      //console.log("postList:", postList.length);
      setOffset(offset + 30);
      if (totalCount !== 0 && notificationList.length >= totalCount) {
        //console.log("here");
        setHasMore(false);
      }
    });
    //console.log("hasMore:", hasMore);
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
      {smDown ? null : <LeftPane currentTab="Notifications" />}
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
            {smUp ? null : <AppBar currentTab="Notifications" />}
            {smDown ? null : (
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
                    Notifications
                  </Typography>
                </Button>
              </div>
            )}
          </div>

          {!loading ? (
            <div
              id="scrollable"
              style={{
                position: "relative",
                height: `calc(${containerHeight}px - 84px)`,
                overflowY: "auto"
              }}
            >
              <InfiniteScroll
                dataLength={notificationList.length}
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
                {notificationList.map((notif, index) => {
                  return <NotifDetail {...notif} key={index} id={notif.id} />;
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
    </div>
  );
}
