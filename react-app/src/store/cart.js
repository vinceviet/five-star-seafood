const LOAD_CART = 'cart/LOAD_CART';
const ADD_ITEM = 'cart/ADD_ITEM';
// const REMOVE_ITEM = 'cart/REMOVE_ITEM';

const loadCart = (cartItems) => ({
    type: LOAD_CART, cartItems
});

const addItem = (product) => ({
    type: ADD_ITEM, product
});

// const removeItem = (productId) => ({
//     type: REMOVE_ITEM, productId
// });

export const loadCartItems = (cartItems) => async (dispatch) => {
    console.log('fetched cartstuffs', cartItems)
    const res = await fetch('/api/cart');
    if (res.ok){
        const cart = await res.json()
        console.log('carrrrrrrt RES', cart)
        dispatch(loadCart(cart));
    };
};

export const addItemToCart = (product) => async (dispatch) => {

    const res = await fetch(`/api/cart/addItem/${product.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            product
        })
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(addItem(data));
        return data;
    };
};

const initialState = {}

export default function cart(state = initialState, action) {
    switch (action.type) {
        case LOAD_CART:
            console.log('accccccction', action)
            return {...state, cartItems: action.cartItems}
        case ADD_ITEM:
            return { ...state, cartItem: action.product }
        default:
            return state;
    }
}
