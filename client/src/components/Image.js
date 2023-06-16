import React, { useState, useMemo } from "react";
//import { Route, Routes, useNavigate } from "react-router-dom";
//import Photo from "./Photo";

function Image(props) {
  const [imageSrc, setImageSrc] = useState("");
  const [clicked, setClicked] = useState(false);
  //const navigate = useNavigate();

  useMemo(() => {
    const reader = new FileReader();
    reader.readAsDataURL(props.blob);
    reader.onloadend = () => {
      setImageSrc(reader.result);
    };
  }, [props.blob]);
  const selectPhoto = (e) => {
    //navigate("/photo");
    setClicked(!clicked);
  };

  return (
    <div className="flex ">
      <div className="message-content m-3 break-words rounded-[5px] max-w-[250px]  flex flex-col items-end photo">
        <img
          className="h-auto w-5/6"
          src={imageSrc}
          alt={props.fileName}
          onClick={selectPhoto}
        />
        <div className="bg-white text-black flex justify-between w-5/6 message-meta ">
          <p>{props.name}</p>
          <p className="ml-4">{props.time}</p>
        </div>
      </div>
      {/* <Routes>
        <Route path="/photo" element={<Photo />} />
      </Routes> */}
    </div>
  );
}

export default Image;
