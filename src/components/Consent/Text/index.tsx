import { useContext, useEffect, useMemo, useState } from "react";
import { AppMainContext } from "../../../contexts";
import { checkStatusConsent, getValueTextTranslate } from "../../../utils";
import { ICON_MIC, ICON_NEXT, ICON_PLAY } from "../../../assets";
import AudioSpeech from "../../Audio";

const ConsentText = () => {
  const { infoUser, showConsent } = useContext(AppMainContext);
  const { languageSelect } = infoUser;

  const [turnOnMic, setTurnOnMic] = useState(false);
  const [resultSpeech, setResultSpeech] = useState("");
  const [audioURL, setAudioURL] = useState("");
  const [mediaRecording, setMediaRecording] = useState<MediaRecorder>();

  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.lang = languageSelect;
  recognition.interimResults = true;

  let mediaRecorder: MediaRecorder;
  let chunks: BlobPart[] = [];

  const getTranslateText = getValueTextTranslate(languageSelect);

  const consentText = useMemo(
    () => new SpeechSynthesisUtterance(getTranslateText),
    [getTranslateText]
  );

  useEffect(() => {
    if (showConsent) {
      speechSynthesis.speak(consentText);
    }
  }, [consentText]);

  useEffect(() => {
    handleListenSpeech();
    if (turnOnMic) {
      handleStartRecordSpeech();
    } else {
      mediaRecording?.stop();
    }
  }, [turnOnMic]);

  const handleListenSpeech = () => {
    if (turnOnMic) {
      recognition.start();
    } else {
      recognition.stop();
    }

    recognition.onstart = () => {
      console.log("Mở mic");
    };

    recognition.onresult = (event: any) => {
      console.log(event);
      const result = event.results[0][0].transcript;
      console.log(turnOnMic);
      console.log(result);
      setResultSpeech(result);
    };
  };

  const handleStartRecordSpeech = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.start();
          setMediaRecording(mediaRecorder);

          console.log(mediaRecorder.state);

          mediaRecorder.ondataavailable = (e: BlobEvent) => {
            chunks.push(e.data);
          };

          mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
            const audioURL = URL.createObjectURL(blob);
            setAudioURL(audioURL);
            chunks = [];
          };
        })
        .catch((err) => console.log(err));
    }
  };

  const changeStatusMic = () => {
    setTurnOnMic((prev) => !prev);
  };

  const handleResetConsent = () => {
    setAudioURL("");
    setTurnOnMic(false);
    setResultSpeech("");
  };

  const handleRenderUIValueSpeech = () => {
    if (turnOnMic) {
      return (
        <img
          src="https://i.gifer.com/Nt6v.gif"
          alt="icon/gif"
          className="w-20 h-20"
          onClick={changeStatusMic}
        />
      );
    }
    if (resultSpeech) {
      return (
        <div className="flex justify-between items-center gap-5">
          {audioURL && <AudioSpeech urlBlob={audioURL} />}
          <div>
            <span>{`You say: ${resultSpeech}`}</span>
          </div>
        </div>
      );
    }
    return (
      <div
        className="w-24 h-24 mt-5 flex justify-center items-center"
        onClick={changeStatusMic}
      >
        <ICON_MIC className="w-20 h-20 p-2 bg-slate-300 rounded-full cursor-pointer" />
      </div>
    );
  };

  const handleSaveConsent = () => {
    const statusConsent = checkStatusConsent(languageSelect, resultSpeech);
    const data = { ...infoUser, statusConsent, audioURL };
    const result =
      JSON.parse(localStorage.getItem("listConsent") || "{}") || [];
    localStorage.setItem("listConsent", JSON.stringify([...result, data]));
    setResultSpeech("");
  };

  return (
    <div className="w-[40%] m-auto flex flex-col justify-center gap-5">
      <p className="my-5">
        You understand that by using the site or site services, you agree to be
        bound by this agreement. If you do not accept this agreement in it's
        entirety, you must not access or use the site or the site services.
      </p>
      <p>
        Do you agree to this agreement? Please respond by saying "Yes" or "No".
      </p>

      <div className="flex justify-center items-center">
        {handleRenderUIValueSpeech()}
      </div>

      {resultSpeech.length !== 0 && (
        <div className="flex justify-end gap-2 items-center">
          <button
            type="submit"
            className="px-3 py-2 bg-slate-400 rounded-md flex items-center justify-center gap-1"
            onClick={handleResetConsent}
          >
            Retry <ICON_NEXT />
          </button>
          <button
            type="submit"
            className="px-3 py-2 bg-slate-400 rounded-md flex items-center justify-center"
            onClick={handleSaveConsent}
          >
            Save <ICON_NEXT />
          </button>
        </div>
      )}
    </div>
  );
};

export default ConsentText;
