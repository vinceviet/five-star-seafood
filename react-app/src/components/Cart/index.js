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
            {cartItems.map((item) =>
                <div>{item.name}</div>
            )}
        </div>
    )
}
