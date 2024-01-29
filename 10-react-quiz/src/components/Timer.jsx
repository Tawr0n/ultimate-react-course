import React, {useEffect} from 'react';
import {useQuiz} from "../contexts/QuizContext";

const Timer = () => {
    const {secondsRemaining, dispatch} = useQuiz()
    const minutes = Math.floor(secondsRemaining / 60)
    const seconds = secondsRemaining % 60

    useEffect(() => {
        const id = setInterval(() => {
            dispatch({type: 'tick'})
        }, 1000)

        return () => clearInterval(id)
    }, [dispatch]);

    return (
        <div className={'timer'}>
            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </div>
    );
};

export default Timer;
