import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";


const App: React.FC = () => {
  return (
    <div className="min-h-screen min-w-screen bg-gray-100 APP">
      <Routes>
        <Route path="/" element={<Home />} />

      </Routes>
    </div>
  );
};

export default App;
