import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Footer from "../components/Footer"
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

  const lionSound = new Audio('/lion.mp3');

  const handleEnter = () => {
    if (name && selectedGame) {
      lionSound.play();
      setTimeout(() => {
        lionSound.pause();
      }, 3000); // 3 minutes
  
      setLoading(true); // Show the loading animation
      setTimeout(() => {
        navigate(`/${selectedGame}`, { state: { name } });
        setLoading(false); // Hide the loading animation after navigation
      }, 3000); // Simulate loading delay
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

  const handleMove = (event) => {
    const lion = lionRef.current;
    if (!lion) return;

    const eyes = lion.querySelectorAll(".eye");

    // Get mouse or touch coordinates
    const clientX = event.touches?.[0]?.clientX || event.clientX;
    const clientY = event.touches?.[0]?.clientY || event.clientY;

    const rect = lion.getBoundingClientRect();
    const x = clientX - rect.left - rect.width / 2;
    const y = clientY - rect.top - rect.height / 2;

    eyes.forEach((eye) => {
      eye.style.transform = `translate(${x / 15}px, ${y / 15}px)`;
    });
  };

  const handleLeave = () => {
    const eyes = lionRef.current?.querySelectorAll(".eye");
    eyes?.forEach((eye) => {
      eye.style.transform = "translate(0, 0)";
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
          <button className="border  rounded ">
            <img
              src={puzzleIcon}
              alt="Puzzle"
              className={`game-icon ${selectedGame === "puzzle" ? "selected" : ""} bg-danger`}
              onClick={() => setSelectedGame("puzzle")}
            />
          </button>
          <button className="border  rounded">
            <img
              src={chessIcon}
              alt="Chess"
              className={`game-icon ${selectedGame === "chess" ? "selected" : ""} bg-warning`}
              onClick={() => setSelectedGame("chess")}
            />
          </button>
          <button className="border  rounded ">
            <img
              src={crosswordIcon}
              alt="Crossword"
              className={`game-icon ${selectedGame === "crossword" ? "selected" : ""} bg-success`}
              onClick={() => setSelectedGame("crossword")}
            />
          </button>
        </div>

        <button
          className="lion-btn"
          onMouseMove={handleMove}
          onTouchMove={handleMove} // Add touch support
          onMouseLeave={handleLeave}
          onTouchEnd={handleLeave} // Add touch support
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
     <Footer/>
    </div>
  );
};

export default HomePage;
