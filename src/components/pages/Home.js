import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import VideoLayout from "../Layout/Video";
import VideoPlayer from "../Evolution/VideoPlayer/VideoPlayer";
import { guestPlaylist } from "utils/video";

const Home = () => {
  const history = useHistory();
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    if (guestPlaylist) {
      setPlaylist(guestPlaylist);
    }
  }, []);

  const handleFinished = () => {
    history.push("/demo");
  };

  return (
    <div>
      <VideoLayout>
        {playlist.length > 0 && (
          <VideoPlayer playlist={playlist} onPlaylistEnded={handleFinished} />
        )}
      </VideoLayout>
    </div>
  );
};

export default Home;
