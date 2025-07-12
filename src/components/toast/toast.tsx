import { createPortal } from 'react-dom';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import './toast.scss';
import type { ToastState } from '../models/toast';

const autoHideTime = 2;

const Toast = forwardRef((_props, ref) => {
    const [toast, setToast] = useState<ToastState | null>(null);
    const timeId = useRef<ReturnType<typeof setTimeout>>(undefined);

    const removeToast = () => {
        setToast(null);
    };

    useImperativeHandle(ref, () => ({
        showToast(newToast: ToastState): void {
            clearTimeout(timeId.current);
            setToast(newToast);

            timeId.current = setTimeout(() => {
                removeToast();
            }, autoHideTime * 1000);
        },

        removeToast(): void {
            removeToast();
        },

        getToast(): ToastState | null {
            return toast;
        },
    }));

    return (
        <>
            {toast &&
                createPortal(
                    <div className="toast-container">
                        <div className="toast-type">
                            <img
                                className="toast-icon"
                                src={toast.type === 'success' ? '/assets/icons/ic_check_colored.svg' : '/assets/icons/ic_error_colored.svg'}
                            />
                        </div>
                        <div className="toast-message">{toast.message}</div>
                        <img className="toast-close" src={'/assets/icons/close.svg'} alt="Close" width={16} height={16} onClick={removeToast} />
                    </div>,
                    document.body
                )}
        </>
    );
});

export default Toast;
