import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReviews } from '../../store/reviews';
import './Reviews.css';


const Reviews = ({ product }) => {
    const dispatch = useDispatch();
    const reviews = Object.values(useSelector(state => state.reviews));
    const { numReviews, avgStarRating } = product;

    useEffect(() => {
        dispatch(getReviews(product.id));
    }, []);

    if (!reviews) return null;

    return (
        <div className='reviews-container'>
        <div className="review-header">
            <h2>{Number(avgStarRating).toFixed(1)} &middot; {numReviews} Reviews</h2>
        </div>
            <div className="reviews-cards-container">
                {reviews.map(review => {
                    return (
                        <div className="review-card">
                            <div id='user-name'>{review.user.firstName} {review.user.lastName[0]}.</div>
                            <div id="date">{review.dateTime}</div>
                            <div>{review.stars}</div>
                            <div id="review-body">{review.review}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Reviews;
