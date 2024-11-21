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
  const [isSolved, setIsSolved] = useState(false);
  const [gridSize, setGridSize] = useState({ rows: 3, columns: 3 }); // Default to Easy

  const location = useLocation();
  const userName = location?.state?.name;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
      setIsSolved(false); // Reset puzzle state
    }
  };

  const MySwal = withReactContent(Swal);
  
  const handleSolved = () => {
    setIsSolved(true);

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

  // Set the grid size based on difficulty selection
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

      {/* Image Upload Section with Label */}
      <div className="upload-section">
        <p className="upload-label">
          Please upload an image to start the puzzle:</p>
          <input type="file" onChange={handleFileChange} />
        
      </div>

      {/* Difficulty Selection Buttons */}
      <div className="difficulty-buttons">
        <button onClick={() => handleDifficulty('easy')} className="btn easy-btn">Easy (3x3)</button>
        <button onClick={() => handleDifficulty('medium')} className="btn medium-btn">Medium (5x5)</button>
        <button onClick={() => handleDifficulty('hard')} className="btn hard-btn">Hard (6x6)</button>
      </div>

      {/* Display Uploaded Image and Puzzle */}
      {uploadedImage ? (
        <div className="puzzle-container">
          <div className="original-image">
            <img src={uploadedImage} alt="Uploaded" />
          </div>
        
          <div className="puzzle-board">
            <JigsawPuzzle
              imageSrc={uploadedImage}
              rows={gridSize.rows}
              columns={gridSize.columns}
              onSolved={handleSolved}
            />
          </div>
        </div>
      ) : (
        <p></p>
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
