export type ConfirmationModalProps = {
    modalData: { title: string; description: string };
    footerButtons: { name: string; type: string; clickAction: () => void }[];
    closeModalCb: () => void;
    classes?: string;
};
