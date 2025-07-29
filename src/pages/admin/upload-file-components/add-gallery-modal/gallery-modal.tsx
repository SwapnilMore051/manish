import './gallery-modal.scss'

const GalleryModal = ({ heading, onClose, onSubmit }: any) => {
    return (
        <div className='video-modal-wrapper'>
            <div className="modal-heading">{heading}</div>

            <div>
                <input type="file" />
            </div>

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