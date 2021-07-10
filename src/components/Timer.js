import React, { useEffect,useState } from 'react'

const Timer = ({setStop,questionNumber}) => {

    const [timer, setTimer] = useState(30)

    useEffect(()=>{
       const interval= setInterval(() => {
            setTimer(prev=>prev-1)
        }, 1000);

        return ()=>{
            clearInterval(interval)
        }
        // console.log(interval)

    },[])
 useEffect(()=>{
       setTimer(30)
 },[questionNumber])


    if (timer===0) {
        setStop(true)
        
    }
    return (
       timer
    )
}

export default Timer
