const LOAD_PRODUCTS = 'products/LOAD_PRODUCTS';

const getProductsByCategory = (category) => ({
  type: LOAD_PRODUCTS, category
});


export const getAllProducts = (category) => async (dispatch) => {
    const res = await fetch(`/api/products/${category}`);
    if (res.ok) {
        const products = await res.json()
        dispatch(getProductsByCategory(products));
    }
};

const initialState = {};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PRODUCTS:
        let newState = {...state};
        const productList = [...action.category.products];
        productList.forEach((product) => {
            newState[product.id] = product;
        });
      return newState
    default:
      return state;
  }
}
