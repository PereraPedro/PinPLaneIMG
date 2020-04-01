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
  const [position, setPosition]= useState([[0,300,200],[1,500,200]]);
  const ItemsArray=[[]];
  const uniqueid = require("uniqid");
  const [dropTargetProps, drop] = useDrop({
    accept: ItemTypes.ImgItem,
    drop: (item, monitor) => {
      console.log(item.key);
    ItemsArray.forEach(i=>{
      if(i[0]== item.key){
      item =[item.key, monitor.getSourceClientOffset().x, monitor.getSourceClientOffset().y]
    }
    });
      //setPosition([monitor.getSourceClientOffset().x, monitor.getSourceClientOffset().y])
      setPosition(ItemsArray);
      
    },
    collect: monitor => ({
      isOver: !!monitor.isOver()  
    })
  });
  
 
  

  useEffect (()=>{
    setPosition(position);
  },[position])

  return (
    <PinPlane ref={drop} >
      <ImgItem position={position[0]} /> 
      <ImgItem position={position[1]} /> 
    </PinPlane>
  );
};

export default Plane;