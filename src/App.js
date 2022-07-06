// css
import './App.css';

// react
import { useState, useEffect, useCallback } from 'react';

// data
import {wordlist} from "./data/words";

// components
import Start from "./components/Start";
import Game from "./components/Game";
import End from "./components/End";

const stages = [
    {id: 1, name: "start"},
    {id: 2, name: "game"},
    {id: 3, name: "end"},
]

function App() {
    const [gameStage, setGameStage] = useState(stages[0].name);
    const [words] = useState(wordlist);
    const [score, setScore] = useState(0);
    const [hint, setHint] = useState("");
    const [letters, setLetters] = useState([]);
    const [attempts, setAttempts] = useState(5);
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [wrongLetters, setWrongLetters] = useState([]);

    // Set new word and category to guess
    const setGame = useCallback(() => {
        const categories = Object.keys(words);
        const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];
        const word = words[category][Math.floor(Math.random() * words[category].length)];
        const wordLetters = word.toLowerCase().split("");

        setHint(category);
        setLetters(wordLetters);
        setGuessedLetters([]);
        setWrongLetters([]);
    }, [words])

    // Reset guesses and score
    const resetGame = () => {
        setGuessedLetters([]);
        setWrongLetters([]);
        setAttempts(5);
        setScore(0);
    }

    // Starts the game
    const startGame = () => {
        resetGame();
        setGame();
        setGameStage(stages[1].name);
    }

    // Quit the game
    const quitGame = () => {
        resetGame();
        setGameStage(stages[0].name);
    }

    // Verify letter
    const verifyLetter = (letter) => {
        // If letter was not guessed yet
        if(!guessedLetters.includes(letter) && !wrongLetters.includes(letter)){
            if(letters.includes(letter)){
                // If the guess is right
                setGuessedLetters([...guessedLetters, letter]);
                setScore(score+25);
            }else{
                // If the guess is wrong
                setWrongLetters([...wrongLetters, letter]);
                setAttempts(attempts-1);
            }
        }
    }

    // Control the attempts
    useEffect(() => {
        if(attempts <= 0){
            setGameStage(stages[2].name);
        }
    }, [attempts])

    // Control win condition
    useEffect(() => {
        const uniqueLetters = [...new Set(letters)];
        if(uniqueLetters.length === guessedLetters.length){
            setScore(score+100);
            setGame();
        }
    }, [guessedLetters, letters, score, setGame])

    return (
        <div className="App">
            <div className="App__container">
                {gameStage === "start" && <Start startGame={startGame}/>}
                {gameStage === "game" && (
                    <Game
                        verifyLetter={verifyLetter}
                        hint={hint}
                        letters={letters}
                        attempts={attempts}
                        guessedLetters={guessedLetters}
                        wrongLetters={wrongLetters}
                        score={score}
                    />
                )}
                {gameStage === "end" && <End tryAgain={startGame} quitGame={quitGame} score={score}/>}
            </div>
        </div>
    );
}

export default App;
