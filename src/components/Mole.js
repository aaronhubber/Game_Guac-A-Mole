import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styled from "styled-components";

const MoleButton = styled.button`
    background-image: url(https://res.cloudinary.com/teepublic/image/private/s--PJ4R--uE--/t_Resized%20Artwork/c_fit,g_north_west,h_1054,w_1054/co_ffffff,e_outline:53/co_ffffff,e_outline:inner_fill:53/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_auto,h_630,q_90,w_630/v1552953112/production/designs/4442328_0.jpg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  /* put the height and width of your image here */
    height: 200px;
    width: 200px;
    border: none;
`



export const POINTS_MULTIPLIER = 0.9
export const TIME_MULTIPLYER = 1.5

export const Mole = ({ onWhack, points, delay, speed }) => {
    const [hit, setHit] = useState(false)
    const movementRef = useRef(null)
    const pointsRef = useRef(points) //useRef here uses the points previously to retain during render
    const buttonRef = useRef(null)
    useEffect(() => {
        gsap.set(buttonRef.current, {
            yPercent: 100,
            display: 'block'
        })
            movementRef.current = gsap.to(buttonRef.current, {
            yPercent: 0,
            duration: speed,
            yoyo: true,
            repeat: -8,
            delay: delay,
            repeatDelay: delay,
        onRepeat: () => {
            pointsRef.current = Math.floor(
            Math.max(pointsRef.current * POINTS_MULTIPLIER)
        )},
        })
        return () => {
            if (movementRef.current) movementRef.current.kill()
        }
    }, [delay, speed])

    useEffect(()=>{
        if (hit) {
            pointsRef.current = points
            movementRef.current.pause()
            gsap.to(buttonRef.current, {
                yPercent: 100,
                duration: 0.1,
                onComplete:() =>{
                    gsap.delayedCall(gsap.utils.random(1,3),()=>{
                        setHit(false)
                        movementRef.current.restart()
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
            <MoleButton
                ref={buttonRef}
                onClick={whack}>
            </MoleButton>
            </div>
        )
    }

    
    
