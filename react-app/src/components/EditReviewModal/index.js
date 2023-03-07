import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../Context/Modal";
import { editReview } from "../../store/reviews";
import { getProductDetails } from "../../store/products";
import '../Context/ModalForms.css';

export default function EditReviewModal({ productId, reviews, user }) {
    const dispatch = useDispatch();
    const reviewList = Object.values(reviews);
    const currentReview = reviewList.find(review => review.userId === user.id)

    const [review, setReview] = useState(currentReview.review);
    const [stars, setStars] = useState(currentReview.stars);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newReview = { review, stars }

        const data = await dispatch(editReview(productId, newReview))
        if (data.id) await dispatch(getProductDetails(productId)).then(closeModal)
        else {
            let res = await data.json();
            let resArr = Object.values(res)
            setErrors(resArr)
        }

        // await dispatch(editReview(productId, newReview)).then(closeModal)
        // await dispatch(getProductDetails(productId))
        //     .catch(async (res) => {
        //         const data = await res.json();
        //         const validationErrors = [];
        //         if (data && data.errors) setErrors(data.errors);
        //         if (data && data.message) {
        //             validationErrors.push(data.message);
        //             setErrors(validationErrors);
        //         };
        //     });

    };

    return (
        <div className="review-modal-container">
            <header className="header">
                <button id="cancel-x" onClick={closeModal}>X</button>
                Edit Review
            </header>
            <li className="header-divider"></li>
            <form onSubmit={handleSubmit}>
                <div className='review-errors errors'>
                    {errors.map((error, idx) => <div key={idx}>{error}</div>)}
                </div>
                <div className='form-input-container'>
                    <label className='form-label'>Review</label>
                    <input
                        className="form-input-fields"
                        type="text"
                        placeholder={currentReview.review}
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                    />
                </div>
                <div className='form-input-container'>
                    <label className='form-label'>Rating</label>
                    <input
                        className="form-input-fields"
                        type="number"
                        placeholder={currentReview.stars}
                        min="1"
                        max="5"
                        value={stars}
                        onChange={(e) => setStars(e.target.value)}
                        required
                    />
                </div>
                <div className='form-button-container'>
                    <button className="field-buttons" type="submit">Edit Review</button>
                </div>
            </form>
        </div>
    );
};
