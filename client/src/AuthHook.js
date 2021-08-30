import { useState, useEffect } from "react";
import axios from "axios";

export default function AuthHook(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:3001/login", {
        code,
      })
      .then((res) => {
        //console.log(res.data);
        // used to set our data
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        //to remove the code from the url
        window.history.pushState({}, null, "/");
      })
      // redirect user to login page when accessToken expires
      .catch(() => {
        window.location = "/";
      });
  }, [code]);

  //when ever our refreshToken or expiresIn changes, then we run this use effect
  useEffect(() => {
    // to prevent running before we have our refresh token, we need to check if we have a refresh token
    // a refresh token or an expires in time befrom running
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post("http://localhost:3001/refresh", {
          refreshToken,
        })
        .then((res) => {
          console.log(res.data);
          // used to set our data
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        // redirect user to login page when accessToken expires
        .catch(() => {
          window.location = "/";
        });
    }, (expiresIn - 60) * 1000);
    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
}
