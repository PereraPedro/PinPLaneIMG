import React, { useState, useEffect, useReducer, useContext } from "react";
import { useDrop } from "react-dnd";
import styled from "styled-components";
import ImgItem from "./ImgItem";
import ItemTypes from "../helpers/Constants";
import { createContext } from "react";

const PinPlane = styled.div``;

const Plane = (props) => {
  const [planeHeight, setplaneHeight] = useState(100);
  const [planeWidth, setplaneWidth] = useState(100);

  const manageItems = (state, action) => {
    // const uniqueid = require("uniqid");
    switch (action.type) {
      case "updatePosition":
        state.forEach((element) => {
          if (element.id == action.payload) {
            element.img = action.updatedPosition;
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
      img: [500, 100],
    },
    {
      id: 2,
      img: [300, 200],
    },
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
          monitor.getClientOffset().y,
        ],
      });
      // console.log(state);
    },
    hover: (item, monitor) => {
      console.log(monitor.getClientOffset());
      if (monitor.getSourceClientOffset().x >= planeWidth - 250) {
        setplaneWidth(planeWidth + 5);
        // console.log("width:  " + planeWidth);
      } else if (monitor.getSourceClientOffset().y >= planeHeight - 250) {
        setplaneHeight(planeHeight + 5);
        //console.log("Height:  " + planeHeight);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      getSize: monitor.getClientOffset(),
    }),
  });

  const styles = {
    width: `${planeWidth}vh`,
    height: `${planeHeight}vh`,
    position: "relative",
    border: "1px dotted black",
  };
  return (
    <PinPlane ref={drop} style={styles} scrolling="auto">
      <ImgItem position={state[0]} />
      <ImgItem position={state[1]} />
    </PinPlane>
  );
};

export default Plane;
