import { useDispatch } from 'react-redux';
import { useModal } from '../Context/Modal';
import { deleteReview } from '../../store/reviews';
import { getProductDetails } from '../../store/products';

export default function DeleteReviewModal({ reviews, user, productId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const review = reviews.find(review => review.userId === user.id);

    if(!review) return null;
    
    const deleteReviewHandler = async (review) => {
        await dispatch(deleteReview(review))
        await dispatch(getProductDetails(productId))
        .then(closeModal);
    };

    return (
        <div className="delete-container">
            <h1>Are you sure you want to delete your review?</h1>
            <div className="button-container">
                <button id="delete-button" onClick={() => deleteReviewHandler(review.id)}>Delete Review</button>
                <button id="cancel-button" onClick={closeModal}>Cancel</button>
            </div>
        </div>
    )
};
