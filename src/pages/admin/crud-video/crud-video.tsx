import { useState } from 'react';
import CrudHeader from '../crud-header/crud-header'
import './crud-video.scss'
import VideoModal from '../upload-file-components/add-video-modal/video-modal';
import Modal from '../../../components/modal/modal';

const CrudVideo = () => {

    const [uploadVideo, setUploadVideo] = useState(false);
    const onModalClose = () => setUploadVideo(false);
    const showUploadVideo = () => setUploadVideo(true);
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
                    // isOverlayClickable={true}
                    onClose={onModalClose}
                    >

                    <VideoModal />

                </Modal>
            }
            video
        </div>
    )
}

export default CrudVideo