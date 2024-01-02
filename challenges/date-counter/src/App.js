import './App.css';
import {useState} from "react";

///////////////////////////////////////////////
//  Version 1

/*const Counter = () => {
    const [step, setStep] = useState(1)
    const [count, setCount] = useState(0)
    const [date, setDate] = useState(new Date())

    const handleCountDecrease = () => {
        setDate((d) => {
            const date = new Date(d.valueOf())
            date.setDate(d.getDate() - step)
            return date
        })
        setCount((c) => c - step)
    }
    const handleCountIncrease = () => {
        setDate((d) => {
            const date = new Date(d.valueOf())
            date.setDate(d.getDate() + step)
            return date
        })
        setCount((c) => c + step)
    }

    const handleStepDecrease = () => {
        if (step > 1) setStep((s) => s - 1)
    }

    return (
        <div>
            <div>
                <button onClick={handleStepDecrease}>-</button>
                <span>Step: {step}</span>
                <button onClick={() => setStep((s) => s + 1)}>+</button>
            </div>

            <div>
                <button onClick={handleCountDecrease}>-</button>
                <span>Count: {count}</span>
                <button onClick={handleCountIncrease}>+</button>
            </div>

            <p>{(count > 0 && `${count} days from today is`) || (count < 0 && `${Math.abs(count)} days ago was`) || `Today is`} {date.toDateString()}</p>
        </div>
    )
}*/

///////////////////////////////////////////////
//  Version 2

const Counter = () => {
    const [step, setStep] = useState(1)
    const [count, setCount] = useState(0)

    const handleStep = (e) => {
        setStep(+e.target.value)
    }
    const handleCountDecrease = () => {
        setCount((c) => c - step)
    }
    const handleCountIncrease = () => {
        setCount((c) => c + step)
    }

    const handleCountInput = (e) => {
        setCount(+e.target.value)
    }
    const handleReset = () => {
        setStep(1)
        setCount(0)
    }

    const date = new Date()
    date.setDate(date.getDate() + count)

    return (
        <div>
            <div>
                <input type="range" min={1} max={10} value={step} onChange={handleStep}/>
                <span>{step}</span>
            </div>

            <div>
                <button onClick={handleCountDecrease}>-</button>
                <input type="text" value={count}
                       onChange={handleCountInput}/>
                <button onClick={handleCountIncrease}>+</button>
            </div>

            <p>{(count > 0 && `${count} days from today is`) || (count < 0 && `${Math.abs(count)} days ago was`) || `Today is`} {date.toDateString()}</p>
            {(step === 1 && count === 0) ? null : (
                <div>
                    <button onClick={handleReset}>Reset</button>
                </div>
            )}
        </div>
    )
}

function App() {
    return (
        <div className="App">
            <Counter/>
        </div>
    );
}

export default App;




