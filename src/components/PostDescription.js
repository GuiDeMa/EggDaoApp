import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FetchUserName } from "../api/TwetchGraph";
import { Typography, useTheme } from "@mui/material";
const Twetch = require("@twetch/sdk");
const twetch = new Twetch();
const PostHelper = twetch.Helpers.Post;

const UserName = (props) => {
  const id = props.id;
  const [name, setName] = useState(id);
  const theme = useTheme();

  useEffect(() => {
    FetchUserName(id).then((res) => {
      setName(res.userById.name);
    });
  }, []);
  return (
    <Link
      className="Links"
      style={{ textDecoration: "none" }}
      to={`/u/${id}`}
      onClick={(e) => e.stopPropagation()}
    >
      <span
        style={{ display: "inline-block", color: theme.palette.primary.main }}
      >
        @{name}
      </span>
    </Link>
  );
};

export default function PostDescription(props) {
  const post = props.post;
  const desc = PostHelper.displayDescription(post);
  const elements = PostHelper.elements(desc);
  const [description, setDescription] = useState(desc);

  useEffect(() => {
    generateDesc(desc).then((res) => {
      setDescription(res);
    });
  }, []);

  const generateDesc = async (desc) => {
    let jsx = [];
    elements.forEach((e) => {
      e.forEach((o) => {
        if (o.type === "text") {
          jsx.push(<span>{o.value}</span>);
        } else if (o.type === "mention") {
          jsx.push(<UserName id={o.userId} />);
        }
      });
    });
    return jsx;
  };

  return (
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
        {description}
      </Typography>
    </div>
  );
}
