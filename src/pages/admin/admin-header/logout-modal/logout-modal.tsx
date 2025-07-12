import './logout-modal.scss';
import Modal from '../../../../components/modal/modal';

type LogoutModalProps = {
    onClose: () => void;
    onConfirmLogout: () => void;
};

const LogoutModal = ({ onClose, onConfirmLogout }: LogoutModalProps) => {
    return (
        <Modal
            isCloseAvailable={true}
            onClose={onClose}
            isOverlayVisible={true}
            isOverlayClickable={true}
        >
            <div className='logout-modal'>
                <div className='modal-heading'>Are you sure you want to log out?</div>
                <div className='logout-buttons'>
                    <div className='cancel-button' onClick={onClose}>Cancel</div>
                    <div className='confirm-button' onClick={onConfirmLogout}>Logout</div>
                </div>
            </div>
        </Modal>
    );
}

export default LogoutModal;
