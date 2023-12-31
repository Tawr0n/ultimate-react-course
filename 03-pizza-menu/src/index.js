import React from "react";
import ReactDom from 'react-dom/client'
import './index.css'

const pizzaData = [
    {
        name: "Focaccia",
        ingredients: "Bread with italian olive oil and rosemary",
        price: 6,
        photoName: "pizzas/focaccia.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Margherita",
        ingredients: "Tomato and mozarella",
        price: 10,
        photoName: "pizzas/margherita.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Spinaci",
        ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
        price: 12,
        photoName: "pizzas/spinaci.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Funghi",
        ingredients: "Tomato, mozarella, mushrooms, and onion",
        price: 12,
        photoName: "pizzas/funghi.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Salamino",
        ingredients: "Tomato, mozarella, and pepperoni",
        price: 15,
        photoName: "pizzas/salamino.jpg",
        soldOut: true,
    },
    {
        name: "Pizza Prosciutto",
        ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
        price: 18,
        photoName: "pizzas/prosciutto.jpg",
        soldOut: false,
    },
];

function App() {
    return (
        <div className={'container'}>
            <Header/>
            <Menu/>
            <Footer/>
        </div>
    )
}


const Header = () => {
    // const style = {color: 'red', fontSize: '48px', textTransform: 'uppercase'}
    const style = {}
    return (
        <header style={style} className={'header'}>
            <h1>Fast React Pizza Co.</h1>
        </header>
    )
}

const Menu = () => {
    const pizzas = pizzaData
    const numPizzas = pizzas.length

    return (
        <main className={'menu'}>
            <h2>Our menu</h2>

            {numPizzas > 0 ? (
                <>
                    <p>Authentic Italian cuisine. 6 creative dishes to choose from. All from our stone oven, all
                        organic,
                        all delicious.</p>
                    <ul className={'pizzas'}>
                        {pizzaData.map(pizza => <Pizza pizza={pizza} key={pizza.name}/>)}
                    </ul>
                </>
            ) : (
                <p>We're still working on our menu. Please, come back later :)</p>
            )}
            {/*<Pizza name={'Pizza Spinaci 11111'} ingredients={'Tomato, mozarella, spinach, and ricotta cheese'}
                   photoName={'pizzas/spinaci.jpg'} price={10}/>*/}
        </main>
    )
}

function Pizza({pizza}) {
    console.log(pizza)

    // if (pizza.soldOut) return null

    return (
        <li className={`pizza ${pizza.soldOut ? 'sold-out' : ''}`}>
            <img src={pizza.photoName} alt={pizza.name}/>
            <div>
                <h3>{pizza.name}</h3>
                <p>{pizza.ingredients}</p>
                <span style={{textTransform: "uppercase"}}>{pizza.soldOut ? 'sold out' : pizza.price}</span>
            </div>
        </li>
    )
}

const Footer = () => {
    const hour = new Date().getHours()
    const openHour = 12
    const closeHour = 22
    const isOpen = openHour <= hour && hour <= closeHour
    console.log(isOpen)

    // if (openHour <= hour && hour <=closeHour) alert('We\'re currently open!')
    // else alert('Sorry, we\'re closed!')

    return (
        <footer className={'footer'}>
            {isOpen ? (
                <Order openHour={openHour} closeHour={closeHour}/>
            ) : (
                <p>
                    We're happy to welcome you between {openHour}:00 and {closeHour}:00.
                </p>
            )}
        </footer>
    )

    // return React.createElement("footer", null, `We're currently open`)
}

function Order({openHour, closeHour}) {
    return (
        <div className={"order"}>
            <p>We're open from {openHour}:00 to {closeHour}:00. Come visit us or order online.</p>
            <button className={"btn"}>Order</button>
        </div>
    )
}


// React v18
const root = ReactDom.createRoot(document.querySelector('#root'))
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
)

// React before 18
// ReactDOM.render(<App />, document.getElementById("root"));
