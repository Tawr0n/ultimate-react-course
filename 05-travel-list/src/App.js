import React, {useState} from 'react';

const initialItems = [
    {id: 1, description: "Passports", quantity: 2, packed: false},
    {id: 2, description: "Socks", quantity: 12, packed: true},
];
const Logo = () => {
    return (
        <h1>🏝️ Far Away 🧳</h1>
    )
}
const Form = () => {
    const [description, setDescription] = useState('')
    const [quantity, setQuantity] = useState(1)
    const handleSubmit = (e) => {
        e.preventDefault()

        if (!description.trim()) return
        const newItem = {description: description.trim(), quantity, packed: false, id: Date.now()}
        console.log(newItem)

        setDescription('')
        setQuantity(1)
    }

    return (
        <form onSubmit={handleSubmit} className={'add-form'}>
            <h3>What do you need for your 😍 trip?</h3>
            <select onChange={(e) => setQuantity(+e.target.value)} value={quantity}>
                {Array.from({length: 20}, (_, i) => i + 1)
                    .map(num => <option value={num} key={num}>{num}</option>)}
            </select>
            <input onChange={(e) => setDescription(e.target.value)}
                   value={description} type="text" placeholder={'Item...'}/>
            <button>Add</button>
        </form>
    )
}
const PackingList = () => {
    return (
        <div className="list">
            <ul>
                {initialItems.map(item => <Item item={item} key={item.id}/>)}
            </ul>
        </div>
    )
}

const Item = ({item}) => {
    return (
        <li>
            <span style={item.packed ? {textDecoration: 'line-through'} : {}}>{item.quantity} {item.description}</span>
            <button>❌</button>
        </li>
    )
}
const Stats = () => {
    return (
        <footer className={'stats'}>
            <em>💼 You have 6 items on your list, and you already packed 0 (0%)</em>
        </footer>
    )
}
const App = () => {
    return (
        <div className={'app'}>
            <Logo/>
            <Form/>
            <PackingList/>
            <Stats/>
        </div>
    );
};


export default App;
