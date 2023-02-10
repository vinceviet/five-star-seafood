const ADD_ORDER = 'order/ADD_ORDER';
const LOAD_ORDERS = 'order/LOAD_ORDERS';
const ORDER_DETAILS = 'order/ORDER_DETAILS';
const DELETE_ORDER = 'order/DELETE_ORDER';

const addOrder = (orders) => ({
    type: ADD_ORDER, orders
});

const loadOrders = (orders) => ({
    type: LOAD_ORDERS, orders
});

const loadOrderDetails = (orderNum) => ({
    type: ORDER_DETAILS, orderNum
});

const deleteOrder = (order) => ({
    type: DELETE_ORDER, order
});

export const addToOrder = (cart) => async (dispatch) => {
    const res = await fetch(`/api/cart/checkout/${cart}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart })
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
    const res = await fetch(`/api/orders/${orderNum}`)
    if (res.ok) {
        const orders = await res.json()
        dispatch(loadOrderDetails(orders));
    };
};

export const cancelOrder = (orderNum) => async (dispatch) => {
    const res = await fetch(`/api/orders/${orderNum}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(deleteOrder(data));
        return null;
    };
};



const initialState = {}

export default function orders(state = initialState, action) {
    let newState = {};
    switch (action.type) {
        case ADD_ORDER:
            return { ...state, ...action.orders.orders }
        case LOAD_ORDERS:
            const ordersList = [...action.orders.orders];
            ordersList.forEach(item => {
                newState[item.id] = item
            })
            return newState
        case ORDER_DETAILS:
            const orderList = [...action.orderNum.orders];
            orderList.forEach(item => {
                newState[item.id] = item
            })
            return newState
        case DELETE_ORDER:
            return {...state}
        default:
            return state;
    }
}
