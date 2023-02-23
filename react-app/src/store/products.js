const LOAD_PRODUCTS = 'products/LOAD_PRODUCTS';
const PRODUCT_DETAILS = 'product/PRODUCT_DETAILS';

const getProductsByCategory = (category) => ({
  type: LOAD_PRODUCTS, category
});

const productDetails = (product) => ({
  type: PRODUCT_DETAILS, product
});

export const getAllProducts = (category) => async (dispatch) => {
  const res = await fetch(`/api/products/pages/${category}`);
  if (res.ok) {
    const products = await res.json()
    dispatch(getProductsByCategory(products));
  }
};

export const getProductDetails = (product) => async (dispatch) => {
  const res = await fetch(`/api/products/${product}`);
  if (res.ok) {
    const details = await res.json()
    dispatch(productDetails(details))
  };
};

const initialState = {};

export default function productsReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_PRODUCTS:
      newState = {}
      const productList = [...action.category.products];
      productList.forEach((product) => {
        newState[product.id] = product;
      });
      return newState
    case PRODUCT_DETAILS:
      newState[action.product.id] = action.product
      return newState
    default:
      return state;
  }
};
