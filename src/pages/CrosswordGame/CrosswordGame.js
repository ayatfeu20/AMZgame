import React, { useEffect, useState, useRef } from "react";
import Crossword from "@jaredreisinger/react-crossword";
import { useLocation, Link } from "react-router-dom";
import Swal from "sweetalert2";
import Confetti from "react-confetti";
import { TiArrowBack } from "react-icons/ti";
import "./CrosswordGame.css";

// Predefined pool of words and clues
const wordCluesPool = [
  
    { word: "sun", clue: "The star that provides light to Earth" },
    { word: "cat", clue: "A small furry animal that purrs" },
    { word: "dog", clue: "A loyal animal, often kept as a pet" },
    { word: "bat", clue: "A flying mammal" },
    { word: "ant", clue: "A small insect that lives in colonies" },
    { word: "bee", clue: "An insect that produces honey" },
    { word: "cow", clue: "A farm animal that gives milk" },
    { word: "owl", clue: "A bird that is active at night" },
    { word: "egg", clue: "Laid by birds, reptiles, and insects" },
    { word: "sky", clue: "Seen above during the day or night" },
      { word: "book", clue: "A collection of written pages" },
      { word: "fish", clue: "An animal that swims in water" },
      { word: "tree", clue: "A tall plant with leaves and a trunk" },
      { word: "rain", clue: "Water falling from clouds" },
      { word: "lamp", clue: "A device used for lighting" },
      { word: "star", clue: "A celestial body that shines at night" },
      { word: "home", clue: "A place where people live" },
      { word: "bike", clue: "A two-wheeled vehicle" },
      { word: "ship", clue: "A large boat" },
      { word: "ball", clue: "A round object used in games" },
        { word: "apple", clue: "A fruit that keeps the doctor away" },
        { word: "chair", clue: "A piece of furniture for sitting" },
        { word: "beach", clue: "A sandy area by the sea" },
        { word: "knife", clue: "A tool with a sharp edge" },
        { word: "glass", clue: "A material used for windows" },
        { word: "plant", clue: "A living organism that grows in soil" },
        { word: "bread", clue: "A staple food made from flour" },
        { word: "cloud", clue: "A mass of water vapor in the sky" },
        { word: "stone", clue: "A hard, solid material found on Earth" },
        { word: "ocean", clue: "A large body of salt water" },
          { word: "banana", clue: "A yellow fruit" },
          { word: "circle", clue: "A round shape with no corners" },
          { word: "window", clue: "An opening in a wall with glass" },
          { word: "bridge", clue: "A structure that spans a gap" },
          { word: "forest", clue: "A large area with trees" },
          { word: "school", clue: "A place for learning" },
          { word: "orange", clue: "A citrus fruit and a color" },
          { word: "silver", clue: "A shiny, precious metal" },
          { word: "bottle", clue: "A container for liquids" },
          { word: "rocket", clue: "A vehicle for space travel" },
            { word: "picture", clue: "A visual representation" },
            { word: "blanket", clue: "Used for warmth during sleep" },
            { word: "fireman", clue: "A person who fights fires" },
            { word: "balloon", clue: "A rubber object filled with air" },
            { word: "diamond", clue: "A valuable, shiny gemstone" },
            { word: "cabinet", clue: "A piece of furniture for storage" },
            { word: "sunrise", clue: "When the sun appears in the morning" },
            { word: "airport", clue: "Where airplanes land and take off" },
            { word: "battery", clue: "A device that stores energy" },
            { word: "journey", clue: "A long trip" },
              { word: "elephant", clue: "A large animal with a trunk" },
              { word: "notebook", clue: "A book for writing notes" },
              { word: "computer", clue: "A device for processing information" },
              { word: "umbrella", clue: "Used to protect against rain" },
              { word: "treasure", clue: "Valuable items hidden or buried" },
              { word: "sandwich", clue: "Two slices of bread with filling" },
              { word: "children", clue: "Young human beings" },
              { word: "festival", clue: "A celebration or event" },
              { word: "dinosaur", clue: "An extinct reptile" },
              { word: "firework", clue: "Explosive used for celebrations" },
                { word: "pineapple", clue: "A tropical fruit with spiky skin" },
                { word: "waterfall", clue: "Water flowing over a steep drop" },
                { word: "adventure", clue: "An exciting or risky experience" },
                { word: "fireplace", clue: "A place for a fire indoors" },
                { word: "spaceship", clue: "A vehicle for traveling in space" },
                { word: "blueberry", clue: "A small blue fruit" },
                { word: "breakfast", clue: "The first meal of the day" },
                { word: "landscape", clue: "A view of natural scenery" },
                { word: "paperclip", clue: "A tool for holding papers together" },
                { word: "horseback", clue: "Riding on a horse" },
                { word: "spongebob", clue: "Yellow square catroon" },
                { word: "newspaper", clue: "Can find the news in it" },
                { word: "water", clue: "We must be always drink it" },
                { word: "orange", clue: "The color of orange" },
                { word: "yellow", clue: "The color of banana" },
                { word: "a", clue: "The first letter in English" },
                { word: "z", clue: "The last letter in English" },
                { word: "hon", clue: "She in Swedish language" },
                { word: "han", clue: "He in Swedish language" },
                { word: "vi", clue: "We in Swedish language" },
                { word: "de", clue: "They in Swedish language" },
                { word: "eagle", clue: "A bird of prey with sharp talons"},
                { word: "tiger", clue:" A large cat with orange and black stripes"},
                { word: "shark", clue:" A powerful predator of the ocean"},
                { word: "zebra", clue:" A striped animal found in Africa"},
                { word :"camel", clue:" A desert animal with humps"},
                { word: "rabbit", clue: " A small animal with long ears"},
                { word: "penguin", clue: " A flightless bird that lives in cold regions"},
                { word: "mountain" , clue:" A high landform that rises above the surrounding terrain"},
                { word: "desert", clue:" A dry, sandy region with little rainfall"},
                { word: "river" , clue: " A natural flowing watercourse"},
                { word: "volcano" , clue:" A mountain that erupts with lava"},
                { word: "island" , clue:" Land surrounded by water"},
                { word: "forest", clue: " A large area covered with trees"},
                { word: "ocean", clue: " A vast body of saltwater"},
                { word: "red" , clue: " The color of strawberries"},
                { word: "green", clue: " The color of grass"},
                { word: "blue", clue: " The color of the sky on a clear day"},
                { word: "purple", clue: " The color of some flowers and grapes"},
                { word: "black", clue:" The absence of light or color"},
                { word: "white", clue: " The color of snow"},
                { word: "pencil", clue:" A tool for writing or drawing"},
                { word: "mirror", clue: " Reflects your image"},
                { word: "clock", clue: " Tells the time"},
                { word: "guitar", clue: " A stringed musical instrument"},
                { word: "umbrella", clue: " Protects you from rain"},
                { word: "camera", clue: " Captures photos"},
                { word: "helmet", clue: " Protects your head"},
                { word: "pizza" , clue: " A popular Italian dish with cheese and toppings"},
                { word: "salad", clue: " A mix of vegetables or fruits"},
                { word: "burger", clue: " A sandwich with a patty, often made of beef"},
                { word: "cheese", clue: " A dairy product made from milk"},
                { word: "cereal", clue: " A common breakfast food"},
                { word: "chocolate", clue: " A sweet treat made from cocoa"},
                { word: "city", clue: " A large urban area with many people"},
                { word: "city", clue: " A large urban area with many people"},
                { word: "castle", clue: " A large building where kings and queens lived"},
                { word: "library", clue: " A place to borrow books"},
                { word: "school", clue: " A place where people learn"},
                { word: "park", clue: " A public area with trees and grass"},
                { word: "jump", clue: " To leap into the air"},
                { word: "dance", clue:" To move rhythmically to music"},
                { word: "read", clue: " To look at written words and understand them"},
                { word: "write", clue: " To create words or symbols on paper"},
                { word: "run", clue:" To move quickly on foot"},
                { word: "sing", clue: " To produce musical sounds with your voice"},
                { word: "laptop", clue: " A portable computer"},
                { word: "tablet", clue: " A flat, portable touchscreen computer"},
                { word: "router", clue: " Connects devices to the internet"},
                { word: "keyboard", clue: " Used to type on a computer"},
                { word: "smartphone", clue: " A mobile device with many functions"},
                { word: "drone", clue:" A flying machine controlled remotely"},
                
                          
            
            
                  
             
      
    
    
  
];

