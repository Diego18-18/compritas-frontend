import React, { useState, useRef } from "react";

function ButtonVoice({ setGetData }) {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const sendAudio = async (audio) => {
    const formData = new FormData();
    formData.append("file", audio);

    console.log("Envío audio");
    setGetData(true);
    console.log(formData);

    const requestOptions = {
      method: "POST",
      body: formData,
    };

    try {
      let res = await fetch(
          "http://192.168.0.238:8080/chats/upload",
          requestOptions
        ),
        json = await res.json();

      console.log(res);
      console.log(json);
      // if (!res.ok) throw { res, json };
    } catch (error) {
      console.log(error);
      // setTimeout(() => {
      //   handleChangeLoading(false);
      //   handleChangeErrorForm(true, error.json.message);
      // }, 750);
    }
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/mp3",
      });
      sendAudio(audioBlob);
      audioChunksRef.current = [];
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  return (
    <div className="p-4 space-y-4">
      <button
        onClick={recording ? stopRecording : startRecording}
        className={`px-4 py-2 rounded ${
          recording ? "bg-red-500" : "bg-green-500"
        } text-white`}
      >
        {recording ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            fill="currentColor"
            className="bi bi-mic-mute-fill"
            viewBox="0 0 16 16"
          >
            <path d="M13 8c0 .564-.094 1.107-.266 1.613l-.814-.814A4 4 0 0 0 12 8V7a.5.5 0 0 1 1 0zm-5 4c.818 0 1.578-.245 2.212-.667l.718.719a5 5 0 0 1-2.43.923V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 1 0v1a4 4 0 0 0 4 4m3-9v4.879L5.158 2.037A3.001 3.001 0 0 1 11 3" />
            <path d="M9.486 10.607 5 6.12V8a3 3 0 0 0 4.486 2.607m-7.84-9.253 12 12 .708-.708-12-12z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            fill="#fff"
            className="bi bi-mic-fill"
            viewBox="0 0 16 16"
          >
            <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0z" />
            <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5" />
          </svg>
        )}
      </button>
    </div>
  );
}

export default ButtonVoice;
