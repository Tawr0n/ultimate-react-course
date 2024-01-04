import React, {useState} from "react";
import {Item} from "./Item";

export const PackingList = ({items, onDeleteItem, onToggleItem, onClearItems}) => {
    const [sortBy, setSortBy] = useState('input')
    let sortedItems

    switch (sortBy) {
        case 'input':
            sortedItems = items
            break
        case 'description':
            sortedItems = items.toSorted((a, b) => a.description.localeCompare(b.description))
            break
        case 'packed':
            sortedItems = items.toSorted((a, b) => Number(a.packed) - Number(b.packed))
            break
    }

    return (
        <div className="list">
            <ul>
                {sortedItems.map(item => <Item onToggleItem={onToggleItem} onDeleteItem={onDeleteItem} item={item}
                                               key={item.id}/>)}
            </ul>

            <div className="actions">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="input">Sort by input orders</option>
                    <option value="description">Sort by description</option>
                    <option value="packed">Sort by packed status</option>
                </select>
                <button onClick={onClearItems}>Clear list</button>
            </div>
        </div>
    )
}
