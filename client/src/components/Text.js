import React from "react";

function Text(props) {
  return (
    <>
      <div className="flex ">
        <div className="message-content m-3  break-words rounded-[5px] max-w-[250px]  flex flex-col  bg-cyan-500  ">
          <p className="p-1">{props.content}</p>
          <div className="bg-white text-black flex justify-between w-full message-meta">
            <p>{props.name}</p>
            <p className="ml-4">{props.time}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Text;
