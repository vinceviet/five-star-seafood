const PRODUCT_SEARCH = 'search/PRODUCT_SEARCH';

const productSearch = (query) => ({
    type: PRODUCT_SEARCH, query
});

export const searchForProducts = (query) => async (dispatch) => {
    const res = await fetch(`/api/products/search/${query}`)
    if (res.ok) {
        const data = await res.json()
        dispatch(productSearch(data))
    };
};

const initialState = {};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case PRODUCT_SEARCH:
      return {...action.query}
    default:
      return state;
  }
};
