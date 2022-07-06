import React from 'react'
import { useState, useRef, useEffect } from "react";
import "./Game.css"

function Game({
    verifyLetter,
    hint,
    letters,
    attempts,
    guessedLetters,
    wrongLetters,
    score
}) {
    const [gameInput, setGameInput] = useState("");
    const gameInputRef = useRef(null);

    const resetField = event => {
        let keyPressed = event.keyCode || event.which;
        if (keyPressed !== 13) {
            setGameInput("");
        }
    }

    const handleChange = event => {
        const result = event.target.value.replace(/[^a-z]/gi, '');
        setGameInput(result);
    }

    const handleSubmit = event => {
        event.preventDefault();
        verifyLetter(gameInput);
        setGameInput("");
        gameInputRef.current.focus();
    }

    useEffect(() => {
        gameInputRef.current.focus();
    }, []);

    return (
        <div className="game">
            <h3 className="game__score">Score: {score}</h3>
            <h2 className="game__hint"><span>{"Hint: " + hint.charAt(0).toUpperCase() + hint.slice(1)}</span></h2>
            <p className="game_attempts">Remaining attempts: {attempts}</p>
            <div className="game__wordContainer">
                {
                    letters.map((letter, i) => (<span key={i}>{
                        guessedLetters.includes(letter) ? letter.toUpperCase() : ""
                    }</span>))
                }
            </div>
            <form className="game__form" onSubmit={handleSubmit}>
                <input type="text" maxLength="1" className="game__input" ref={gameInputRef} value={gameInput} onChange={handleChange} onKeyDown={resetField}/>
                <button className="game__button">Hit me!</button>
            </form>
            <div className="game__wrongLetters">
                <p>Missed letters: {wrongLetters.map((letter, i) => (<span key={i}>{letter.toUpperCase() + (i+1 < wrongLetters.length ? ", " : "")}</span>))}</p>
            </div>
        </div>
    )
}

export default Game