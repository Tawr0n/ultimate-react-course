import React from "react";

export const Stats = ({items}) => {
    if (!items.length) return (
        <footer className={'stats'}>
            <em>Start adding some items to your packing list 🚀</em>
        </footer>
    )

    const numItems = items.length
    const numPacked = items.reduce((acc, item) => {
        return item.packed ? acc + 1 : acc
    }, 0)
    const percentage = Math.round(numPacked * 100 / numItems)

    return (
        <footer className={'stats'}>
            <em>{percentage === 100
                ? 'You got everything! Ready to go ✈️'
                : `💼 You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`}
            </em>
        </footer>
    )
}
