import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Register } from "./pages/Register";


const App: React.FC = () => {
  return (
    <div className="min-h-screen min-w-screen bg-gray-100 APP">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </div>
  );
};

export default App;
