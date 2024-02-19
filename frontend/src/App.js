// App.js
import React from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesComponent from "./RoutesComponent.js";


function App() {
  
  return (
    <div className="app">
      <BrowserRouter>
        <RoutesComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
