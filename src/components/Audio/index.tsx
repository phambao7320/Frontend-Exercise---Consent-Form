import { useRef, useState } from "react";
import { ICON_PLAY } from "../../assets";

interface propAudioSpeech {
  urlBlob: string;
}

const AudioSpeech = ({ urlBlob }: propAudioSpeech) => {
  const audioPlayer = useRef<any>();

  const play = () => {
    if (urlBlob) {
      audioPlayer.current.play();
    }
  };
  return (
    <div onClick={play}>
      <ICON_PLAY />
      <audio ref={audioPlayer} src={urlBlob} hidden />
    </div>
  );
};

export default AudioSpeech;
