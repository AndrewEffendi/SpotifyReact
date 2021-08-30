import React from "react";
import logo from "./SpotifyReactLogo.png";
import "./Authorization.css";

const CLIENT_ID = "35b92c52cf8a470394d8044991cdb6da";
const RESPONSE_TYPE = "code";
const REDITRECT_URI = "http://localhost:3000";
const SCOPE =
  "streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

const AUTHENTICATION_URL =
  "https://accounts.spotify.com/authorize?client_id=" +
  CLIENT_ID +
  "&response_type=" +
  RESPONSE_TYPE +
  "&redirect_uri=" +
  REDITRECT_URI +
  "&scope=" +
  SCOPE;

export default function Authorization() {
  return (
    <div className="authorization">
      <h1>Spotify React</h1>
      <img src={logo} alt="Spotify React Logo" />
      <a
        className="btn btn-success btn-lg d-flex justify-content-center align-items-center"
        href={AUTHENTICATION_URL}
      >
        Login With Spotify
      </a>
      <b>React JS project by Andrew Effendi</b>
      <v>version 1.3</v>
    </div>
  );
}
