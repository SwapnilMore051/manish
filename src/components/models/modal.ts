import type { ReactNode } from "react";

export type ModalProps = {
    children: ReactNode;
    onClose?: (from?: string) => void;
    isOverlayClickable?: boolean;
    isOverlayVisible?: boolean;
    isCloseAvailable?: boolean;
    className?: string;
    overlayClassName?: string;
};

export const __dummyModal = {};
