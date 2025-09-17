import { useState } from 'react';
import Input from '../../../../components/inputs/input'
import './audio-modal.scss'



type AudioFormData = {
    image: string;
    audio: string;
    description: string;
};

interface AudioModalProps {
    heading: string;
    onClose: () => void;
    onSubmit: (data: AudioFormData) => void;
}

const AudioModal = ({ heading, onClose, onSubmit }: AudioModalProps) => {
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

    const validateImage = (value: string) => {
        if (!value.trim()) return 'Image URL is required';
        return '';
    }

    const validateAudio = (value: string) => {
        if (!value.trim()) return 'Audio URL is required';
        return '';
    }

    const validateDescription = (value: string) => {
        if (!value.trim()) return 'Description is required';
        return '';
    }

    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const error = validateImage(value);
        setImage({
            value,
            touched: true,
            error,
            isValid: !error,
        });
    }

    const onAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const error = validateAudio(value);
        setAudio({
            value,
            touched: true,
            error,
            isValid: !error,
        });
    }

    const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        const error = validateDescription(value);
        setDescription({
            value,
            touched: true,
            error,
            isValid: !error,
        });
    }

    const onImageBlur = () => {
        setImage(prevState => {
            const error = validateImage(prevState.value);
            return {
                ...prevState,
                touched: true,
                error,
                isValid: !error,
            };
        });
    }

    const onAudioBlur = () => {
        setAudio(prevState => {
            const error = validateAudio(prevState.value);
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

    const isFormValid = image.isValid && audio.isValid && description.isValid;

    const handleSubmit = () => {
        if (!isFormValid) return;
        onSubmit({
            image: image.value,
            audio: audio.value,
            description: description.value,
        });
    };
    return (
        <div className='video-modal-wrapper'>
            <div className='modal-heading'>{heading}</div>
            <div className='video-modal-inputs'>
                <Input placeholder='Enter Image link' label='Cover Image Link' onChange={onImageChange} onBlur={onImageBlur} value={image.value} />
                <Input placeholder='Enter Audio link' label='Audio Link' onChange={onAudioChange} onBlur={onAudioBlur} value={audio.value} />
                <Input component='Textarea' placeholder='Enter Description' label='Description' onChange={onDescriptionChange} onBlur={onDescriptionBlur} value={description.value} />
            </div>
            <div className="video-modal-buttons">
                <div className="secondary-button" onClick={onClose}>Cancel</div>
                <button
                    className={`primary-button ${!isFormValid ? 'disabled' : ''}`}
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                >
                    Submit
                </button>
            </div>
        </div>
    )
}

export default AudioModal