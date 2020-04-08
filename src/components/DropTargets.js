import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import ItemTypes from "../helpers/Constants";
import $ from "jquery";

const DropTargets = (props) => {
  const [currentMoveItem, setCurrentMoveItem] = useState("");
  const [currentTarget, setcurrentTarget] = useState("");

  const [dropTargetProps, drop] = useDrop({
    accept: ItemTypes.ImgItem,
    target: 1,

    drop: (item, monitor, component) => {
      setCurrentMoveItem(item.id);
    },
  });
  const styles = {
    width: "100px",
    height: "100px",
    // border: "1px solid red",
    float: "left",
  };

  const droped = (ev, target) => {
    ev.preventDefault();

    setcurrentTarget(ev.target.id);
  };

  useEffect(() => {
    if (currentMoveItem != "" && currentTarget != "") {
      $("#" + currentMoveItem).appendTo($("#" + currentTarget));
    }
  }, [currentMoveItem, currentTarget]);

  return (
    <div
      className="targets"
      key={props.datos}
      id={props.datos}
      style={styles}
      ref={drop}
      onDrop={(event) => droped(event, this)}
    ></div>
  );
};

export default DropTargets;
