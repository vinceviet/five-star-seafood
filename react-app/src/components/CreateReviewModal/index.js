    import React, { useState } from "react";
    import { useDispatch } from "react-redux";
    import { useModal } from "../Context/Modal";
    import { createReview } from "../../store/reviews";
    import { getProductDetails } from "../../store/products";
    import '../Context/ModalForms.css';

    export default function CreateReviewModal({ productId }) {
        const dispatch = useDispatch();
        const [review, setReview] = useState("");
        const [stars, setStars] = useState("");
        const [errors, setErrors] = useState([]);
        const { closeModal } = useModal();

        const handleSubmit = async (e) => {
            e.preventDefault();
            const newReview = { review, stars }

            await dispatch(createReview(productId, newReview)).then(closeModal)
            await dispatch(getProductDetails(productId))
            .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });

        };

        return (
            <div className="review-modal-container">
                <header className="header">
                    <button id="cancel-x" onClick={closeModal}>X</button>
                    Create a Review
                </header>
                <li className="header-divider"></li>
                <form onSubmit={handleSubmit}>
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <div className='form-input-container'>
                        <label className='form-label'>Review</label>
                        <input
                            className="form-input-fields"
                            type="text"
                            placeholder="Review"
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
                            placeholder="Rating"
                            min="1"
                            max="5"
                            value={stars}
                            onChange={(e) => setStars(e.target.value)}
                            required
                        />
                    </div>
                    <div className='form-button-container'>
                        <button className="field-buttons" type="submit">Create Review</button>
                    </div>
                </form>
            </div>
        );
    };
