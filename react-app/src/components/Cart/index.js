import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadCartItems, addOneToCart, minusOneToCart, removeFromCart } from "../../store/cart";

export default function Cart() {
    const dispatch = useDispatch();
    // const [loaded, setLoaded] = useState(false);
    const cartItems = Object.values(useSelector((state) => state.cart));

    useEffect(() => {
        dispatch(loadCartItems())
    }, [dispatch])

    if (!cartItems) return null;

    const handleAddItem = (e, item) => {
        e.preventDefault();
        dispatch(addOneToCart(item)).then(() => dispatch(loadCartItems()))
    }

    const handleMinusItem = (e, item) => {
        e.preventDefault();
        dispatch(minusOneToCart(item)).then(() => dispatch(loadCartItems()))
    }

    const handleRemoveItem = (e, item) => {
        e.preventDefault();
        dispatch(removeFromCart(item)).then(() => dispatch(loadCartItems()))
    }

    if (!cartItems.length) {
        return (
            <div>
                <h1>Cart</h1>
                <div>No items in cart</div>
            </div>
        )
    }

    return (
        <div>
            <h1>Cart</h1>
            {cartItems.map((item) =>
                <div>
                    <span>{item.name}</span><br />
                    <span>{item.description}</span><br />
                    <div>
                        <button onClick={(e) => handleMinusItem(e, item)}>minus 1</button>
                        <span>{item.productQuantity}</span>
                        <button onClick={(e) => handleAddItem(e, item)}>plus 1</button>
                        <button onClick={(e) => handleRemoveItem(e, item)}>Remove</button>
                    </div>
                    <span>${Number(item.totalItemPrice).toFixed(2)}</span><br />
                </div>
            )}
            <div>Total Price: ${Number(cartItems.reduce((total, item) => total + item.totalItemPrice, 0)).toFixed(2)}</div>
            <button>Checkout</button>
        </div>
    )
}
