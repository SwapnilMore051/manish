import { useState, useEffect } from 'react';
import Input from '../../../../components/inputs/input';
import './video-modal.scss';
import getYouTubeEmbedUrl from '../../../../utils/embed-youtube-url';

type VideoFormData = {
    _id?: string;
    title: string;
    url: string;
    description: string;
};

interface VideoModalProps {
    heading: string;
    onClose: () => void;
    onSubmit: (data: VideoFormData) => void;
    initialData?: VideoFormData | null;
}

const VideoModal = ({ heading, onClose, onSubmit, initialData }: VideoModalProps) => {
    const [title, setTitle] = useState({
        value: '',
        touched: false,
        error: '',
        isValid: false,
    });

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

    // 👇 Pre-fill when editing
    useEffect(() => {
        if (initialData) {
            setTitle({ value: initialData.title ?? '', touched: true, error: '', isValid: true });
            setUrl({ value: initialData.url ?? '', touched: true, error: '', isValid: true });
            setDescription({ value: initialData.description ?? '', touched: true, error: '', isValid: true });
        }
    }, [initialData]);

    const validateTitle = (value: string) => (!value.trim() ? 'Title is required' : '');
    const validateUrl = (value: string) => (!value.trim() ? 'Video URL is required' : '');
    const validateDescription = (value: string) => (!value.trim() ? 'Description is required' : '');

    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const error = validateTitle(value);
        setTitle({ value, touched: true, error, isValid: !error });
    };

    const onUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const error = validateUrl(value);
        const embedUrl = value ? getYouTubeEmbedUrl(value) : "";
        setUrl({ value: embedUrl, touched: true, error, isValid: !error });
    };

    const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        const error = validateDescription(value);
        setDescription({ value, touched: true, error, isValid: !error });
    };

    const onTitleBlur = () =>
        setTitle((prev) => {
            const error = validateTitle(prev.value);
            return { ...prev, touched: true, error, isValid: !error };
        });

    const onUrlBlur = () =>
        setUrl((prev) => {
            const error = validateUrl(prev.value);
            return { ...prev, touched: true, error, isValid: !error };
        });

    const onDescriptionBlur = () =>
        setDescription((prev) => {
            const error = validateDescription(prev.value);
            return { ...prev, touched: true, error, isValid: !error };
        });

    const isFormValid = title.isValid && url.isValid && description.isValid;

    const handleSubmit = () => {
        if (!isFormValid) return;
        onSubmit({
            _id: initialData?._id,
            title: title.value,
            url: url.value,
            description: description.value,
        });
    };

    return (
        <div className="video-modal-wrapper">
            <div className="modal-heading">{heading}</div>
            <div className="video-modal-inputs">
                <Input
                    placeholder="Enter title"
                    label="Title"
                    onChange={onTitleChange}
                    onBlur={onTitleBlur}
                    value={title.value}
                    errortext={title.touched && title.error ? title.error : ''}
                />

                <Input
                    placeholder="Enter video URL"
                    label="Video URL"
                    onChange={onUrlChange}
                    onBlur={onUrlBlur}
                    value={url.value}
                    errortext={url.touched && url.error ? url.error : ''}
                />

                <Input
                    component="Textarea"
                    placeholder="Enter description"
                    label="Description"
                    onChange={onDescriptionChange}
                    onBlur={onDescriptionBlur}
                    value={description.value}
                    errortext={description.touched && description.error ? description.error : ''}
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

export default VideoModal;
