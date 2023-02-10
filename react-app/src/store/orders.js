const ADD_ORDER = 'order/ADD_ORDER';

const addOrder = (orders) => ({
    type: ADD_ORDER, orders
});

export const addToOrder = (cart) => async (dispatch) => {
    const res = await fetch(`/api/cart/checkout/${cart}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({cart})
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(addOrder(data));
        return data;
    };
};

const initialState = {}

export default function orders(state = initialState, action) {
    switch (action.type) {
        case ADD_ORDER:
            return {...state, ...action.orders.orders}
        default:
            return state;
    }
}
