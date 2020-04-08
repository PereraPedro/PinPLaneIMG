import React from "react";
import "./App.css";
import Plano from "./components/Plano";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

function App() {
  return (
    <div className="App" scrolling="auto">
      <DndProvider backend={Backend}>
        <Plano />
      </DndProvider>
    </div>
  );
}

export default App;
