import React from 'react';

const BillInput = ({bill, onSetBill}) => {
    return (
        <div>
            <label>How much was the bill?</label>
            <input value={bill}
                   onChange={(e) => Number.isFinite(+e.target.value) ? onSetBill(+e.target.value) : null}
                   placeholder='Bill value' type="text"/>
        </div>
    );
};

export default BillInput;
