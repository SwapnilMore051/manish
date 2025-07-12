import Input from "../../../../components/inputs/input"
import './video-modal.scss'
const VideoModal = ({ onClose, onSubmit }: any) => {


    return (
        <div className="video-modal-wrapper">
            <div className="modal-heading">Upload Video</div>

            <div className="video-modal-inputs">
                <Input label="Video URL" placeholder="Enter video URL" />
                <Input component="Textarea" label="Video Description" placeholder="Enter video description" />
            </div>

            <div className="video-modal-buttons">
                <div className="secondary-button" onClick={onClose}>Cancel</div>
                <div className="primary-button" onClick={onSubmit}>Submit</div>
            </div>
        </div>
    )
}

export default VideoModal