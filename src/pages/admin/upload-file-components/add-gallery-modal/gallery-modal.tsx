import { useState } from 'react'
import Input from '../../../../components/inputs/input'
import './gallery-modal.scss'

const GalleryModal = ({ heading, onClose, onSubmit }: any) => {
    const [url, setUrl] = useState([])

    return (
        <div className='video-modal-wrapper'>
            <div className="modal-heading">{heading}</div>

            <Input label='Image Url' placeholder='Enter Image Url' />

            <div className="video-modal-buttons">
                <div className="secondary-button" onClick={onClose}>Cancel</div>
                <button
                    className="primary-button"
                    onClick={() => onSubmit()}
                >
                    Submit
                </button>
            </div>
        </div>
    )
}

export default GalleryModal