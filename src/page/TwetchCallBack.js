import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { CircularProgress } from "@material-ui/core";

import { userData } from "../api/TwetchGraph";

const axios = require("axios");

export default function TwetchCallBack() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const history = useHistory();
  let params = new URLSearchParams(document.location.search.substring(1));
  let tokenTwetch = params.get("token");
  localStorage.setItem("tokenTwetchAuth", tokenTwetch);
  const axiosTwetchGraphQL = axios.create({
    baseURL: "https://api.twetch.app/v1/",
    headers: {
      Authorization: `Bearer ${tokenTwetch}`
    }
  });
  useEffect(() => {
    setLoading(true);
    axiosTwetchGraphQL
      .post("/graphql", {
        query: userData
      })
      .then((resp) => {
        setUser(resp.data.data.me);
        localStorage.setItem("icon", resp.data.data.me.icon);
        localStorage.setItem("id", resp.data.data.me.id);
        localStorage.setItem("name", resp.data.data.me.name);
        setLoading(false);
        history.push("/");
      });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        marginTop: "16px",
        justifyContent: "center"
      }}
    >
      <CircularProgress />
    </div>
  );
}
