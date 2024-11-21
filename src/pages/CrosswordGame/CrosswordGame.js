import React, { useEffect, useState } from "react";
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

                
                          
            
            
                  
             
      
    
    
  
];

// Function to randomly select words and generate crossword data
function generateCrosswordData() {
  const gridSize = 10;
  const data = { across: {}, down: {} };
  const usedPositions = new Set();

  let clueNumber = 1;

  wordCluesPool.forEach(({ word, clue }) => {
    const direction = Math.random() > 0.5 ? "across" : "down";
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

    // Place the word and store the positions
    word.split("").forEach((_, i) => {
      const position = direction === "across" ? `${row},${col + i}` : `${row + i},${col}`;
      usedPositions.add(position);
    });

    // Add to crossword data
    if (direction === "across") {
      data.across[clueNumber] = { clue, answer: word.toUpperCase(), row, col };
    } else {
      data.down[clueNumber] = { clue, answer: word.toUpperCase(), row, col };
    }
    clueNumber++;
  });

  return data;
}

const CrosswordGame = () => {
  const [crosswordData, setCrosswordData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [key, setKey] = useState(Date.now());
  const location = useLocation();
  const userName = location?.state?.name || "Player";

  const winningSound = new Audio('/winfantasia-6912.mp3');

  useEffect(() => {
    const data = generateCrosswordData();
    setCrosswordData(data);
    setLoading(false);
  }, [key]); // Re-run effect when `key` changes


  const handleComplete = () => {
    if (!isComplete) {
      setIsComplete(true);
      setShowConfetti(true);
      winningSound.play();

      Swal.fire({
        title: "Congratulations!,  🎉",
        text: "You solved the crossword!",
        icon: "success",
        confirmButtonText: "Play Again",
      }).then((result) => {
        if (result.isConfirmed) {
          setKey(Date.now()); // Reset the crossword
          setIsComplete(false);
        }
      });

      setTimeout(() => {
        setShowConfetti(false); // Stop confetti after a few seconds
      }, 8000);
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <h1>Loading Crossword...</h1>
      </div>
    );
  }

  return (
    <div className="crossword-game">
      {showConfetti && <Confetti />}
      <div className="header">
        <Link to="/" className="back-icon" onClick={() => setKey(Date.now())}>
          <TiArrowBack size={40} color="#112A46" />
        </Link>
        <h1 className='welcome-text'>Welcome to Crossword, {userName}!</h1>
      </div>
      <div className="crossword-container">
        <Crossword
          key={key} 
          data={crosswordData}
          onCrosswordComplete={handleComplete}
        />
      </div>
    </div>
  );
};

export default CrosswordGame;
