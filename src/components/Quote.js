import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  Avatar,
  Grid,
  IconButton,
  Paper,
  Typography,
  useTheme
} from "@mui/material";
import LikeIcon from "../resources/LikeIcon";
import ReplyIcon from "../resources/ReplyIcon";
import BoostIcon from "../resources/BoostIcon";
import CopyIcon from "../resources/CopyIcon";
import TwetchLogo from "../resources/TwetchLogo";
import Timestamp from "../utils/Timestamp";
import defaultAvatar from "../resources/eggie.jpg";
import BranchIcon from "../resources/BranchIcon";
//import MediaGrid from "./MediaGrid";
import PostDescription from "./PostDescription";

export default function Quote(props) {
  const postTx = props.tx;
  const branchedById = props.branchedById;
  const branchedByName = props.branchedByName;
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
      <Paper
        elevation={9}
        style={{
          boxShadow: "none",
          marginTop: "8px",
          border: `1px solid ${theme.palette.divider}`,
          cursor: "pointer",
          position: "relative",
          borderRadius: "6px"
        }}
        onClick={getDetail}
      >
        <Paper
          elevation={21}
          style={{
            boxShadow: "none",
            display: "flex",
            padding: "8px",
            borderRadius: "4px 4px 0 0"
          }}
        >
          <Link to={postData.userId} onClick={(e) => e.stopPropagation()}>
            <Avatar
              src={defaultAvatar}
              style={{
                width: "24px",
                height: "24px",
                marginRight: "8px"
              }}
            />
          </Link>
          <div style={{ flexGrow: 1, width: "100%", display: "inline-block" }}>
            <Link
              className="Links"
              to={`/u/${postData.userId}`}
              onClick={(e) => e.stopPropagation()}
              style={{
                color: theme.palette.text.primary,
                textDecoration: "none"
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
                Eggie
              </Typography>
            </Link>
            <Typography
              variant="body1"
              style={{
                color: "#828282",
                display: "inline-block",
                fontSize: "16px",
                fontWeight: "normal",
                lineHeight: "24px",
                marginLeft: "3px",
                verticalAlign: "top"
              }}
            >
              #{postData.userId}
            </Typography>
          </div>
          <div
            style={{
              color: "#696969",
              float: "right",
              cursor: "pointer",
              fontSize: "12px",
              lineHeight: "16px",
              verticalAlign: "top"
            }}
          >
            {timestamp.getPostTimestamp(new Date())}
          </div>
        </Paper>
        <div style={{ padding: "8px" }}>
          <PostDescription post={postData} />
          <div>{/* <MediaGrid files={postData.files} /> */}</div>
        </div>
      </Paper>
    );
  } else {
    return null;
  }
}
