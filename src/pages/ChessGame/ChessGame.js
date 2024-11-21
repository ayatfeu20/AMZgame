import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { useLocation } from "react-router-dom";
import Swal from 'sweetalert2'; 
import Confetti from 'react-confetti';
import { TiArrowBack } from "react-icons/ti";
import './ChessGame.css';

const ChessGame = () => {
  const [game, setGame] = useState(new Chess());
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [playerTime, setPlayerTime] = useState(300); // 5-minute timer for player
  const [aiTime, setAiTime] = useState(300); // 5-minute timer for AI
  const [capturedPieces, setCapturedPieces] = useState({ white: [], black: [] });
  const [highlightedSquares, setHighlightedSquares] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const winningSound = new Audio('/winfantasia-6912.mp3');

  const location = useLocation();
  const userName = location?.state?.name;

  useEffect(() => {
    let timer;
    if (isPlayerTurn && playerTime > 0) {
      timer = setInterval(() => setPlayerTime(playerTime - 1), 1000);
    } else if (!isPlayerTurn && aiTime > 0) {
      timer = setInterval(() => setAiTime(aiTime - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isPlayerTurn, playerTime, aiTime]);

  // Format time as mm:ss
  const formatTime = (time) => `${Math.floor(time / 60)}:${time % 60}`.padStart(5, '0');

  // Highlight possible moves when a piece is selected
  const handlePieceClick = (square) => {
    const moves = game.moves({ square, verbose: true });
    const squares = moves.map(move => move.to);
    setHighlightedSquares(squares);
  };

  const handleMove = (fromSquare, toSquare) => {
    if (!isPlayerTurn) return false;

    const move = game.move({
      from: fromSquare,
      to: toSquare,
      promotion: toSquare[1] === '8' || toSquare[1] === '1' ? 'q' : undefined,
    });

    if (move) {
      if (move.captured) {
        const updatedCapturedPieces = { ...capturedPieces };
        updatedCapturedPieces[move.color === 'w' ? 'black' : 'white'].push(move.captured);
        setCapturedPieces(updatedCapturedPieces);
      }
      setGame(new Chess(game.fen()));
      setIsPlayerTurn(false);
      setHighlightedSquares([]);
      setTimeout(makeAiMove, 500);
      return true;
    } else {

      // Show warning for invalid move
      Swal.fire({
        title: 'Invalid Move!',
        text: 'Please try again.',
        icon: 'warning',
        confirmButtonText: 'OK'
        
      });
       return false;
    }
  };

  const makeAiMove = () => {
    if (game.isGameOver()) return handleGameOver();

    const moves = game.moves();
    const randomMove = moves[Math.floor(Math.random() * moves.length)];
    const move = game.move(randomMove);

    if (move && move.captured) {
      const updatedCapturedPieces = { ...capturedPieces };
      updatedCapturedPieces[move.color === 'w' ? 'black' : 'white'].push(move.captured);
      setCapturedPieces(updatedCapturedPieces);
    }

    setGame(new Chess(game.fen()));
    setIsPlayerTurn(true);
  };

  const handleGameOver = () => {
    setShowConfetti(true);
    winningSound.play();
    
    let message = game.isCheckmate()
      ? `${userName} wins!   Congratulations! 🎉`
      : "It's a draw!";
    Swal.fire({
      title: 'Game Over',
      text: message,
      icon: 'success',
      confirmButtonText: 'Play Again',
      
    }).then(() => restartGame());
  };

  const restartGame = () => {
    const newGame = new Chess();
    setGame(newGame);
    setIsPlayerTurn(true);
    setPlayerTime(300);
    setAiTime(300);
    setCapturedPieces({ white: [], black: [] });
    setHighlightedSquares([]);
    setShowConfetti(false);
  };

  return (
    <div className="chess-game">
      <div className='header'>
       <a href='./' className="back-icon1">
          <TiArrowBack size={40} color='#112A46' />
        </a>
      <h2 className='welcome-text'>Welcome to AZMChess, {userName}!</h2>
      </div>
      <div className="chess-container">
        
        <div className="side-panel">
        <div className='bottom-section'>
        <div className="timer ">
            <p>{userName} Time: {formatTime(playerTime)}</p>
            <p>AI Time: {formatTime(aiTime)}</p>
          </div>
          <div className="captured-pieces">
            <h6>Captured by {userName}:</h6>
            {capturedPieces.black.map((piece, index) => (
              <span key={index} className={`piece-icon piece-${piece}`}></span>
            ))}
            <h6>Captured by AI:</h6>
            {capturedPieces.white.map((piece, index) => (
              <span key={index} className={`piece-icon piece-${piece}`}></span>
            ))}
          </div>
          <button onClick={restartGame} className="restart-btn">Restart Game</button>
          </div>
        </div>
        <div className='top-section'>
        <div className="turn-indicator">
        <p>{isPlayerTurn ? `${userName}'s Turn` : "AI's Turn"}</p>
        </div>
       
        <div className="chessboard-container">
          {showConfetti && <Confetti />}
          <Chessboard
  position={game.fen()}
  onPieceDrop={handleMove}
  onPieceClick={handlePieceClick}
  arePiecesDraggable={isPlayerTurn}
  customSquareStyles={{
    ...highlightedSquares.reduce((a, square) => ({
      ...a,
      [square]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' }
    }), {}),
    ...Array.from(Array(64)).reduce((a, _, i) => {
      const square = `${String.fromCharCode(97 + (i % 8))}${8 - Math.floor(i / 8)}`;
      return {
        ...a,
        [square]: {
          backgroundColor: (i + Math.floor(i / 8)) % 2 === 0 ? 'rgb(177,228,185)' : 'rgb(112,162,163)', // Light and dark square colors
        },
      };
    }, {})
  }}
  boardWidth={window.innerWidth < 768 ? 300 : window.innerWidth < 1025 ? 600 : 500} // Set board size for iPad
/>


        </div>
        </div>
      </div>
    </div>
  );
};

export default ChessGame;
