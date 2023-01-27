import { useDispatch } from 'react-redux';
import { useModal } from '../Context/Modal';
import { deleteReview } from '../../store/reviews';
import { getProductDetails } from '../../store/products';

export default function DeleteReviewModal({ reviews, user, productId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const reviewList = Object.values(reviews)
    const review = reviewList.find(review => review.userId === user.id);


    const deleteReviewHandler = async (review) => {
        await dispatch(deleteReview(review)).then(closeModal)
        await dispatch(getProductDetails(productId));
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
