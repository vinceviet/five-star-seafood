const ADD_ORDER = 'order/ADD_ORDER';
const LOAD_ORDERS = 'order/LOAD_ORDERS'

const addOrder = (orders) => ({
    type: ADD_ORDER, orders
});

const loadOrders = (orders) => ({
    type: LOAD_ORDERS, orders
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

export const getOrders = () => async (dispatch) => {
    const res = await fetch('/api/orders')
    if (res.ok) {
        const orders = await res.json()
        dispatch(loadOrders(orders));
    };
};

export const getOrderDetails = (orderNum) => async (dispatch) => {
    console.log('THUNK HITTING')
    const res = await fetch(`/api/orders/${orderNum}`)
    if (res.ok) {
        const orders = await res.json()
        dispatch(loadOrders(orders));
    };
};



const initialState = {}

export default function orders(state = initialState, action) {
    switch (action.type) {
        case ADD_ORDER:
            return {...state, ...action.orders.orders}
        case LOAD_ORDERS:
            let newState = {}
            const ordersList = [...action.orders.orders];
            ordersList.forEach(item => {
                newState[item.id] = item
            })
            return newState
        default:
            return state;
    }
}
