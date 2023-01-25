const ADD_ITEM = 'cart/ADD_ITEM';
const REMOVE_ITEM = 'cart/REMOVE_ITEM';

const addItem = (productId) => ({
    type: ADD_ITEM, productId
});

const removeItem = (productId) => ({
    type: REMOVE_ITEM, productId
});

export const addItemToCart = (productId) => async(dispatch) => {
    const res = await fetch(`/api/cart/addItem/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId
        })
    });
    if(res.ok) {
        const data = await res.json();
        dispatch(addItem(data));
        return data;
    };
};

const initialState = {}

export default function cart(state = initialState, action) {
    switch (action.type) {
      case ADD_ITEM:
        return {...state}
      default:
        return state;
    }
  }
