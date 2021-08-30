import { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function MusicPlayer({ accessToken, trackUri }) {
  // this is to make sure we set this to true after we change the song
  // by default, setPlay is false, but it will be set to true when we change our track URI
  const [play, setPlay] = useState(false);
  useEffect(() => setPlay(true), [trackUri]);

  // if we dont have an access token, we return null
  // because we dont want to render a player if no access token
  if (!accessToken) return null;
  // component from the imported react-spotify-web-playback
  return (
    // we meed to pass in access tokent
    //and uris of the song we want to play
    <SpotifyPlayer
      token={accessToken}
      // this is used to allow us to save songs to our spotify library
      showSaveIcon
      // this callback is used to unset our play to false when we are done playing
      // if not playing, we want to set our play to false
      // so its goin to occur everytime our song changes or finishes
      callback={(state) => {
        if (!state.isPlaying) setPlay(false);
      }}
      // this is make the player start playing the music automatically when we choose a track
      play={play}
      // if we have a song to play, then we pass it into an array, otherwise we pass in an empty array
      uris={trackUri ? [trackUri] : []}
    />
  );
}
