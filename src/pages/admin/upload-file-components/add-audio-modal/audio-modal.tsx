import { useState, useEffect } from 'react';
import Input from '../../../../components/inputs/input';
import './audio-modal.scss';

type AudioFormData = {
    _id?: string;
    image: string;
    audio: string;
    description: string;
};

interface AudioModalProps {
    heading: string;
    onClose: () => void;
    onSubmit: (data: AudioFormData) => void;
    initialData?: AudioFormData | null;
}

const AudioModal = ({ heading, onClose, onSubmit, initialData }: AudioModalProps) => {
    const [image, setImage] = useState({
        value: '',
        touched: false,
        error: '',
        isValid: false,
    });

    const [audio, setAudio] = useState({
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

    // 👇 Pre-fill when editing
    useEffect(() => {
        if (initialData) {
            setImage({ value: initialData.image, touched: true, error: '', isValid: true });
            setAudio({ value: initialData.audio, touched: true, error: '', isValid: true });
            setDescription({ value: initialData.description, touched: true, error: '', isValid: true });
        }
    }, [initialData]);

    const validateImage = (value: string) => (!value.trim() ? 'Image URL is required' : '');
    const validateAudio = (value: string) => (!value.trim() ? 'Audio URL is required' : '');
    const validateDescription = (value: string) => (!value.trim() ? 'Description is required' : '');

    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const error = validateImage(value);
        setImage({ value, touched: true, error, isValid: !error });
    };

    const onAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const error = validateAudio(value);
        setAudio({ value, touched: true, error, isValid: !error });
    };

    const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        const error = validateDescription(value);
        setDescription({ value, touched: true, error, isValid: !error });
    };

    const onImageBlur = () =>
        setImage((prev) => {
            const error = validateImage(prev.value);
            return { ...prev, touched: true, error, isValid: !error };
        });

    const onAudioBlur = () =>
        setAudio((prev) => {
            const error = validateAudio(prev.value);
            return { ...prev, touched: true, error, isValid: !error };
        });

    const onDescriptionBlur = () =>
        setDescription((prev) => {
            const error = validateDescription(prev.value);
            return { ...prev, touched: true, error, isValid: !error };
        });

    const isFormValid = image.isValid && audio.isValid && description.isValid;

    const handleSubmit = () => {
        if (!isFormValid) return;
        onSubmit({
            _id: initialData?._id, // keep id if editing
            image: image.value,
            audio: audio.value,
            description: description.value,
        });
    };

    return (
        <div className="video-modal-wrapper">
            <div className="modal-heading">{heading}</div>
            <div className="video-modal-inputs">
                <Input
                    placeholder="Enter Image link"
                    label="Cover Image Link"
                    onChange={onImageChange}
                    onBlur={onImageBlur}
                    value={image.value}
                />
                <Input
                    placeholder="Enter Audio link"
                    label="Audio Link"
                    onChange={onAudioChange}
                    onBlur={onAudioBlur}
                    value={audio.value}
                />
                <Input
                    component="Textarea"
                    placeholder="Enter Description"
                    label="Description"
                    onChange={onDescriptionChange}
                    onBlur={onDescriptionBlur}
                    value={description.value}
                />
            </div>
            <div className="video-modal-buttons">
                <div className="secondary-button" onClick={onClose}>
                    Cancel
                </div>
                <button
                    className={`primary-button ${!isFormValid ? 'disabled' : ''}`}
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                >
                    {initialData ? 'Update' : 'Submit'}
                </button>
            </div>
        </div>
    );
};

export default AudioModal;
