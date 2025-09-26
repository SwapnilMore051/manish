import { useState, useEffect } from 'react';
import Input from '../../../../components/inputs/input';
import Radio from '../../../../components/radio/radio';
import './gallery-modal.scss';

interface GalleryModalProps {
    heading: string;
    onClose: () => void;
    onSubmit: (data: { url: string; type: 'image' | 'video'; description: string }) => void;
    initialData?: { url: string; type: 'image' | 'video'; description: string } | null;
}

const GalleryModal = ({ heading, onClose, onSubmit, initialData }: GalleryModalProps) => {
    const [url, setUrl] = useState({ value: '', touched: false, error: '', isValid: false });
    const [description, setDescription] = useState({ value: '', touched: false, error: '', isValid: false });
    const [isImageChecked, setIsImageChecked] = useState(true);
    const [isVideoChecked, setIsVideoChecked] = useState(false);

    // Prefill on edit
    useEffect(() => {
        if (initialData) {
            setUrl({ value: initialData.url, touched: true, error: '', isValid: true });
            setDescription({ value: initialData.description, touched: true, error: '', isValid: true });
            setIsImageChecked(initialData.type === 'image');
            setIsVideoChecked(initialData.type === 'video');
        }
    }, [initialData]);

    const validateUrl = (value: string) => (!value.trim() ? 'URL is required' : '');
    const validateDescription = (value: string) => (!value.trim() ? 'Description is required' : '');

    const onUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const error = validateUrl(value);
        setUrl({ value, touched: true, error, isValid: !error });
    };

    const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        const error = validateDescription(value);
        setDescription({ value, touched: true, error, isValid: !error });
    };

    const onUrlBlur = () => {
        setUrl(prev => ({ ...prev, touched: true, error: validateUrl(prev.value), isValid: !validateUrl(prev.value) }));
    };

    const onDescriptionBlur = () => {
        setDescription(prev => ({
            ...prev,
            touched: true,
            error: validateDescription(prev.value),
            isValid: !validateDescription(prev.value),
        }));
    };

    const handleRadioSelect = (value: 'image' | 'video') => {
        if (value === 'image') {
            setIsImageChecked(true);
            setIsVideoChecked(false);
        } else {
            setIsImageChecked(false);
            setIsVideoChecked(true);
        }
    };

    const isFormValid = url.isValid && description.isValid;

    const handleSubmit = () => {
        if (!isFormValid) return;
        onSubmit({
            url: url.value,
            type: isImageChecked ? 'image' : 'video',
            description: description.value,
        });
    };

    return (
        <div className="video-modal-wrapper">
            <div className="modal-heading">{heading}</div>

            <Input
                label="File URL"
                placeholder="Enter Google Drive URL"
                value={url.value}
                onChange={onUrlChange}
                onBlur={onUrlBlur}
                errortext={url.touched && url.error ? url.error : ''}
            />

            <div className="radio-group">
                <label>Select type:</label>
                <div style={{ display: 'flex', gap: '20px', marginTop: '5px' }}>
                    <Radio
                        label="Image"
                        onClick={() => handleRadioSelect('image')}
                        labelClick={() => handleRadioSelect('image')}
                        classes={isImageChecked ? 'checked' : ''}
                    />
                    <Radio
                        label="Video"
                        onClick={() => handleRadioSelect('video')}
                        labelClick={() => handleRadioSelect('video')}
                        classes={isVideoChecked ? 'checked' : ''}
                    />
                </div>
            </div>

            <Input
                component="Textarea"
                label="Description"
                placeholder="Enter description"
                value={description.value}
                onChange={onDescriptionChange}
                onBlur={onDescriptionBlur}
                errortext={description.touched && description.error ? description.error : ''}
            />

            <div className="video-modal-buttons">
                <div className="secondary-button" onClick={onClose}>Cancel</div>
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

export default GalleryModal;
