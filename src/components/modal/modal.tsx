import { createPortal } from 'react-dom';
import './modal.scss';
import type { ModalProps } from '../models/modal';

function Modal(props: ModalProps) {
    return createPortal(
        <>
            {props.isOverlayVisible && (
                <div
                    className={`modal-overlay ${props.overlayClassName}`}
                    onClick={() => {
                        props.isOverlayClickable && props.onClose && props.onClose('overlay');
                    }}
                />
            )}

            <div className={`modal-container ${props.className || ''}`}>
                {props.isCloseAvailable && props.onClose && (
                    <img
                        className="modal-close"
                        width={24}
                        height={24}
                        src={'/assets/icons/close.svg'}
                        alt="Close"
                        onClick={() => props.onClose && props.onClose('close')}
                    />
                )}

                {props.children}
            </div>
        </>,
        document.body
    );
}

Modal.defaultProps = {
    isOverlayClickable: false,
    isOverlayVisible: true,
    isCloseAvailable: true,
    className: '',
    overlayClassName: '',
};

export default Modal;
