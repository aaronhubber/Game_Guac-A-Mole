import React, {useState} from "react";
import Timer from "../components/Timer";
import { Mole, MOLE_SCORE } from "../components/Mole";
import { Score } from "../components/Score";


const TIME_LIMIT = 30000



const Moles = ({children}) => {
    return <div className="Moles">{children}</div>
}


const Game = (()=>{
    const [playing, setPlaying] = useState(false)
    const [finished, setFinished] = useState(false)
    const [score, setScore] = useState(0)


    const onWhack = points => setScore(score + points)
    

    const endGame = (()=>{
        setPlaying (false)
        setFinished(true)
    })

    const startGame = (()=>{
        setScore (0)
        setPlaying (true)
        setFinished(false)
    })
    return(
        <>
            {!playing && 
            !finished && 
        <>
            <h1>Whac-a-Mole</h1> 
            <button onClick={startGame}>Start Game</button>
            </>}
            {playing && 
        <>
            <button onClick={endGame}>End Game</button>
            <Score value={score}/>
            <Timer time={TIME_LIMIT} onEnd={endGame}/>
            <Moles>
                <Mole onWhack={onWhack} points={MOLE_SCORE} delay={0} speed={1}/>
                <Mole onWhack={onWhack} points={MOLE_SCORE} delay={0} speed={2}/>
                <Mole onWhack={onWhack} points={MOLE_SCORE} delay={0} speed={1.2}/>
                <Mole onWhack={onWhack} points={MOLE_SCORE} delay={0} speed={2.2}/>
                <Mole onWhack={onWhack} points={MOLE_SCORE} delay={0} speed={1.8}/>
                <Mole onWhack={onWhack} points={MOLE_SCORE} delay={0} speed={2}/>

            </Moles>
        </>
            }
            { finished &&
        <>
            <Score value= {score}/>
            <button onClick={startGame}>Play Again</button>
        </>
            }
        </>
    )
})

export default Game