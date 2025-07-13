import { useRef, useState } from 'react';
import CrudHeader from '../crud-header/crud-header'
import './crud-video.scss'
import VideoModal from '../upload-file-components/add-video-modal/video-modal';
import Modal from '../../../components/modal/modal';
import type { ToastRefType } from '../../../components/models/toast';
import Toast from '../../../components/toast/toast';

const CrudVideo = () => {

    const [uploadVideo, setUploadVideo] = useState(false);
    const onModalClose = () => setUploadVideo(false);
    const showUploadVideo = () => setUploadVideo(true);

    const toastRef = useRef<ToastRefType>(null);
    const showToast = ({ type, message }: any) => {
        toastRef?.current?.showToast({ type, message });
    };
    const onSubmit = () => {
        showToast({ type: "success", message: "Video Uploaded successfully!" });
        setUploadVideo(false)

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

                    <VideoModal onClose={onModalClose} onSubmit={onSubmit} />

                </Modal>

            }
            <Toast ref={toastRef} />
            {/* Videos will come from backend or database here */}
            {/* Videos Component */}
        </div>
    )
}

export default CrudVideo