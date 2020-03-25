import React from "react";

import "./App.css";
import Board from "./componets/Board";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

function App() {
  return (
    <div className="App">
      <DndProvider backend={Backend}>
        <Board />
      </DndProvider>
    </div>
  );
}

export default App;
