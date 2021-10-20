import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  Avatar,
  Badge,
  Grid,
  IconButton,
  Typography,
  useTheme
} from "@mui/material";
import Timestamp from "../utils/Timestamp";
import defaultAvatar from "../resources/eggie.jpg";
import BranchBadge from "../resources/BranchBadge";
import LikeBadge from "../resources/LikeBadge";
import FollowBadge from "../resources/FollowBadge";
import ReplyBadge from "../resources/ReplyBadge";
import MentionBadge from "../resources/MentionBadge";
import PaymentBadge from "../resources/PaymentBadge";

const typeToBadge = {
  like: <LikeBadge />,
  reply: <ReplyBadge />,
  branch: <BranchBadge />,
  follower: <FollowBadge />,
  payment: <PaymentBadge />,
  mention: <MentionBadge />
};

export default function NotifDetail(props) {
  const history = useHistory();
  const theme = useTheme();
  const timestamp = new Timestamp(props.createdAt);

  const getDetail = (e) => {
    e.stopPropagation();
    //history.push(`/t/${postTx}`);
  };
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
        id={`notif-${props.id}`}
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
            <Typography
              style={{
                color: "#219653",
                fontSize: "14px",
                marginTop: "7px",
                fontWeight: 600,
                lineHeight: "20px",
                whiteSpace: "nowrap"
              }}
              variant="body1"
            >
              + ${Math.round(props.price * 1000) / 1000}
            </Typography>
          </div>

          <Link
            style={{
              display: "inline-block",
              position: "relative",
              marginRight: "12px",
              verticalAlign: "top"
            }}
            to={`/u/${props.actorUserId}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Badge
              overlap="circular"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
              }}
              badgeContent={typeToBadge[props.type]}
            >
              <Avatar src={defaultAvatar} />
            </Badge>
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
              <Link
                style={{ textDecoration: "none" }}
                to={`/u/${props.actorUserId}`}
                onClick={(e) => e.stopPropagation()}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.primary,
                    cursor: "pointer",
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
                  verticalAlign: "top"
                }}
              >{`#${props.actorUserId}`}</Typography>
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
                {props.description}
              </Typography>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </Grid>
  );
}
