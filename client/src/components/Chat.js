import React, { useState, useMemo } from "react";
import ScrollToBotton from "react-scroll-to-bottom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import Image from "./Image.js";
import Text from "./Text.js";

function Chat({ socket, room, user }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [file, setFile] = useState();
  const hour = new Date(Date.now()).getHours();
  const minute = new Date(Date.now()).getMinutes();

  const time = () => {
    return minute < 10 ? `0${minute}` : minute;
  };

  const sendMessage = async () => {
    if (currentMessage !== "") {
      if (file) {
        const messageData = {
          content: file,
          name: user,
          room: room,
          time: hour + ":" + time(),
          type: "file",
          mimeType: file.type,
          fileName: file.name,
        };
        await socket.emit("send-message", messageData);
        setMessageList((list) => {
          return [...list, messageData];
        });
        setCurrentMessage("");
        setFile();
      } else {
        const messageData = {
          content: currentMessage,
          name: user,
          room: room,
          time: hour + ":" + time(),
          type: "text",
        };

        setCurrentMessage("");
        await socket.emit("send-message", messageData);
        setMessageList((list) => {
          return [...list, messageData];
        });
      }

      setCurrentMessage("");
    }
  };

  useMemo(() => {
    socket.on("recieve-message", (data) => {
      setMessageList((list) => {
        return [...list, data];
      });
    });
  }, [socket]);

  const selectFile = (e) => {
    setCurrentMessage(e.target.files[0].name);
    setFile(e.target.files[0]);
  };

  const renderMessages = (message, key) => {
    if (message.type === "text") {
      return (
        <div
          className="message h-auto w-auto  flex break-words overflow-y-hidden overflow-x-hidden"
          id={user === message.name ? "you" : "other"}
          key={key}
        >
          <Text
            name={message.name}
            time={message.time}
            content={message.content}
          />
        </div>
      );
    } else if (message.type === "file") {
      const blob = new Blob([message.content], { type: message.type });
      return (
        <div
          className="message h-auto w-auto flex break-words overflow-y-hidden overflow-x-hidden"
          id={user === message.name ? "you" : "other"}
          key={key}
        >
          <Image
            fileName={message.fileName}
            blob={blob}
            name={message.name}
            time={message.time}
          />
        </div>
      );
    }
  };
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="border-2 border-cyan-200  h-1/2 w-1/3 flex flex-col rounded chat-window max-sm:w-4/5">
        <div className="h-1/6 flex justify-around items-center bg-cyan-300 text-white chat-header">
          <p className="text-3xl">Live Chat</p>
        </div>
        <div className="w-full h-full border-cyan-200 border-t-2 border-b-2  relative overflow-y-auto overflow-x-hidden chat-body">
          <ScrollToBotton className="w-full h-full overflow-x-hidden message-container">
            {messageList.map(renderMessages)}
          </ScrollToBotton>
        </div>
        <div className="flex justify-between items-center h-16 chat-footer">
          <label
            for="file-input"
            className="w-1/5 h-full bg-cyan-300 flex items-center justify-center"
          >
            <FontAwesomeIcon
              icon={faImage}
              className="h-4/5  text-white cursor-pointer"
            />
          </label>
          <input
            id="file-input"
            type="file"
            onChange={selectFile}
            className=" bg-cyan-300 text-white  hidden"
          />

          <input
            type="text"
            placeholder="Aa"
            className="w-4/5 h-full  border-cyan-400 text-xl p-2"
            value={currentMessage}
            onChange={(e) => {
              setCurrentMessage(e.target.value);
            }}
            onKeyDown={(e) => {
              e.key === "Enter" && sendMessage();
            }}
          ></input>
          <button
            onClick={sendMessage}
            className="w-1/5 h-full bg-cyan-300 text-white text-3xl"
          >
            &#9658;
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
