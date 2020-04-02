import React, { useState, useEffect, useReducer, useContext } from "react";
import { useDrop } from "react-dnd";
import styled from "styled-components";
import ImgItem from "./ImgItem";
import ItemTypes from "../helpers/Constants";
import { createContext } from "react";

const PinPlane = styled.div``;

const Plane = props => {
  const [planeHeight, setplaneHeight] = useState(1000);
  const [planeWidth, setplaneWidth] = useState(1000);
  // const contx = createContext(planeHeight, planeWidth);
  // const Hg = useContext(contx);
  // const Wd = useContext(contx);

  const manageItems = (state, action) => {
    // const uniqueid = require("uniqid");
    switch (action.type) {
      case "updatePosition":
        state.forEach(element => {
          if (element.id == action.payload) {
            element.img = action.updatedPosition;
            //     console.log(element);
          }
        });

        return state;

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(manageItems, [
    {
      id: 1,
      img: [300, 200]
    },
    {
      id: 2,
      img: [500, 200]
    }
  ]);

  //const uniqueid = require("uniqid");
  const [dropTargetProps, drop] = useDrop({
    accept: ItemTypes.ImgItem,
    drop: (item, monitor) => {
      dispatch({
        type: "updatePosition",
        payload: item.id,
        updatedPosition: [
          monitor.getSourceClientOffset().x,
          monitor.getSourceClientOffset().y
        ]
      });
      // console.log(state);
    },
    hover: (item, monitor) => {
      if (monitor.getSourceClientOffset().x >= planeWidth - 300) {
        setplaneWidth(planeWidth + 5);
      } else if (monitor.getSourceClientOffset().y >= planeHeight - 300) {
        setplaneHeight(planeHeight + 5);
      }
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      getSize: monitor.getClientOffset()
    })
  });

  const styles = {
    width: `${planeWidth}px`,
    height: `${planeHeight}px`,
    position: "relative",
    border: "1px dotted black"
  };
  return (
    <PinPlane ref={drop} style={styles}>
      <ImgItem position={state[0]} />
      <ImgItem position={state[1]} />
    </PinPlane>
  );
};

export default Plane;
