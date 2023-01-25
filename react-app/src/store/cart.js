const ADD_ITEM = 'cart/ADD_ITEM';
// const REMOVE_ITEM = 'cart/REMOVE_ITEM';
// const LOAD_CART_ITEM = 'cart/LOAD_CART_ITEM';

const addItem = (product) => ({
    type: ADD_ITEM, product
});

// const removeItem = (productId) => ({
//     type: REMOVE_ITEM, productId
// });

// const loadCartItems = ()

export const addItemToCart = (product) => async(dispatch) => {
    console.log('fetched productid', product)
    const res = await fetch(`/api/cart/addItem/${product.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product
        })
    });
    if(res.ok) {
        const data = await res.json();
        console.log('dataaaaaaa', data)
        dispatch(addItem(data));
        return data;
    };
};

const initialState = {}

export default function cart(state = initialState, action) {
    switch (action.type) {
      case ADD_ITEM:
        console.log('actionnnnnnn', action)
        return {...state, cartItem: action.product}
      default:
        return state;
    }
  }
