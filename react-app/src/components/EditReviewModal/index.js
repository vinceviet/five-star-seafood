import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../Context/Modal";
import { editReview } from "../../store/reviews";
import { getProductDetails } from "../../store/products";
import '../Context/ModalForms.css';

export default function EditReviewModal({ productId, reviews, user }) {
    const dispatch = useDispatch();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState('');
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const reviewList = Object.values(reviews);
    const currentReview = reviewList.find(review => review.userId === user.id)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newReview = { review, stars }

        await dispatch(editReview(productId, newReview)).then(closeModal)
        await dispatch(getProductDetails(productId))
            .catch(async (res) => {
                const data = await res.json();
                const validationErrors = [];
                if (data && data.errors) setErrors(data.errors);
                if (data && data.message) {
                    validationErrors.push(data.message);
                    setErrors(validationErrors);
                };
            });

    };

    return (
        <div className="login-container">
            <header className="header">
                <button id="cancel-x" onClick={closeModal}>X</button>
                Edit Review
            </header>
            <li className="header-divider"></li>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>
                    <input
                        className="fields-top"
                        type="text"
                        placeholder={currentReview.review}
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <input
                        className="fields-bottom"
                        type="number"
                        placeholder={currentReview.stars}
                        min="1"
                        max="5"
                        value={stars}
                        onChange={(e) => setStars(e.target.value)}
                        required
                    />
                </label>
                <button className="field-buttons" type="submit">Edit Review</button>
            </form>
        </div>
    );
};
