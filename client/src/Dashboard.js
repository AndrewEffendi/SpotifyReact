import { useState, useEffect } from "react";
import "./Dashboard.css";
import AuthHook from "./AuthHook";
import TrackResults from "./TrackResults";
import MusicPlayer from "./MusicPlayer";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";

const spotifyApi = new SpotifyWebApi({
  clientId: "35b92c52cf8a470394d8044991cdb6da",
});

export default function Dashboard({ code }) {
  const accessToken = AuthHook(code);
  const [search, setSearch] = useState("");
  // to save our search state
  const [searchResult, setSearchResult] = useState([]);
  // to save current track playing
  const [trackPlaying, setTrackPlaying] = useState();
  const [lyric, setLyric] = useState("");

  function chooseTrack(track) {
    setTrackPlaying(track);
    // to clear our search
    setSearch("");
    setLyric("");
  }

  // whenever the song that we are playing changes, we want to call this useEffect
  useEffect(() => {
    // make sure we have a track playing
    if (!trackPlaying) return;
    axios
      .get("http://localhost:3001/lyric", {
        params: {
          track: trackPlaying.title,
          artist: trackPlaying.artist,
        },
      })
      .then((res) => {
        setLyric(res.data.lyric);
      });
  }, [trackPlaying]);

  // when ever our access token changes, we need to make sure we set our access token on our spotifyApi
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  //whenever our search query changes or access token changes, we rerun this code
  useEffect(() => {
    // if we dont have anything to search, return empty array
    if (!search) return setSearchResult([]);
    // if we have no accessToken just return
    if (!accessToken) return;

    let cancelRequest = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancelRequest) return;
      setSearchResult(
        res.body.tracks.items.map((track) => {
          // this is used to find the smallest image
          // we want to reduce it to a single value
          // the function take the smallest and image
          // track.album.images[0], means we set the first image as the starting point
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });

    // what this is going to do, is first its going to say make your request to
    // and if a new request is made in this time period, we set the cancelRequest to true
    // so it would never set the result before the user finish typing
    return () => (cancelRequest = true);
  }, [search, accessToken]);

  return (
    // py is for padding
    // my is for margin y axis
    // style overflow is used to scroll if it needs to
    // because we used flex grow, this will cause the components below the current component
    // to be at the bottom of the page
    <div className="d-flex flex-column py-2 dashboard">
      <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {searchResult.map((track) => (
          // we are returning a new component
          // we are going to pass our track, and a key which we wil set to track.uri
          <TrackResults
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
        {searchResult.length === 0 && (
          <div className="text-center" style={{ whiteSpace: "pre" }}>
            {lyric}
          </div>
        )}
      </div>
      <mp>
        <MusicPlayer accessToken={accessToken} trackUri={trackPlaying?.uri} />
      </mp>
    </div>
    // {trackPlaying?.uri} means if we have trackPlaying, we're going to get the uri
  );
}
