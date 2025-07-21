import { useState } from "react";
import Input from "../../../../components/inputs/input"
import './video-modal.scss'

const VideoModal = ({ onClose, onSubmit, heading }: any) => {
    const [url, setUrl] = useState({
        value: '',
        touched: false,
        error: '',
        isValid: false,
    });
    const [description, setDescription] = useState({
        value: '',
        touched: false,
        error: '',
        isValid: false,
    });

    const validateUrl = (value: string) => {
        if (!value.trim()) return 'Video URL is required';
        return '';
    }

    const validateDescription = (value: string) => {
        if (!value.trim()) return 'Description is required';
        return '';
    }

    const onUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const error = validateUrl(value);
        setUrl({
            value,
            touched: true,
            error,
            isValid: !error,
        });
    };

    const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        const error = validateDescription(value);
        setDescription({
            value,
            touched: true,
            error,
            isValid: !error,
        });
    };

    const onUrlBlur = () => {
        setUrl(prevState => {
            const error = validateUrl(prevState.value);
            return {
                ...prevState,
                touched: true,
                error,
                isValid: !error,
            };
        });
    }

    const onDescriptionBlur = () => {
        setDescription(prevState => {
            const error = validateDescription(prevState.value);
            return {
                ...prevState,
                touched: true,
                error,
                isValid: !error,
            };
        });
    }

    const isFormValid = url.isValid && description.isValid;

    return (
        <div className="video-modal-wrapper">
            <div className="modal-heading">{heading} Video</div>

            <div className="video-modal-inputs">
                <Input
                    value={url.value}
                    label="Video URL"
                    placeholder="Enter video URL"
                    onChange={onUrlChange}
                    onBlur={onUrlBlur}
                    errortext={url.touched && url.error ? url.error : ''}
                />

                <Input
                    value={description.value}
                    component="Textarea"
                    label="Video Description"
                    placeholder="Enter video description"
                    onChange={onDescriptionChange}
                    onBlur={onDescriptionBlur}
                    errortext={description.touched && description.error ? description.error : ''}
                />
            </div>

            <div className="video-modal-buttons">
                <div className="secondary-button" onClick={onClose}>Cancel</div>
                <button
                    className={`primary-button ${!isFormValid ? 'disabled' : ''}`}
                    onClick={() => onSubmit({ url: url.value, description: description.value })}
                    disabled={!isFormValid}
                >
                    Submit
                </button>
            </div>
        </div>
    )
}

export default VideoModal;
