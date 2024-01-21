import React from 'react';

const NextButton = ({dispatch, answer, index, numQuestions}) => {
    if (answer === null) return null

    if (index < numQuestions - 1)
        return (
            <button onClick={() => dispatch({type: 'nextQuestion'})} className={'btn btn-ui'}>Next</button>
        );

    return <button onClick={() => dispatch({type: 'finish'})} className={'btn btn-ui'}>Finish</button>
};

export default NextButton;
