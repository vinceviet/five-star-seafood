const LOAD_PRODUCTS = 'products/LOAD_PRODUCTS';
const PRODUCT_DETAILS = 'product/PRODUCT_DETAILS';
const PRODUCT_SEARCH = 'product/PRODUCT_SEARCH'

const getProductsByCategory = (category) => ({
  type: LOAD_PRODUCTS, category
});

const productDetails = (product) => ({
  type: PRODUCT_DETAILS, product
});

const productSearch = (query) => ({
  type: PRODUCT_SEARCH, query
})


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

export const searchForProducts = (query) => async (dispatch) => {
  const res = await fetch(`/api/products/search?q=${query}`)
  if (res.ok) {
    const data = await res.json()
    console.log('data tunk', data)
    dispatch(productSearch(data))
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
    case PRODUCT_SEARCH:
      console.log('accction', action)
      newState = {}
      const searchList = [...action.products];
      searchList.forEach((product) => {
        newState[product.id] = product;
      });
      return newState
    default:
      return state;
  }
}
