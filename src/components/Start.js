import React from 'react'
import "./Start.css"

function Start({startGame}) {
  return (
    <div className="start">
        <h2 className="start__title">Secret Word!</h2>
        <p className="start__text">Could you guess the secret word?<br></br> Press the button below to start and good luck!</p>
        <button className="start__button" onClick={startGame}>Start!</button>
    </div>
  )
}

export default Start