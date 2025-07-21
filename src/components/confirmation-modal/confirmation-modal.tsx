
import Modal from '../modal/modal';
import type { ConfirmationModalProps } from '../models/confirmation-modal';
import './confirmation-modal.scss';

function ConfirmationModal(props: ConfirmationModalProps) {
    return (
        <Modal isCloseAvailable={true} isOverlayClickable={true} isOverlayVisible={true} onClose={props.closeModalCb} className="rad-32">
            <div className={`confirmation-modal-container ${props.classes || ''}`}>
                <div className="confirmation-modal-header">
                    <span className="modal-heading">{props.modalData.title}</span>
                </div>
                <div className="confirmation-modal-body">
                    <span className="confirmation-modal-description" dangerouslySetInnerHTML={{ __html: props.modalData.description }} />
                </div>

                <div className="confirmation-modal-footer">
                    {props.footerButtons?.map((button) => {
                        return (
                            <button key={button.name} className={button.type} onClick={button.clickAction}>
                                <span>{button.name}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </Modal>
    );
}

export default ConfirmationModal;
