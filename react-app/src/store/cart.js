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

export const loadCartItems = () => async (dispatch) => {
    const res = await fetch('/api/cart');
    if (res.ok) {
        const cart = await res.json()
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

export const addOneToCart = (product) => async (dispatch) => {

    const res = await fetch(`/api/cart/${product.id}`, {
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
        console.log('daaaataaa', data)
        dispatch(addItem(data));
        return null;
    };
};



const initialState = {}

export default function cart(state = initialState, action) {
    switch (action.type) {
        case LOAD_CART:
            return { ...state, cartItems: action.cartItems }
        case ADD_ITEM:
            console.log('accccccction', action)
            let newState = {...state};
            newState[action.product.id] = action.product
            return newState
            // return { ...state, cartItems: action.product }
        default:
            return state;
    }
}
