import React from 'react';
import {useQuiz} from "../contexts/QuizContext";

const NextButton = () => {
    const {dispatch, answer, index,numQuestions} = useQuiz()
    if (answer === null) return null

    if (index < numQuestions - 1)
        return (
            <button onClick={() => dispatch({type: 'nextQuestion'})} className={'btn btn-ui'}>Next</button>
        );

    return <button onClick={() => dispatch({type: 'finish'})} className={'btn btn-ui'}>Finish</button>
};

export default NextButton;
