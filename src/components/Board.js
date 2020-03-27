import React, { useState, useCallback } from "react";
import { useDrag, useDrop } from "react-dnd";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";

const Drag = styled.div`
background-color: black;
height: 100px;
width: 100px;
border: 1px dotted red;
`;

const Board = () => {
  const [buttonState, setButtonState] = useState(false);
  const [currentIMG, setCurrentImg] = useState("");
  const [dropIMG, setDropIMG] = useState("");
  const [srcImg, setSrcImg] = useState("");

  const onDrop = useCallback(acceptedFiles => {
    
    let string = acceptedFiles[0].name.split("\\");
    
    setDropIMG("./img/" + string[string.length - 1]);
    setCurrentImg("");
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const ItemTypes = {
    Image: "image"
  };
  
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.Image },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });
  
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.Image,
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  });

  const saveIMG = current => {

    if (dropIMG == "" || currentIMG != "") {
      if (current != "") {
        let string = current.split("\\");
        setSrcImg("./img/" + string[string.length - 1]);
      } else {
        setSrcImg(currentIMG);
      }

      setButtonState(false);
    } else if (currentIMG == "" || dropIMG != "") {
      setButtonState(false);
      setSrcImg(dropIMG);
    }
  };
  
  const editIMG = () => {
    setButtonState(true);
  };
 
  return (
    <div>
      <div className="container" ref={drop}>
        <div className="card">
          <div className="card-image">
            {!buttonState ? (
              <img
                src={srcImg == "" ? "./img/default_image.png" : srcImg}
                alt=""
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