function generateCrosswordData() {
  const gridSize = 10; // Define grid size
  const data = { across: {}, down: {} };
  const usedPositions = new Set();

  // Helper to get random subset from the word pool
  function getRandomWords(pool, count) {
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // Randomly pick words for across and down
  const selectedWords = getRandomWords(wordCluesPool, 30); // 15 across + 15 down
  const acrossWords = selectedWords.slice(0, 15);
  const downWords = selectedWords.slice(15);

  let clueNumber = 1;

  // Function to place words in the grid
  function placeWords(words, direction) {
    words.forEach(({ word, clue }) => {
      const maxStart = gridSize - word.length;
      let row, col;
      let attempts = 0;

      do {
        row = Math.floor(Math.random() * (direction === "across" ? gridSize : maxStart));
        col = Math.floor(Math.random() * (direction === "down" ? gridSize : maxStart));
        attempts++;
      } while (
        attempts < 50 &&
        word.split("").some((_, i) =>
          direction === "across"
            ? usedPositions.has(`${row},${col + i}`)
            : usedPositions.has(`${row + i},${col}`)
        )
      );

      if (attempts === 50) {
        return; // Skip this word if placement fails
      }

      word.split("").forEach((_, i) => {
        const position = direction === "across" ? `${row},${col + i}` : `${row + i},${col}`;
        usedPositions.add(position);
      });

      // Add word to the crossword data
      data[direction][clueNumber] = { clue, answer: word.toUpperCase(), row, col };
      clueNumber++;
    });
  }

  placeWords(acrossWords, "across");
  placeWords(downWords, "down");

  return data;
}


const CrosswordGame = () => {
  const [crosswordData, setCrosswordData] = useState(generateCrosswordData());
  const [userAnswers, setUserAnswers] = useState({}); // Track user inputs
  const [key, setKey] = useState(0); // Force remount
  const [isComplete, setIsComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const location = useLocation();
  const userName = location?.state?.name || "Player";
  const winningSound = new Audio('/winfantasia-6912.mp3');

  useEffect(() => {
    localStorage.clear(); // Clear crossword state on load
  }, []);

  const resetGame = () => {
    setIsComplete(false);
    setShowConfetti(false);
    setUserAnswers({});
    setCrosswordData(generateCrosswordData());
    setKey((prevKey) => prevKey + 1); // Force remount
  };

  const handleAnswerChange = (direction, number, correct, answer) => {
    // Track user input in a structured object
    setUserAnswers((prev) => ({
      ...prev,
      [`${direction}-${number}`]: { correct, answer: answer.toUpperCase() },
    }));
  };

  const handleComplete = () => {
    const allAnswersCorrect = Object.keys(crosswordData).every((dir) => {
      const dirData = crosswordData[dir];
      return Object.keys(dirData).every((key) => {
        const correctAnswer = dirData[key].answer;
        const userAnswer = userAnswers[`${dir}-${key}`]?.answer;
        return correctAnswer === userAnswer;
      });
    });

    if (allAnswersCorrect) {
      if (!isComplete) {
        setIsComplete(true);
        setShowConfetti(true);
        winningSound.play();

        Swal.fire({
          title: "Congratulations! 🎉",
          text: "You solved the crossword!",
          icon: "success",
          confirmButtonText: "Play Again",
        }).then((result) => {
          if (result.isConfirmed) {
            resetGame();
          }
        });

        setTimeout(() => {
          setShowConfetti(false);
        }, 8000);
      }
    } else {
      Swal.fire({
        title: "Not Yet!",
        text: "Some answers are incorrect. Keep trying!",
        icon: "error",
        confirmButtonText: "Continue",
      });
    }
  };

  return (
    <div className="crossword-game">
      {showConfetti && <Confetti />}
      <div className="header">
        <Link to="/" className="back-icon">
          <TiArrowBack size={40} color="#112A46" />
        </Link>
        <h1 className="welcome-text">Welcome to Crossword, {userName}!</h1>
      </div>
      <div className="button-container">
        <button className="newgame-btn" onClick={resetGame}>
          New Game
        </button>
      </div>
      <div className="crossword-container">
        <Crossword
          key={key}
          data={crosswordData}
          onAnswerChange={handleAnswerChange}
          onCrosswordComplete={handleComplete}
        />
      </div>
    </div>
  );
};

export default CrosswordGame;