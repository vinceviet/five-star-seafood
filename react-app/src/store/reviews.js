
const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
const ADD_REVIEW = 'reviews/ADD_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';

const load = reviews => ({
    type: LOAD_REVIEWS, reviews
});

const add = (review) => ({
    type: ADD_REVIEW, review
});

const remove = (review, reviewId) => ({
    type: DELETE_REVIEW, review, reviewId
});

export const getReviews = (productId) => async dispatch => {
    const res = await fetch(`/api/product/${productId}/reviews`);
    if (res.ok) {
        const reviews = await res.json();
        dispatch(load(reviews));
    };
};

export const createReview = (productId, review) => async dispatch => {
    const res = await fetch(`/api/product/${productId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    });
    if (res.ok) {
        const review = await res.json();
        // review.productId = productId;
        // review.User = user;
        dispatch(add(review))
        return review;
    };
};

export const editReview = (productId, review) => async dispatch => {
    const res = await fetch(`/api/product/${productId}/reviews`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    });
    if (res.ok) {
        const review = await res.json();
        dispatch(add(review))
        return review;
    };
};

export const deleteReview = (reviewId) => async dispatch => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
    if (res.ok) {
        const review = await res.json();
        dispatch(remove(review, reviewId));
    };
};

let initialState = {};

export default function reviews(state = initialState, action) {
    let newState = { ...state }
    switch (action.type) {
        case LOAD_REVIEWS:
            newState = {};
            const reviewList = action.reviews.reviews;
            reviewList.forEach(review => {
                newState[review.id] = review;
            });
            return newState;
        case ADD_REVIEW:
            newState[action.review.id] = action.review;
            return newState;
        case DELETE_REVIEW:
            delete newState[action.reviewId];
            return newState;
        default:
            return state;
    };
};
