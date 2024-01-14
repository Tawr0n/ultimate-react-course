// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import {useEffect, useState} from "react";

export default function App() {
    const [amount, setAmount] = useState(1)
    const [fromCurrency, setFromCurrency] = useState('EUR')
    const [toCurrency, setToCurrency] = useState('USD')
    const [converted, setConverted] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleAmountChange = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setAmount(+e.target.value);
        }
    };

    useEffect(() => {
        async function convert() {
            try {
                setIsLoading(true)
                const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
                if (!res.ok) throw new Error(`No currency found`)
                const data = await res.json()
                setConverted(data.rates[toCurrency])
            } catch (e) {
                console.log(e.message)
            } finally {
                setIsLoading(false)
            }
        }

        if (fromCurrency === toCurrency) return setConverted(amount)
        convert()
    }, [amount, fromCurrency, toCurrency]);

    return (
        <div>
            <input value={amount} onChange={handleAmountChange} type="text"/>
            <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} disabled={isLoading}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="CAD">CAD</option>
                <option value="INR">INR</option>
            </select>
            <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} disabled={isLoading}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="CAD">CAD</option>
                <option value="INR">INR</option>
            </select>
            <p>{converted} {toCurrency}</p>
        </div>
    );
}
