import React, { useContext, useEffect, useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { useReactMediaRecorder } from "react-media-recorder";
import { AppMainContext } from "../context/app_context";
import { checkStatus } from "../utils";

const MainContent = () => {
  const { infoUser } = useContext(AppMainContext);
  const { languageUser } = infoUser;
  const [isPlayRecord, setIsPlayRecord] = useState(false);
  const audioRef = useRef();

  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
  } = useSpeechRecognition();

  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true });

  const startListen = () => {
    if (!listening) {
      SpeechRecognition.startListening({
        continuous: true,
        language: languageUser,
      });
      startRecording();
    } else {
      SpeechRecognition.stopListening();
      stopRecording();
    }
  };

  useEffect(() => {
    if (finalTranscript !== "") {
      console.log("test ttt log result", finalTranscript);
    }
  }, [interimTranscript, finalTranscript]);

  const handleRetry = () => {
    audioRef.current.play();
  };

  const handleRender = () => {
    if (listening) {
      return <img src="https://i.gifer.com/Nt6v.gif" className="w-10" />;
    } else {
      if (transcript) {
        return (
          <div className="flex justify-between items-center gap-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 p-2 bg-slate-300 rounded-full cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
              />
            </svg>

            <div>
              <span>{`You say: ${transcript}`}</span>
            </div>
          </div>
        );
      } else {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 p-2 bg-slate-300 rounded-full cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
            />
          </svg>
        );
      }
    }
  };

  const handleSave = () => {
    const x = checkStatus(languageUser, transcript);
    const data = { ...infoUser, status: x, urlBlob: mediaBlobUrl };
    const result = JSON.parse(window.localStorage.getItem("listConsent")) || [];
    window.localStorage.setItem(
      "listConsent",
      JSON.stringify([...result, data])
    );
    resetTranscript();
  };

  return (
    <div className="w-[40%] m-auto flex flex-col justify-center gap-5">
      <h1 className="text-3xl text-center">Consent Form</h1>
      <p className="my-5">
        You understand that by using the site or site services, you agree to be
        bound by this agreement. If you do not accept this agreement in it's
        entirety, you must not access or use the site or the site services.
      </p>
      <p>
        Do you agree to this agreement? Please respond by saying "Yes" or "No".
      </p>

      <div className="flex justify-center items-center" onClick={startListen}>
        {handleRender()}
      </div>

      {mediaBlobUrl && <audio ref={audioRef} src={mediaBlobUrl} />}

      {transcript && (
        <div className="flex justify-end gap-2 items-center">
          <button
            type="submit"
            className="px-3 py-2 bg-slate-400 rounded-md flex items-center justify-center gap-1"
            onClick={handleRetry}
          >
            Retry{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 translate-y-[1px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </button>
          <button
            type="submit"
            className="px-3 py-2 bg-slate-400 rounded-md flex items-center justify-center"
            onClick={handleSave}
          >
            Save
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 translate-y-[1px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default MainContent;
