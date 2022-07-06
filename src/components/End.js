import React from 'react'
import "./End.css"

function End({tryAgain, quitGame, score}) {
  return (
    <div className="end">
        <h2 className="end__title">Your Score: {score}</h2>
        <button onClick={tryAgain}>Try Again!</button>
        <button onClick={quitGame}>I WANT TO QUIT THE GAME!</button>
    </div>
  )
}

export default End