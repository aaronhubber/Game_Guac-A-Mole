import React, {useState} from "react";
import Timer from "../components/Timer";
import { Mole} from "../components/Mole";
import { Score } from "../components/Score";
import { Moles } from "../components/Moles";
import styled from "styled-components";


const Board = styled.div`
    display: flex ;
    font-size: xx-large;
    justify-content: center;
    align-items: baseline;
    gap: 100px
`
const GameButtons = styled.button`
    background-color: #1c6809;
    color: aliceblue;
    padding: 1rem 2rem;
     /* rem = relative to root elemement, root element font size  */
    border-radius: 1rem;
    border: 4px solid aliceblue;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 1.2rem;
`
const ScoreDiv = styled.div`
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-size: xx-large;
`

const TIME_LIMIT = 30000;
const MOLE_SCORE = 100;

const Game = (()=>{
    const [playing, setPlaying] = useState(false)
    const [finished, setFinished] = useState(false)
    const [score, setScore] = useState(0)


    const onWhack = ((points)=> {
        return setScore(score + points)})
    

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
            {!playing && !finished && 
            <>
            <h1> Wanna Play - Guac-a-Mole!</h1> 
            <GameButtons onClick={startGame}>Start Game</GameButtons>
            </>}
        

            {playing && !finished &&
            <>
            <Board>
                <GameButtons onClick={endGame}>End Game</GameButtons>
                <Score value={score}/>
                <Timer time={TIME_LIMIT} onEnd={endGame}/>
            </Board>
            <Moles>
                <Mole onWhack={onWhack} points={MOLE_SCORE} delay={0} speed={1}/>
                <Mole onWhack={onWhack} points={MOLE_SCORE} delay={0} speed={2}/>
                <Mole onWhack={onWhack} points={MOLE_SCORE} delay={0} speed={1.2}/>
                <Mole onWhack={onWhack} points={MOLE_SCORE} delay={0} speed={2.2}/>
                <Mole onWhack={onWhack} points={MOLE_SCORE} delay={0} speed={1.8}/>
                <Mole onWhack={onWhack} points={MOLE_SCORE} delay={0} speed={2}/>
            </Moles>
        </>}
            {finished && !playing &&
        <>
        <ScoreDiv>
            <h1>Guac-A-Mole!</h1>
            <Score value= {score}/>
            <button onClick={startGame}>Play Again</button>
        </ScoreDiv>
        </>
            }
        </>
    )
});

export default Game;