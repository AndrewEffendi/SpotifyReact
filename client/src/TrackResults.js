import React from "react";

export default function TrackResults({ track, chooseTrack }) {
  function play() {
    chooseTrack(track);
  }
  // the style corsor pointer is to make the cursor to be a pointer when mouse is hovering over
  return (
    <div
      className="d-flex m-2 align-items-center"
      style={{ cursor: "pointer" }}
      onClick={play}
    >
      <img src={track.albumUrl} style={{ height: "64px", width: "64px" }} />
      <div className="ms-3">
        <div>{track.title}</div>
        <div className="text-muted">{track.artist}</div>
      </div>
    </div>
  );
}
