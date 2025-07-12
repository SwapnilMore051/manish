import { createContext, useRef, type ReactNode } from 'react';

import Toast from './toast';
import './toast.scss';
import type { ToastContextType, ToastRefType, ToastState } from '../models/toast';

const ToastContext = createContext<ToastContextType>({
    toast: null,
    showToast: () => void 0,
    removeToast: () => void 0,
});

export function ToastContextProvider({ children }: { children: ReactNode }) {
    const toastref = useRef<ToastRefType>(null);

    const showToast = (newToast: ToastState): void => {
        (toastref.current as ToastRefType)?.showToast(newToast);
    };

    const removeToast = (): void => {
        (toastref.current as ToastRefType)?.removeToast();
    };

    const context: ToastContextType = {
        toast: (toastref.current as ToastRefType)?.getToast() || null,
        showToast,
        removeToast,
    };

    return (
        <ToastContext.Provider value={context}>
            {children}

            <Toast ref={toastref} />
        </ToastContext.Provider>
    );
}

export default ToastContext;
