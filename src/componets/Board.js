import React, { useState, useRef, useEffect, useCallback } from "react";
import { useDrag, useDrop, DropTarget } from "react-dnd";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";

const Board = () => {
  const [buttonState, setButtonState] = useState(false);
  const [currentIMG, setCurrentImg] = useState("");
  const [dropIMG, setDropIMG] = useState("");
  const [srcImg, setSrcImg] = useState("");
  var src = "";

  ////////////////////DROP ZONE////////////////////////////////////

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    let string = acceptedFiles[0].name.split("\\");
    console.log(acceptedFiles[0].name);

    setDropIMG("./img/" + string[string.length - 1]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  ///////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////
  const ItemTypes = {
    Image: "image"
  };
  ////////////////////////////DND DRAG ///////////////////////////////////
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.Image },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });
  //////////////////////////////////////////////////////////////

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.Image,
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  });

  /////////////////////////////////////////////////////////
  useEffect(() => {
    src = "./img/" + srcImg;
    console.log(src);
  }, [srcImg]);
  ///////////////////////////////////////////////////////
  const saveIMG = () => {
    if (dropIMG != "" || dropIMG != undefined) {
      setButtonState(false);
      setSrcImg(dropIMG);
    } else {
      if (currentIMG != " " || currentIMG != undefined) {
        let string = currentIMG.split("\\");

        setSrcImg("./img/" + string[string.length - 1]);
      }
      setButtonState(false);
    }
  };
  ////////////////////////////////////////////////
  const editIMG = () => {
    setButtonState(true);
  };
  /////////////////////////////////////////////
  const Drag = styled.div`
    background-color: black;
    height: 100px;
    width: 100px;
    border: 1px dotted red;
  `;
  //////////////////////////////////////////////////
  return (
    <div>
      <div className="container" ref={drop}>
        <div className="card">
          <div className="card-image" {...getRootProps()}>
            {!buttonState ? (
              <img src={srcImg}></img>
            ) : (
              <input
                {...getInputProps()}
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
      </div>
      <Drag ref={drag} opacity={isDragging ? "0.5" : "1"}></Drag>
    </div>
  );
};

export default Board;
