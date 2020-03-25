import React, { useState, useRef, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";

const Board = () => {
  const [buttonState, setButtonState] = useState(false);
  const [currentIMG, setCurrentImg] = useState("");
  const [srcImg, setSrcImg] = useState("");
  var src = "./img/" + srcImg;

  const ItemTypes = {
    KNIGHT: "knight"
  };

  const [collectedProps, drop] = useDrop({
    accept
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.KNIGHT },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });

  useEffect(() => {
    src = "./img/" + srcImg;
  }, [srcImg]);

  const saveIMG = () => {
    setButtonState(false);
    if (currentIMG != " " || currentIMG != undefined) {
      let string = currentIMG.split("\\");

      setSrcImg(string[string.length - 1]);
    }
  };
  const editIMG = () => {
    setButtonState(true);
  };

  return (
    <>
      <div className="card" ref={drop}>
        <div className="card-image">
          {!buttonState ? (
            <img ref={drag} src={src}></img>
          ) : (
            <input
              type="file"
              name="img"
              onChange={e => {
                setCurrentImg(e.target.value);
              }}
            ></input>
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
