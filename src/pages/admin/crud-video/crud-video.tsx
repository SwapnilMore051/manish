import { useRef, useState } from 'react';
import CrudHeader from '../crud-header/crud-header'
import './crud-video.scss'
import VideoModal from '../upload-file-components/add-video-modal/video-modal';
import Modal from '../../../components/modal/modal';
import type { ToastRefType } from '../../../components/models/toast';
import Toast from '../../../components/toast/toast';
import ConfirmationModal from '../../../components/confirmation-modal/confirmation-modal';
import '../../../components/common-api-table.scss'

const CrudVideo = () => {

    const [uploadVideo, setUploadVideo] = useState(false);
    const [editVideo, setEditVideo] = useState(false);
    const [deleteVideoModal, setDeleteVideoModal] = useState(false);

    const onModalClose = () => setUploadVideo(false);
    const onEditModalClose = () => setEditVideo(false);
    const showUploadVideo = () => setUploadVideo(true);

    const toastRef = useRef<ToastRefType>(null);
    const showToast = ({ type, message }: any) => {
        toastRef?.current?.showToast({ type, message });
    };
    const onSubmit = () => {
        showToast({ type: "success", message: "Video Uploaded successfully!" });
        setUploadVideo(false)
    }

    const editVideoModal = () => {
        setEditVideo(true);
    }

    const deleteVideo = () => {
        setDeleteVideoModal(true);
    }

    const onConfirmDelete = () => {
        showToast({ type: "success", message: "Video deleted successfully!" });
        setDeleteVideoModal(false);
    }

    const onConfirmCancel = () => {
        setDeleteVideoModal(false);
    }

    return (
        <div className='crud-video-wrapper'>

            <CrudHeader
                title="Upload or update video"
                fileType="Add Video"
                onClick={showUploadVideo} />

            {uploadVideo &&
                <Modal
                    isOverlayVisible={true}
                    isCloseAvailable={true}
                    onClose={onModalClose}
                >

                    <VideoModal heading="Add Video" onClose={onModalClose} onSubmit={onSubmit} />

                </Modal>

            }
            <Toast ref={toastRef} />
            {/* Videos will come from backend or database here */}
            <div className='table'>
                <div className="table-header">
                    <div className="table-row">
                        <div className="table-cell">Video</div>
                        <div className="table-cell">Description</div>
                        <div className="table-cell">Actions</div>
                    </div>
                </div>
                <div className='table-body'>
                    <div className="table-row">
                        <div className="table-cell">
                            <iframe
                                className='crud-video-sample'
                                src="https://www.youtube.com/embed/Ls02w5BTWFY"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="table-cell">
                            Foley work from Kichadi Bhat short film
                        </div>
                        <div className="table-cell action-buttons">
                            <img className='crud-action-icons' src="/assets/icons/ic_edit_pen_grey.svg" alt="Edit" onClick={editVideoModal} />
                            <img className='crud-action-icons' src="/assets/icons/trash.svg" alt="Delete" onClick={deleteVideo} />
                        </div>

                    </div>
                </div>
            </div>

            {editVideo &&
                <Modal
                    isOverlayVisible={true}
                    isCloseAvailable={true}
                    onClose={onEditModalClose}
                >

                    <VideoModal onClose={onEditModalClose} onSubmit={onSubmit} />

                </Modal>}

            {deleteVideoModal &&
                <ConfirmationModal
                    closeModalCb={() => setDeleteVideoModal(false)}
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
            {/* Videos Component */}
        </div>
    )
}

export default CrudVideo