import { useDispatch } from 'react-redux';
import { useModal } from '../Context/Modal';
import { deleteAddress } from '../../store/address';
import { getUser } from '../../store/session';
import '../Context/DeleteModal.css';

export default function DeleteAddressModal({user, address}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();



    const deleteAddressHandler = async (address) => {
        await dispatch(deleteAddress(address)).then(closeModal)
        await dispatch(getUser(user.id));
    };

    return (
        <div className="delete-container">
            <h1>Are you sure you want to delete this address?</h1>
            <div className="button-container">
                <button id="delete-button" onClick={() => deleteAddressHandler(address)}>Delete Address</button>
                <button id="cancel-button" onClick={closeModal}>Cancel</button>
            </div>
        </div>
    )
};
