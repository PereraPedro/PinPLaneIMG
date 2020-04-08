import React, { useReducer } from "react";

import styled from "styled-components";
import ImgItem from "./ImgItem";
import ItemTypes from "../helpers/Constants";

import DropTargets from "./DropTargets";

import ReactList from "react-list";

const PinPlane = styled.div`
  float: left;
  border: 1px dotted black;
`;

const Plano = (props) => {
  // const [planeHeight, setplaneHeight] = useState(1000);
  // const [rows, setrows] = useState(2);
  // const [planeWidth, setplaneWidth] = useState(1000);
  // const [columns, setcolumns] = useState(2);
  // const [currenTDrop, setcurrenTDrop] = useState(0);

  // const [arrayDivs, setArray] = useState([]);

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
      id: "uno",
    },
    {
      id: "dos",
    },
  ]);

  const renderItem = (index, key) => {
    let currR = "r" + index;

    const renderItemX = (index, key) => {
      let datos = currR + "c" + index;
      return <DropTargets datos={datos} key={index}></DropTargets>;
    };

    return (
      <div id={currR} key={key}>
        <ReactList itemRenderer={renderItemX} length={300} type="uniform" />
      </div>
    );
  };

  return (
    <PinPlane>
      <div
        style={{
          width: 2000,
          height: 1000,
          margin: "0 auto",
          overflow: "auto",
        }}
      >
        <ReactList
          axis="x"
          itemRenderer={renderItem}
          length={100}
          type="uniform"
        />
      </div>
      <ImgItem position={state[0]} />
      <ImgItem position={state[1]} />
    </PinPlane>
  );
};

export default Plano;

// const styles = {
//   border: "1px solid red",
//   float: "left",
// };

// const [dropTargetProps, drop] = useDrop({
//   accept: ItemTypes.ImgItem,

//   hover: (item, monitor) => {
//     if (monitor.getClientOffset().x >= planeWidth - 200) {
//       setplaneWidth(planeWidth + 100);
//       setcolumns(columns + 1);
//       setArray([]);
//     } else if (monitor.getClientOffset().y >= planeHeight - 200) {
//       setplaneHeight(planeHeight + 100);
//       setrows(rows + 1);
//       setArray([]);
//     }
//   },
// });

// const Divs = () => {
//   let dimesion = columns * rows;

//   console.log(dimesion);

//   for (let index = 0; index < dimesion; index++) {
//     arrayDivs.push(<DropTargets datos={index} key={index} />);
//   }
//   return arrayDivs;
// };

// const More = {
//   width: `${planeWidth}px`,
//   height: `${planeHeight}px`,

//   border: "2px dotted black",
// };
