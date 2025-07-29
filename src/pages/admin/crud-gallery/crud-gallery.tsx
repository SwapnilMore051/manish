import { useRef, useState } from 'react';
import Modal from '../../../components/modal/modal';
import CrudHeader from '../crud-header/crud-header';
import GalleryModal from '../upload-file-components/add-gallery-modal/gallery-modal';
import './crud-gallery.scss'
import type { ToastRefType } from '../../../components/models/toast';
import Toast from '../../../components/toast/toast';
import ConfirmationModal from '../../../components/confirmation-modal/confirmation-modal';

const CrudGallery = () => {

    const [uploadGalleryModal, setUploadGalleryModal] = useState(false);
    const [editGalleryModal, setEditGalleryModal] = useState(false);
    const [deleteGalleryModal, setDeleteGalleryModal] = useState(false);

    const closeUloadGalleryModal = () => setUploadGalleryModal(false);
    const openUploadGalleryModal = () => setUploadGalleryModal(true);

    const toastRef = useRef<ToastRefType>(null);
    const showToast = ({ type, message }: any) => {
        toastRef?.current?.showToast({ type, message });
    };

    const onConfirmDelete = () => {
        showToast({ type: "success", message: "Video deleted successfully!" });
        setDeleteGalleryModal(false);
    }

    const onUploadSubmit = () => {
        showToast({ type: "success", message: "Video Uploaded successfully!" });
        setUploadGalleryModal(false)
    }
    const onEditSubmit = () => {
        showToast({ type: "success", message: "Video Edited successfully!" });
        setEditGalleryModal(false)
    }

    const onConfirmCancel = () => {
        setDeleteGalleryModal(false);
    }

    const deleteGallery = () => {
        setDeleteGalleryModal(true);
    }

    const editGallery = () => {
        setEditGalleryModal(true);
    }

    const closeEditGalleryModal = () => {
        setEditGalleryModal(false);
    }



    return (
        <div className='crud-gallery-wrapper'>

            <CrudHeader
                title="Upload or update gallery"
                fileType="Add Gallery"
                onClick={openUploadGalleryModal} />

            {uploadGalleryModal &&
                <Modal isCloseAvailable={true} isOverlayClickable={true} isOverlayVisible={true} onClose={closeUloadGalleryModal}>
                    <GalleryModal heading="Upload File" onClose={closeUloadGalleryModal} onSubmit={onUploadSubmit} />
                </Modal>
            }

            {editGalleryModal &&
                <Modal isCloseAvailable={true} isOverlayClickable={true} isOverlayVisible={true} onClose={closeEditGalleryModal}>
                    <GalleryModal heading="Edit File" onClose={closeEditGalleryModal} onSubmit={onEditSubmit} />
                </Modal>
            }

            <Toast ref={toastRef} />
            {/* Videos will come from backend or database here */}
            <div className='table'>
                <div className="table-header">
                    <div className="table-row">
                        <div className="table-cell">Image / Video</div>
                        <div className="table-cell">Description</div>
                        <div className="table-cell">Actions</div>
                    </div>
                </div>
                <div className='table-body'>
                    <div className="table-row">
                        <div className="table-cell">
                            <img src="/assets/icons/bts1.jpg" alt="" width={100} />
                        </div>
                        <div className="table-cell">
                            Foley work from Kichadi Bhat short film
                        </div>
                        <div className="table-cell action-buttons">
                            <img className='crud-action-icons' src="/assets/icons/ic_edit_pen_grey.svg" alt="Edit" onClick={editGallery} />
                            <img className='crud-action-icons' src="/assets/icons/trash.svg" alt="Delete" onClick={deleteGallery} />
                        </div>

                    </div>
                </div>
            </div>

            {deleteGalleryModal &&

                <ConfirmationModal
                    closeModalCb={() => setDeleteGalleryModal(false)}
                    modalData={{
                        title: "Delete Video",
                        description: "Are you sure you want to delete this video?"
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

export default CrudGallery