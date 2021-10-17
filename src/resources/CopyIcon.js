import { useState } from "react";
import { IconButton, Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
import FilterNoneIcon from "@mui/icons-material/FilterNone";

export default function CopyIcon(props) {
  const url = `https://eggdao.xyz/t/${props.tx}`; //config
  const [copied, setCopied] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    const el = document.createElement("textarea");
    el.value = url;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    setCopied(true);
    document.body.removeChild(el);
  };

  const handleClose = (e) => {
    setCopied(false);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <FilterNoneIcon />
      </IconButton>
      <Snackbar open={copied} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity="success">Copied to clipboard</Alert>
      </Snackbar>
    </div>
  );
}
