import { useRef, useState } from 'react';
import Modal from '../../../components/modal/modal';
import CrudHeader from '../crud-header/crud-header';
import AudioModal from '../upload-file-components/add-audio-modal/audio-modal';
import './crud-audio.scss'
import type { ToastRefType } from '../../../components/models/toast';
import Toast from '../../../components/toast/toast';
import ConfirmationModal from '../../../components/confirmation-modal/confirmation-modal';

const CrudAudio = () => {

    const [audioModal, setAudioModal] = useState(false);
    const [editAudioModal, setEditAudioModal] = useState(false);
    const [deleteAudioModal, setDeleteAudioModal] = useState(false);

    const openAudioModal = () => setAudioModal(true);
    const closeAudioModal = () => setAudioModal(false);
    const toastRef = useRef<ToastRefType>(null);

    const showToast = ({ type, message }: any) => {
        toastRef?.current?.showToast({ type, message });
    };
    const onSubmit = () => {
        setAudioModal(false);
        showToast({ type: "success", message: "Audio Uploaded successfully!" });
    }

    const openEditAudioModal = () => setEditAudioModal(true);
    const closeEditAudioModal = () => setEditAudioModal(false);
    const onOpenDeleteModal = () => {
        setDeleteAudioModal(true);
    }

    const onConfirmCancel = () => {
        setDeleteAudioModal(false);
    }

    const onConfirmDelete = () => {
        setDeleteAudioModal(false);
        showToast({ type: "success", message: "Audio deleted successfully!" });
    }


    return (
        <div className='crud-audio-wrapper'>
            <Toast ref={toastRef} />
            {/* header */}
            <CrudHeader
                title="Upload or update audio"
                fileType="Add Audio"
                onClick={openAudioModal} />

            {/* Table */}
            <div className='table'>
                <div className='table-header'>
                    <div className='table-row'>
                        <div className='table-cell'>Audio</div>
                        <div className='table-cell'>Description</div>
                        <div className='table-cell'>Actions</div>
                    </div>
                </div>
                <div className='table-body'>
                    <div className='table-row'>
                        <div className='table-cell'>
                            <audio controls>
                                <source src="/assets/audios/alyad_palyad.mp3" type="audio/mpeg" />
                            </audio>
                        </div>
                        <div className='table-cell'>
                            Foley work sample from Alyad Palyad movie
                        </div>
                        <div className="table-cell action-buttons">
                            <img className='crud-action-icons' src="/assets/icons/ic_edit_pen_grey.svg" alt="Edit" onClick={openEditAudioModal} />
                            <img className='crud-action-icons' src="/assets/icons/trash.svg" alt="Delete" onClick={onOpenDeleteModal} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {editAudioModal &&
                <Modal isCloseAvailable={true} isOverlayClickable={true} isOverlayVisible={true} onClose={closeEditAudioModal}>
                    <AudioModal heading="Edit Audio" onClose={closeEditAudioModal} />
                </Modal>
            }


            {audioModal &&
                <Modal isCloseAvailable={true} isOverlayClickable={true} isOverlayVisible={true} onClose={closeAudioModal}>
                    <AudioModal heading="Add Audio" onClose={closeAudioModal} onSubmit={onSubmit} />
                </Modal>
            }

            {deleteAudioModal &&
                <ConfirmationModal
                    closeModalCb={() => setDeleteAudioModal(false)}
                    modalData={{
                        title: "Delete Audio",
                        description: "Are you sure you want to delete this audio?"
                    }}
                    footerButtons={[
                        {
                            name: "Cancel",
                            type: "secondary-button",
                            clickAction: onConfirmCancel
                        },
                        {
                            name: "Delete",
                            type: "primary-button",
                            clickAction: onConfirmDelete
                        }
                    ]}
                />
            }


        </div>
    )
}

export default CrudAudio