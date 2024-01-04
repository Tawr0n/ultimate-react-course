import {useState} from "react";
import BillInput from "./BillInput";
import SelectPercentage from "./SelectPercentage";
import Output from "./Output";
import Reset from "./Reset";

const App = () => {
    const [bill, setBill] = useState(0)
    const [percentage1, setPercentage1] = useState(0)
    const [percentage2, setPercentage2] = useState(0)
    const averagePercentage = (percentage1 + percentage2) / 2
    const tip = bill * averagePercentage / 100

    const handleReset = () => {
        setBill(0)
        setPercentage1(0)
        setPercentage2(0)
    }

    return (
        <div>
            <BillInput bill={bill} onSetBill={setBill}/>
            <SelectPercentage percentage={percentage1} onSetPercentage={setPercentage1}>
                How did you like the service?
            </SelectPercentage>
            <SelectPercentage percentage={percentage2} onSetPercentage={setPercentage2}>
                How did your friend like the service?
            </SelectPercentage>
            {bill > 0 && (<>
                <Output bill={bill} tip={tip}/>
                <Reset onReset={handleReset}/>
            </>)}
        </div>
    )
}


export default App;
