import React, {useState} from 'react';
import {Logo} from "./Logo";
import {Form} from "./Form";
import {PackingList} from "./PackingList";
import {Stats} from "./Stats";

/*const initialItems = [
    {id: 1, description: "Passports", quantity: 2, packed: false},
    {id: 2, description: "Socks", quantity: 12, packed: true},
];*/

const App = () => {
    const [items, setItems] = useState([])

    const handleAddItem = (item) => {
        setItems(items => [...items, item])
    }
    const handleDeleteItem = (id) => {
        setItems(items => items.filter(item => item.id !== id))
    }

    const handleToggleItem = (id) => {
        setItems(items => items.map(item => {
            return item.id === id ? {...item, packed: !item.packed} : item
        }))
    }

    const handleClearItems = () => {
        const confirmed = window.confirm('Are you sure you want to delete all items?')
        if (confirmed) setItems([])
    }

    return (
        <div className={'app'}>
            <Logo/>
            <Form onAddItem={handleAddItem}/>
            <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem}
                         onClearItems={handleClearItems}/>
            <Stats items={items}/>
        </div>
    );
};


export default App;
