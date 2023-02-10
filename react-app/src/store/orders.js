const ADD_ORDER = 'order/ADD_ORDER';

const addOrder = (orders) => ({
    type: ADD_ORDER, orders
});

export const addToOrder = (cart) => async (dispatch) => {
    console.log('thunk hitting')
    const res = await fetch(`/api/cart/checkout/${cart}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({cart})
    });
    if (res.ok) {
        const data = await res.json();
        console.log('thunkData', data)
        dispatch(addOrder(data));
        return data;
    };
};

const initialState = {}

export default function orders(state = initialState, action) {
    let newState = {...state}
    switch (action.type) {
        case ADD_ORDER:
            console.log('acccction', action)
            newState['orders'] = action.orders.orders
            return newState
        default:
            return state;
    }
}
