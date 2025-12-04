import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import SplitPage from "./components/SplitPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/split" element={<SplitPage />} />
      </Routes>
    </Router>
  );
}

export default App;
