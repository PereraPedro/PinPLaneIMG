import React from "react";
import { DndProvider } from 'react-dnd';
import Backend from "react-dnd-html5-backend";
import { useDrop } from "react-dnd";
import styled  from 'styled-components';
import ImgItem from './ImgItem';

const PinPlane = styled.div`
    height: 100%;
    width: 100%;
    min-height: 900px;
    min-width: 900px;
`;

const Plane = () => {
    
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.Image,
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  });
    return (
        <PinPlane>

            <ImgItem />
            <ImgItem />

        </PinPlane>
    );
}

export default Plane;