import React from "react";
import { useTheme } from "@mui/material";

export default function Logo(props) {
  const small = props.small;
  const left = props.left;
  const theme = useTheme();
  return (
    <div
      style={{
        fontWeight: 669,
        fontSize: "24px",
        color: theme.palette.text.primary,
        cursor: "pointer",
        textAlign: left ? "" : "center",
        paddingLeft: left && "24px"
      }}
    >
      <span role="img" aria-label="the egg way">
        (🥚,🐣)
      </span>
      {!small && (
        <span style={{ fontSize: "18px", marginLeft: "3px" }}>EggDao</span>
      )}
    </div>
  );
}
