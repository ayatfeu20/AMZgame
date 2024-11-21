// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PuzzleGame from "./pages/PuzzleGame/PuzzleGame";
import ChessGame from "./pages/ChessGame/ChessGame";
import CrosswordGame from "./pages/CrosswordGame/CrosswordGame";


const App = () => (

  <div className="app">
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/puzzle" element={<PuzzleGame />} />
      <Route path="/chess" element={<ChessGame />} />
      <Route path="/crossword" element={<CrosswordGame />} />
    </Routes>
  </Router>
  
  </div>
);


export default App;
