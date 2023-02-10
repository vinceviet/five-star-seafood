import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../Context/Modal';
import { cancelOrder } from '../../store/orders';
import '../Context/DeleteModal.css';

export default function DeleteOrderModal({orderNum}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const cancelOrderhandler = async (orderNum) => {
        await dispatch(cancelOrder(orderNum)).then(closeModal)
        history.push('/profile')
    };

    return (
        <div className="delete-container">
            <h1>Are you sure you want to cancel your order?</h1>
            <div className="button-container">
                <button id="delete-button" onClick={() => cancelOrderhandler(orderNum)}>Cancel Order</button>
                <button id="cancel-button" onClick={closeModal}>Go Back</button>
            </div>
        </div>
    )
};
