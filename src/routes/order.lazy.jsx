import {useEffect, useState, useContext} from 'react';
import Pizza from "../Pizza";
import Cart from "../Cart";
import { CartContext } from '../contexts';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute("/order")({
    component: Order,
});

const intl = new Intl.NumberFormat("en-US" , {
    style: "currency",
    currency: "USD",
});

function Order(){
    //  const pizzaType = "pepperroni";
    //  const pizzaSize = "M";
    const [pizzaTypes, setPizzaTypes] = useState([]);
    const [pizzaType, setPizzaType] = useState("hawaiian"); //hooks not in conditions
    const [pizzaSize, setPizzaSize] = useState("M");
    const [cart, setCart] = useContext(CartContext);
    const [loading, setLoading] = useState(true);

    async function checkout(){
        setLoading(true);

        await fetch("/api/order" , {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            } ,
            body: JSON.stringify({
                cart,
            }),
        });

        setCart([]);
        setLoading(false);
    }

    let price, selectedPizza;

    if (!loading) {
        selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id);
        price = intl.format(
            selectedPizza.sizes ? selectedPizza.sizes[pizzaSize] : "",
        );
    }

    useEffect(() => {
        fetchPizzaTypes();
    }, []);

    async function fetchPizzaTypes(){   
        //await new Promise((resolve) => setTimeout(resolve, 3000)); 

        const pizzasRes = await fetch('/api/pizzas');
        const pizzasJson = await pizzasRes.json();
        setPizzaTypes(pizzasJson);
        setLoading(false);
    }

    function addToCart(){
        setCart([...cart, { pizza: selectedPizza, size: pizzaSize, price }]);
    }

     return(
        <div className='order-page'>
            <div className = "order">
                <h2> Create Order </h2>
                <form 
                // onSubmit={(e) => {
                //     e.preventDefault()
                //     setCart([...cart, 
                //         {pizza: selectedPizza, size: pizzaSize, price},
                //     ]);
                // }}
                action={addToCart}
                >
                    <div>
                        <div>
                            <label htmlFor="pizza-type"> Pizza Type </label>
                            <select                         
                            onChange={(e) => setPizzaType(e.target.value)}                        
                            name="pizza-type" value={pizzaType}>
                                {/* <option value = "pepperroni"> The Pepperroni Pizza </option>
                                <option value = "hawaiian"> The Hawaiian Pizza </option>
                                <option value = "big_meat"> The Big Meat Pizza </option> */}
                                {pizzaTypes.map((pizza) => (
                                    <option key = {pizza.id} value={pizza.id}> {pizza.name} </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="pizza-size">Pizza Size</label>
                            <div
                            // onChange={(e) => setPizzaSize(e.target.value)}                        
                            >
                                <span>
                                    <input
                                        checked={pizzaSize === 'S'} 
                                        type="radio"
                                        name="pizza-size"
                                        value='S'
                                        id="pizza-s"
                                        onChange={(e) => setPizzaSize(e.target.value)}
                                    />
                                    <label htmlFor = "pizza-s">Small</label>
                                </span>
                                <span>
                                    <input
                                        checked={pizzaSize === 'M'} 
                                        type="radio"
                                        name="pizza-size"
                                        value='M'
                                        id="pizza-m"
                                        onChange={(e) => setPizzaSize(e.target.value)}
                                    />
                                    <label htmlFor = "pizza-m">Medium</label>
                                </span>
                                <span>
                                    <input
                                        checked={pizzaSize === 'L'} 
                                        type="radio"
                                        name="pizza-size"
                                        value='L'
                                        id="pizza-l"
                                        onChange={(e) => setPizzaSize(e.target.value)}
                                    />
                                    <label htmlFor = "pizza-l">Large</label>
                                </span>
                            </div>
                        </div>
                        <button type="submit"> Add to Cart </button>
                    </div>
                    {loading ? (
                        <h1>loading pizzas lol</h1>
                        ) : (
                            <div className="order-pizza">
                                <Pizza 
                                    name = {selectedPizza.name}
                                    description = {selectedPizza.description}
                                    image = {selectedPizza.image}
                                />
                                <p>{price}</p>
                            </div>
                        )
                    }                       
                </form>
            </div>  
            {
                loading ? <h2>LOADING .. </h2> : <Cart checkout={checkout} cart={cart} />
            }
        </div>      
    );
}