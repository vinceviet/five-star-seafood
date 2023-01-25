import React, {useState, useEffect} from "react";
import { useSelector, useDispatch} from "react-redux";
import { loadCartItems, addItemToCart } from "../../store/cart";

export default function Cart() {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const cartItems = useSelector((state) => state.cart.cartItems);
    console.log('caaaaaaaartItems COMPONENET', cartItems)

    useEffect(() => {
        dispatch(loadCartItems(cartItems)).then(() => setLoaded(true))
    }, [dispatch])

    if(!cartItems) return null;

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
                <button>plus 1</button>
                </div>
                <span>{item.totalItemPrice}</span><br />
            </div>
            )}
        </div>
    )
}
