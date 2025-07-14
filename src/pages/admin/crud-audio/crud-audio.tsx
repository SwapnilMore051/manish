
import { useState } from 'react';
import Modal from '../../../components/modal/modal';
import CrudHeader from '../crud-header/crud-header';
import AudioModal from '../upload-file-components/add-audio-modal/audio-modal';
import './crud-audio.scss'

const CrudAudio = () => {

    const [audioModal, setAudioModal] = useState(false);
    const openAudioModal = () => setAudioModal(true);
    const closeAudioModal = () => setAudioModal(false);
    return (
        <div className='crud-audio-wrapper'>

            <CrudHeader
                title="Upload or update audio"
                fileType="Add Audio"
                onClick={openAudioModal} />


            {audioModal &&
                <Modal isCloseAvailable={true} isOverlayClickable={true} isOverlayVisible={true} onClose={closeAudioModal}>
                    <AudioModal />
                </Modal>
            }
            audio
        </div>
    )
}

export default CrudAudio