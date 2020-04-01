import React, { useState, useEffect } from "react";
import { DndProvider } from 'react-dnd';
import Backend from "react-dnd-html5-backend";
import { useDrop } from "react-dnd";
import styled  from 'styled-components';
import ImgItem from './ImgItem';
import ItemTypes from '../helpers/Constants';
import Prueba from "./Prueba";

const PinPlane = styled.div`
  min-height: 1000px;
  min-width: 1000px;
  border: 1px dotted black;
  display: flex;
`;

const Plane = props => {
  const [position, setPosition]= useState([]);

  const [dropTargetProps, drop] = useDrop({
    accept: ItemTypes.ImgItem,
    drop: (item, monitor) => {
      setPosition([monitor.getSourceClientOffset().x, monitor.getSourceClientOffset().y])
    },
    collect: monitor => ({
      isOver: !!monitor.isOver()     
    })
  });
  
 
  const uniqueid = require("uniqid");

  useEffect (()=>{
    setPosition(position);
  },[position])

  return (
    <PinPlane ref={drop} >
      <ImgItem position={position} /> 
      <ImgItem position={position} /> 
    </PinPlane>
  );
};

export default Plane;