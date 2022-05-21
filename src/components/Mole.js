import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";


export const MOLE_SCORE = 100
export const POINTS_MULTIPLIER = 0.9
export const TIME_MULTIPLYER = 1.5

export const Mole = ({ onWhack, points, delay, speed, pointsMin = 10 }) => {
    const [hit, setHit] = useState(false)
    const bobRef = useRef(null)
    const pointsRef = useRef(points)
    const buttonRef = useRef(null)
    useEffect(() => {
        gsap.set(buttonRef.current, {
            yPercent: 100,
            display: 'block'
        })
            bobRef.current = gsap.to(buttonRef.current, {
            yPercent: 0,
            duration: speed,
            yoyo: true,
            repeat: -8,
            delay: delay,
            repeatDelay: delay,
        onRepeat: () => {
            pointsRef.current = Math.floor(
            Math.max(pointsRef.current * POINTS_MULTIPLIER, pointsMin)
        )
        },
        })
        return () => {
            if (bobRef.current) bobRef.current.kill()
    }
    }, [pointsMin, delay, speed])

    useEffect(()=>{
        if (hit) {
            pointsRef.current = points
            bobRef.current.pause()
            gsap.to(buttonRef.current, {
                yPercent: 100,
                duration: 0.1,
                onComplete:() =>{
                    gsap.delayedCall(gsap.utils.random(1,3),()=>{
                        setHit(false)
                        bobRef.current.restart()
                    .timeScale(bobRef.current.timeScale()* TIME_MULTIPLYER)
                    })
                },
            })
        }
    }, [hit])

    const whack = ()=>{
        setHit(true)
        onWhack(pointsRef.current)
    }
        return (
            <div className="mole-hole">
            <button
                className="mole"
                ref={buttonRef}
                onClick={whack}
            >Mole
            </button>
            </div>
        )
    }

    
    
