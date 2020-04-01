import React, { useState, useEffect } from "react";
import { useDrag } from "react-dnd";
import ItemTypes from "../helpers/Constants";
import styled from "styled-components";

export default function Prueba(props) {
  
  const [ isDragging, drag] = useDrag({
    item: { type: ItemTypes.ImgItem },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });

  const estilos = {
    position: "absolute",
    left:  `${props.position[0]}px`,
    top: `${props.position[1]}px`,
    height: "100px",
    width: "100px",
    backgroundColor: "green"
  };

  

  return (
    <div>
      <div
        className="prueba"
        ref={drag}
        style={estilos}
      >
        Hola
        {console.log("x " + props.position)} 
      </div>
    </div>
  );
}
