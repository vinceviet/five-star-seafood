import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReviews } from '../../store/reviews';
import './Reviews.css';
import star from '../../assets/star.png'


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
                <span>{Array(Math.floor(avgStarRating)).fill().map((_, i) => (
                    <img key={i} className='top-star-img' src={star} alt='star' />
                ))}</span>
                <span>{numReviews} Reviews</span>
            </div>
            <div className="reviews-cards-container">
                {reviews.map(review => {
                    return (
                        <div className="review-card" key={review.id}>
                            <div id='user-name'>{review.user.firstName} {review.user.lastName[0]}.</div>
                            <div id="date">{review.dateTime}</div>
                            <div>{Array(review.stars).fill().map((_, i) => (
                                <img key={i} className='star-img' src={star} alt='star' />
                            ))}
                            </div>
                            <div id="review-body">{review.review}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Reviews;
