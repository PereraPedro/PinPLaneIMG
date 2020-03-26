import React, { useState, useRef, useEffect, useCallback } from "react";
import { useDrag, useDrop, DropTarget } from "react-dnd";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";

const Board = () => {
  const [buttonState, setButtonState] = useState(false);
  const [currentIMG, setCurrentImg] = useState("");
  const [dropIMG, setDropIMG] = useState("");
  const [srcImg, setSrcImg] = useState("");

  ////////////////////DROP ZONE////////////////////////////////////

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    let string = acceptedFiles[0].name.split("\\");
    console.log(acceptedFiles);

    setDropIMG("./img/" + string[string.length - 1]);
    setCurrentImg("");
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

  ///////////////////////////////////////////////////////
  const saveIMG = current => {
    console.log("CUrrent img " + currentIMG + "  drop img " + dropIMG);
    console.log(current);

    if (dropIMG == "" || currentIMG != "") {
      if (current != "") {
        let string = current.split("\\");

        console.log(string[string.length - 1]);
        setSrcImg("./img/" + string[string.length - 1]);
      } else {
        setSrcImg(currentIMG);
        console.log(srcImg);
      }

      /* let string = current.split("\\");

      console.log(string[string.length - 1]);
      setSrcImg("./img/" + string[string.length - 1]);
      console.log(srcImg); */

      setButtonState(false);
    } else if (currentIMG == "" || dropIMG != "") {
      setButtonState(false);
      console.log("entrada asdasdasd");
      setSrcImg(dropIMG);
      // setCurrentImg("");
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
          <div className="card-image">
            {!buttonState ? (
              <img
                src={srcImg == "" ? "./img/default_image.png" : srcImg}
              ></img>
            ) : (
              <div className="fileSelectors">
                <input
                  type="file"
                  name="img"
                  onChange={e => {
                    setCurrentImg(e.target.value);
                  }}
                ></input>
                <div className="imgcontainer" {...getRootProps()}>
                  {isDragActive ? (
                    <p>Drop your image here</p>
                  ) : (
                    <p>You can drop a file</p>
                  )}

                  <div className="DropZone" {...getInputProps()}></div>
                </div>
              </div>
            )}
          </div>
          <div className="waves-effect waves-light deep-purple lighten-1 flotar">
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
                  saveIMG(currentIMG);
                }}
              >
                Save
              </p>
            )}
          </div>
        </div>
      </div>
      <Drag ref={drag} opacity={isDragging ? "0.5" : "1"}></Drag>
    </div>
  );
};

export default Board;
