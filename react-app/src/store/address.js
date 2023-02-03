
const ADD_ADDRESS = 'address/ADD_ADDRESS';
const DELETE_ADDRESS = 'address/DELETE_ADDRESS';

const add = (address) => ({
    type: ADD_ADDRESS, address
});

const remove = (address, addressId) => ({
    type: DELETE_ADDRESS, address, addressId
});


export const createAddress = (userId, address) => async dispatch => {
    const res = await fetch(`/api/users/${userId}/address`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(address)
    });
    if (res.ok) {
        const address = await res.json();
        dispatch(add(address))
        return address;
    };
};

export const editAddress = (address) => async dispatch => {
    const res = await fetch(`/api/users/address/${address.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(address)
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(add(data))
        return data;
    };
};

export const deleteAddress = (address) => async dispatch => {
    const res = await fetch(`/api/users/address/${address}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
    if (res.ok) {
        const address = await res.json();
        dispatch(remove(address, address.id));
    };
};

let initialState = {};

export default function address(state = initialState, action) {
    let newState = { ...state }
    switch (action.type) {
        case ADD_ADDRESS:
            newState[action.address.id] = action.address;
            return newState;
        case DELETE_ADDRESS:
            delete newState[action.address];
            return newState;
        default:
            return state;
    };
};
