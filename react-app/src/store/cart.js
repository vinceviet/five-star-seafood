const LOAD_CART = 'cart/LOAD_CART';
const ADD_ITEM = 'cart/ADD_ITEM';
const MINUS_ONE = 'cart/MINUS_ONE';
const REMOVE_ITEM = 'cart/REMOVE_ITEM';

const loadCart = (cartItems) => ({
    type: LOAD_CART, cartItems
});

const addItem = (product) => ({
    type: ADD_ITEM, product
});

const minusOne = (product) => ({
    type: MINUS_ONE, product
});

const removeItem = (product) => ({
    type: REMOVE_ITEM, product
});

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
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({product})
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(addItem(data));
        return data;
    };
};

export const addOneToCart = (product) => async (dispatch) => {

    const res = await fetch(`/api/cart/add/${product.id}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({product})
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(addItem(data));
        return null;
    };
};

export const minusOneToCart = (product) => async (dispatch) => {

    const res = await fetch(`/api/cart/minus/${product.id}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({product})
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(minusOne(data));
        return null;
    };
};

export const removeFromCart = (product) => async (dispatch) => {

    const res = await fetch(`/api/cart/${product.id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(removeItem(data));
        return null;
    };
};


const initialState = {}

export default function cart(state = initialState, action) {
    let newState = {...state}
    switch (action.type) {
        case LOAD_CART:
            newState = {...state};
            const cartList = [...action.cartItems.cartItems];
            cartList.forEach(item => {
                newState[item.id] = item
            })
            return newState
        case ADD_ITEM:
            newState = {...state};
            newState[action.product.id] = action.product
            return newState
        case MINUS_ONE:
            newState = {...state};
            newState[action.product.id] = action.product
            if(!action.product.productQuantity){
                delete newState[action.product.id]
            }
            return newState
        case REMOVE_ITEM:
            newState = {...state};
            delete newState[action.product.id]
            return newState
        default:
            return state;
    }
}
