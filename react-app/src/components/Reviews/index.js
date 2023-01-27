import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReviews } from '../../store/reviews';
import './Reviews.css';


const Reviews = ({ product }) => {
    const dispatch = useDispatch();
    const reviews = Object.values(useSelector(state => state.reviews));
    const { numReviews, avgStarRating } = product;

    // function formatDate(newDate) {
    //     const months = {
    //         1: 'January',
    //         2: 'February',
    //         3: 'March',
    //         4: 'April',
    //         5: 'May',
    //         6: 'June',
    //         7: 'July',
    //         8: 'August',
    //         9: 'September',
    //         10: 'October',
    //         11: 'November',
    //         12: 'December',
    //     }
    //     const d = newDate.split("-")
    //     const monthName = months[d[1]]
    //     const formatted = `${monthName} ${d[0]}`
    //     return formatted.toString()
    // }

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
