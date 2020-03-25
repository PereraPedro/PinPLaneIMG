import React, { useState, useRef } from "react";

const Board = () => {
  const [buttonState, setButtonState] = useState(false);

  const img = useRef("");

  const saveIMG = () => {
    setButtonState(false);

    console.log(img.current.value);
  };
  const editIMG = () => {
    setButtonState(true);
  };

  return (
    <>
      <div className="card">
        <div className="card-image">
          {!buttonState ? (
            <img src={img.current.value}></img>
          ) : (
            <input type="file" ref={img} name="img"></input>
          )}
        </div>
        <a className="btn-floating halfway-fab waves-effect waves-light red flotar">
          {!buttonState ? (
            <p
              className="material-icons"
              onClick={() => {
                editIMG();
              }}
            >
              Edit
            </p>
          ) : (
            <p
              className="material-icons"
              onClick={() => {
                saveIMG();
              }}
            >
              Save
            </p>
          )}
        </a>
      </div>
    </>
  );
};

export default Board;
