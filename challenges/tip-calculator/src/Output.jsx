import React from 'react';

const Output = ({bill, tip}) => {
    const sum = bill + tip
    return (
        <h3>You pay ${sum} (${bill} + ${tip} tip)</h3>
    );
};

export default Output;
