import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import { JigsawPuzzle } from 'react-jigsaw-puzzle/lib';
import 'react-jigsaw-puzzle/lib/jigsaw-puzzle.css';
import Confetti from 'react-confetti';
import { TiArrowBack } from "react-icons/ti";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import './PuzzleGame.css';

const PuzzleGame = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [randomImage, setRandomImage] = useState(null);
  const [useRandomImage, setUseRandomImage] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [gridSize, setGridSize] = useState({ rows: 3, columns: 3 });
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const userName = location?.state?.name;
  const winningSound = new Audio('/winfantasia-6912.mp3');

  const UNSPLASH_API_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
  const UNSPLASH_API_URL = `https://api.unsplash.com/photos/random?query=puzzle&orientation=squarish&client_id=${UNSPLASH_API_KEY}`;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
      setUseRandomImage(false); // Ensure we're using uploaded image
      setIsSolved(false); // Reset puzzle state
    }
  };

  const fetchRandomImage = async () => {
    setLoading(true);
    try {
      const response = await fetch(UNSPLASH_API_URL);
      const data = await response.json();
      setRandomImage(data.urls.regular);
      setUseRandomImage(true);
    } catch (error) {
      console.error("Error fetching random image:", error);
      Swal.fire("Error", "Failed to fetch random image. Try again later.", "error");
    } finally {
      setLoading(false);
    }
  };

  const MySwal = withReactContent(Swal);

  const handleSolved = () => {
    setIsSolved(true);
    winningSound.play();

    MySwal.fire({
      title: "Congratulations! 🎉",
      text: "You solved it!",
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "Play Again",
      cancelButtonText: "Close",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload(); // Reload the page to start again
      }
    });
  };

  const handleDifficulty = (difficulty) => {
    if (difficulty === 'easy') {
      setGridSize({ rows: 3, columns: 3 });
    } else if (difficulty === 'medium') {
      setGridSize({ rows: 5, columns: 5 });
    } else if (difficulty === 'hard') {
      setGridSize({ rows: 6, columns: 6 });
    }
    setIsSolved(false); // Reset puzzle state
  };

  return (
    <div className="puzzle-game container">
      {/* Header with Back Icon and Welcome Text */}
      <div className="header">
        <a href='./' className="back-icon">
          <TiArrowBack size={40} color='#112A46' />
        </a>
        <h2 className='welcome-text'>Welcome to AZMpuzzle, {userName}!</h2>
      </div>

      {/* User Choice Section */}
      <div className="choice-section">
        <button onClick={() => setUseRandomImage(false)} className={`btn ${!useRandomImage ? 'active' : ''}`}>
          Upload Image
        </button>
        <button onClick={fetchRandomImage} className={`btn ${useRandomImage ? 'active' : ''}`}>
          Random Image
        </button>
      </div>

      {/* Image Upload Section */}
      {!useRandomImage && (
        <div className="upload-section">
          <p className="upload-label">Please upload an image to start the puzzle:</p>
          <input type="file" onChange={handleFileChange} />
        </div>
      )}

      {/* Difficulty Selection Buttons */}
      <div className="difficulty-buttons">
        <button onClick={() => handleDifficulty('easy')} className="btn easy-btn">Easy (3x3)</button>
        <button onClick={() => handleDifficulty('medium')} className="btn medium-btn">Medium (5x5)</button>
        <button onClick={() => handleDifficulty('hard')} className="btn hard-btn">Hard (6x6)</button>
      </div>

      {/* Loading State */}
      {loading && <p className="loading-text">Loading random image...</p>}

      {/* Display Image and Puzzle */}
      {((useRandomImage && randomImage) || uploadedImage) && !loading && (
        <div className="puzzle-container">
          <div className="original-image">
            <img src={useRandomImage ? randomImage : uploadedImage} alt="Puzzle Source" />
          </div>

          <div className="puzzle-board">
            <JigsawPuzzle
              imageSrc={useRandomImage ? randomImage : uploadedImage}
              rows={gridSize.rows}
              columns={gridSize.columns}
              onSolved={handleSolved}
            />
          </div>
        </div>
      )}

      {/* Celebration and Try Again Button */}
      {isSolved && (
        <div className="celebration">
          <Confetti />
        </div>
      )}
    </div>
  );
};

export default PuzzleGame;
