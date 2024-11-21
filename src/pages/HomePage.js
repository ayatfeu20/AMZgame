import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./HomePage.css"; // Import CSS for styling

import puzzleIcon from "./images/puzzleicon.png"; // Add your game icons here
import chessIcon from "./images/chessicon.png";
import crosswordIcon from "./images/crosswordicon.png";
import hippo from "./images/hippo.png";
import loaderGif from "./images/loader.gif"; // Add your loading GIF

const HomePage = () => {
  const [name, setName] = useState("");
  const [selectedGame, setSelectedGame] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const handleEnter = () => {
    if (name && selectedGame) {
      setLoading(true); // Show the loading animation
      setTimeout(() => {
        navigate(`/${selectedGame}`, { state: { name } });
        setLoading(false); // Hide the loading animation after navigation
      }, 1000); // Simulate loading delay
    } else {
      MySwal.fire({
        title: "Attention",
        text: "Please enter your name and select a game!",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  };

  const lionRef = useRef(null);

  const handleMouseMove = (event) => {
    const lion = lionRef.current;
    const eyes = lion.querySelectorAll(".eye");

    const rect = lion.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    eyes.forEach((eye) => {
      eye.style.transform = `translate(${x / 15}px, ${y / 15}px)`;
    });
  };

  const handleMouseLeave = () => {
    const eyes = lionRef.current.querySelectorAll(".eye");
    eyes.forEach((eye) => {
      eye.style.transform = `translate(0, 0)`;
    });
  };

  if (loading) {
    return (
      <div className="loading-screen">
        
        <img src={loaderGif} alt="Loading..." />
        <h1 className="font">AZM game</h1>
      </div>
    );
  }

  return (
    <div className="homepage">
      <div className="animated-background">
        {/* Moving puzzle pieces in the background */}
        <div className="puzzle-piece piece1"></div>
        <div className="puzzle-piece piece2"></div>
        <div className="puzzle-piece piece3"></div>
        <div className="puzzle-piece piece4"></div>
        <div className="puzzle-piece piece5"></div>
        <div className="puzzle-piece piece6"></div>
        <div className="puzzle-piece piece7"></div>
        <div className="puzzle-piece piece8"></div>
        <div className="puzzle-piece piece9"></div>
      </div>

      <div className="name-entry">
        <h2 className="pt-5">Welcome to AZMgame!</h2>
        <h5>Enter your name:</h5>
        <input
          className="border border-primary rounded"
          type="text"
          placeholder="Enter your name"
          id="user-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <h5 className="pt-4">What do you like to play?</h5>
        <div className="game-selection">
          <div className="border border-danger rounded bg-danger">
            <img
              src={puzzleIcon}
              alt="Puzzle"
              className={`game-icon ${selectedGame === "puzzle" ? "selected" : ""}`}
              onClick={() => setSelectedGame("puzzle")}
            />
          </div>
          <div className="border border-warning rounded bg-warning">
            <img
              src={chessIcon}
              alt="Chess"
              className={`game-icon ${selectedGame === "chess" ? "selected" : ""}`}
              onClick={() => setSelectedGame("chess")}
            />
          </div>
          <div className="border border-success rounded bg-success">
            <img
              src={crosswordIcon}
              alt="Crossword"
              className={`game-icon ${selectedGame === "crossword" ? "selected" : ""}`}
              onClick={() => setSelectedGame("crossword")}
            />
          </div>
        </div>

        <button
          className="lion-btn"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          ref={lionRef}
          onClick={handleEnter}
        >
          <img src={hippo} alt="Lion" className="lion-image" />
          <div className="eyes">
            <div className="eye left-eye"></div>
            <div className="eye right-eye"></div>
          </div>
          <div className="mouth-text">Enter</div>
        </button>
      </div>
      <footer className="footer">
        <p>Copyright © AMGame. All rights reserved.</p>
        <p>
          | Made with ❤️ | by{" "}
          <a
            href="https://www.linkedin.com/in/ayatmannaa-800585a0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ayat Mannaa
          </a>
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
