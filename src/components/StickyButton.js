import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      width: "100%",
      position: "relative",
      maxWidth: "1024px"
    }
  },
  extendedIcon: {
    right: "36px",
    bottom: "10vh",
    zIndex: 1,
    position: "absolute"
  }
}));

export default function StickyButton(props) {
  const hash = props.hash;
  const classes = useStyles();
  return (
    <div className="">
      <Fab
        className={classes.extendedIcon}
        color="primary"
        aria-label="compose"
        disabled={!localStorage.getItem("tokenTwetchAuth")}
        component={Link}
        to={`/compose${hash}`}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}
