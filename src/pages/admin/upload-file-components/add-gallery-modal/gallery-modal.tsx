import { useState, useEffect } from 'react';
import Input from '../../../../components/inputs/input';
import './gallery-modal.scss';

type GalleryFormData = {
    _id?: string;
    image: string;
    description: string;
};

interface GalleryModalProps {
    heading: string;
    onClose: () => void;
    onSubmit: (data: GalleryFormData) => void;
    initialData?: GalleryFormData | null;
}

const GalleryModal = ({ heading, onClose, onSubmit, initialData }: GalleryModalProps) => {
    const [image, setImage] = useState({
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

    // Prefill form on edit
    useEffect(() => {
        if (initialData) {
            setImage({ value: initialData.image, touched: true, error: '', isValid: true });
            setDescription({ value: initialData.description, touched: true, error: '', isValid: true });
        }
    }, [initialData]);

    // Validation
    const validateImage = (value: string) => (!value.trim() ? 'Image URL is required' : '');
    const validateDescription = (value: string) =>
        !value.trim() ? 'Description is required' : '';

    // Handlers
    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const error = validateImage(value);
        setImage({ value, touched: true, error, isValid: !error });
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

    const onDescriptionBlur = () =>
        setDescription((prev) => {
            const error = validateDescription(prev.value);
            return { ...prev, touched: true, error, isValid: !error };
        });

    const isFormValid = image.isValid && description.isValid;

    const handleSubmit = () => {
        if (!isFormValid) return;
        onSubmit({
            _id: initialData?._id,
            image: image.value,
            description: description.value,
        });
    };

    return (
        <div className="video-modal-wrapper">
            <div className="modal-heading">{heading}</div>
            <div className="video-modal-inputs">
                <Input
                    placeholder="Enter Image URL"
                    label="Image URL"
                    onChange={onImageChange}
                    onBlur={onImageBlur}
                    value={image.value}
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

export default GalleryModal;
