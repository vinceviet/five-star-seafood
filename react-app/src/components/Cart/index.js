import React, {useState, useEffect} from "react";
import { useSelector, useDispatch} from "react-redux";
import { loadCartItems, addOneToCart} from "../../store/cart";

export default function Cart() {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const cartItems = useSelector((state) => state.cart.cartItems);
    console.log('caaaaaaaartItems COMPONENET', cartItems)

    useEffect(() => {
        dispatch(loadCartItems())
    },[dispatch])

    if(!cartItems) return null;

    const handleAddItem = (e, item) => {
        e.preventDefault();
        dispatch(addOneToCart(item)).then(() => dispatch(loadCartItems()))
    }

    // if(!loaded){
    //     return (
    //         <div>
    //         <h1>Cart</h1>
    //         </div>
    //     )
    // }

    return (
        <div>
            <h1>Cart</h1>
            {cartItems.cartItems.map((item) =>
            <div>
                <span>{item.name}</span><br />
                <span>{item.description}</span><br />
                <div>
                <button>minus 1</button>
                <span>{item.productQuantity}</span>
                <button onClick={(e) => handleAddItem(e, item)}>plus 1</button>
                <button>Remove</button>
                </div>
                <span>${Number(item.totalItemPrice).toFixed(2)}</span><br />
            </div>
            )}
        </div>
    )
}
