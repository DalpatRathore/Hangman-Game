import React, { useState, useEffect } from "react";

import "./App.css";
import Figure from "./components/Figure";
import Header from "./components/Header";
import Notification from "./components/Notification";
import Popup from "./components/Popup";
import Word from "./components/Word";
import WrongLetters from "./components/WrongLetters";
import { showNotification as show } from "./Helper";

const words = ["application", "programming", "interface", "wizard"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setcorrectLetters] = useState([]);
  const [wrongLetters, setwrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setcorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setwrongLetters(wrongLetters => [...wrongLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);
    setcorrectLetters([]);
    setwrongLetters([]);
    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }

  return (
    <>
      <Header></Header>
      <div className="game-container">
        <Figure wrongLetters={wrongLetters}></Figure>
        <WrongLetters wrongLetters={wrongLetters}></WrongLetters>
        <Word
          selectedWord={selectedWord}
          correctLetters={correctLetters}
        ></Word>
      </div>
      <Popup
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        selectedWord={selectedWord}
        setPlayable={setPlayable}
        playAgain={playAgain}
      ></Popup>
      <Notification showNotification={showNotification}></Notification>
    </>
  );
}

export default App;
