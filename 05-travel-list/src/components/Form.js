import React, {useState} from "react";

export const Form = ({onAddItem}) => {
    const [description, setDescription] = useState('')
    const [quantity, setQuantity] = useState(1)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!description.trim()) return
        const newItem = {description: description.trim(), quantity, packed: false, id: Date.now()}
        onAddItem(newItem)

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
