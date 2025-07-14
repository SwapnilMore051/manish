import { useState } from 'react';
import Modal from '../../../components/modal/modal';
import CrudHeader from '../crud-header/crud-header';
import GalleryModal from '../upload-file-components/add-gallery-modal/gallery-modal';
import './crud-gallery.scss'

const CrudGallery = () => {

    const [galleryModal, setGalleryModal] = useState(false);
    const closeGalleryModal = () => setGalleryModal(false);
    const openGalleryModal = () => setGalleryModal(true);

    return (
        <div className='crud-gallery-wrapper'>

            <CrudHeader
                title="Upload or update gallery"
                fileType="Add Gallery"
                onClick={openGalleryModal} />

            {galleryModal &&
                <Modal isCloseAvailable={true} isOverlayClickable={true} isOverlayVisible={true} onClose={closeGalleryModal}>
                    <GalleryModal />
                </Modal>
            }
            gallery
        </div>
    )
}

export default CrudGallery