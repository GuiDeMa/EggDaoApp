import React from "react";
import { useHistory, Link } from "react-router-dom";
import { Avatar, Grid, IconButton, Typography, useTheme } from "@mui/material";
import LikeIcon from "../resources/LikeIcon";
import ReplyIcon from "../resources/ReplyIcon";
import BoostIcon from "../resources/BoostIcon";
import CopyIcon from "../resources/CopyIcon";
import TwetchLogo from "../resources/TwetchLogo";
import Timestamp from "../utils/Timestamp";
import defaultAvatar from "../resources/eggApu.png";

export default function Post(props) {
  const postTx = props.tx;
  const postData = props.node;
  const diff = props.boostDiff;
  const theme = useTheme();
  const history = useHistory();
  const timestamp = new Timestamp(postData.createdAt);

  const getDetail = (e) => {
    e.stopPropagation();
    history.push(`/t/${postTx}`);
  };
  if (postData.userByUserId) {
    return (
      <Grid item xs={12} onClick={getDetail}>
        <div
          style={{
            cursor: "pointer",
            display: "block",
            padding: "16px",
            position: "relative",
            borderBottom: `1px solid ${theme.palette.divider}`,
            textDecoration: "none"
          }}
          id={`post-${postData.transaction}`}
        >
          <div style={{ position: "relative" }}>
            <div
              style={{
                top: 0,
                color: "#696969",
                right: 0,
                cursor: "pointer",
                height: "24px",
                position: "absolute",
                fontSize: "12px",
                lineHeight: "16px",
                verticalAlign: "top"
              }}
            >
              <Typography
                style={{
                  color: "#696969",
                  cursor: "pointer",
                  display: "inline-block",
                  fontSize: "12px",
                  lineHeight: "16px",
                  whiteSpace: "nowrap",
                  marginRight: "8px",
                  verticalAlign: "top"
                }}
                variant="body1"
              >
                {timestamp.getPostTimestamp(new Date())}
              </Typography>
              <div
                style={{
                  display: "inline-block",
                  marginTop: "-16px",
                  marginRight: "-12px",
                  verticalAlign: "top"
                }}
              >
                <IconButton tabIndex={0} type="button">
                  <a
                    href={`https://twetch.app/t/${postTx}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <TwetchLogo />
                  </a>
                </IconButton>
              </div>
            </div>

            <Link
              style={{
                display: "inline-block",
                position: "relative",
                marginRight: "12px",
                verticalAlign: "top"
              }}
              to={`/u/${postData.userId}`}
              onClick={(e) => e.stopPropagation()}
            >
              <Avatar src={postData.userByUserId.icon} />
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
                <Typography
                  variant="body1"
                  sx={{
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
                  <Link
                    to={`/u/${postData.userId}`}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      color: theme.palette.text.primary,
                      textDecoration: "none"
                    }}
                  >
                    {postData.userByUserId.name}
                  </Link>
                </Typography>

                <Typography
                  variant="body1"
                  style={{
                    color: "#828282",
                    display: "inline-block",
                    verticalAlign: "top"
                  }}
                >{`@${postData.userId}`}</Typography>
              </div>
              <div style={{ position: "relative" }}>
                <Typography
                  variant="body1"
                  style={{
                    fontSize: "1rem",
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                    fontWeight: 400,
                    lineHeight: 1.5,
                    letterSpacing: "0.00938em",
                    wordWrap: "break-word"
                  }}
                >
                  {postData.bContent}
                </Typography>
              </div>
              <div></div>
            </div>
            <Grid
              container
              wrap="nowrap"
              style={{
                marginTop: "8px",
                justifyContent: "space-around"
              }}
            >
              <Grid item className="Like">
                <LikeIcon
                  tx={postData.transaction}
                  likedCalc={postData.youLikedCalc}
                  count={postData.numLikes}
                />
              </Grid>
              <Grid item className="Reply">
                <ReplyIcon
                  tx={postData.transaction}
                  count={postData.postsByReplyPostId.totalCount}
                />
              </Grid>
              <Grid item className="Boost">
                <BoostIcon tx={postData.transaction} count={diff} />
              </Grid>
              <Grid item className="Copy">
                <CopyIcon tx={postData.transaction} />
              </Grid>
            </Grid>
          </div>
        </div>
      </Grid>
    );
  } else {
    return null;
  }
}
