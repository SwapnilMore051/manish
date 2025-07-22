import { useState } from 'react';
import Input from '../../../../components/inputs/input'
import './project-modal.scss'

const ProjectModal = ({ onClose, onSubmit, heading }: any) => {
    const [name, setName] = useState({
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
    const [link, setLink] = useState({
        value: '',
        touched: false,
        error: '',
        isValid: false,
    });
    const [image, setImage] = useState({
        value: '',
        touched: false,
        error: '',
        isValid: false,
    });

    const validateName = (value: string) => {
        if (!value.trim()) return 'Name is required';
        return '';
    }

    const validateDescription = (value: string) => {
        if (!value.trim()) return 'Description is required';
        return '';
    }

    const validateLink = (value: string) => {
        if (!value.trim()) return 'Link is required';
        return '';
    }

    const validateImage = (value: string) => {
        if (!value.trim()) return 'Image is required';
        return '';
    }

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const error = validateName(value);
        setName({
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

    const onLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const error = validateLink(value);
        setLink({
            value,
            touched: true,
            error,
            isValid: !error,
        });
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

    const onNameBlur = () => {
        setName(prevState => {
            const error = validateName(prevState.value);
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

    const onLinkBlur = () => {
        setLink(prevState => {
            const error = validateLink(prevState.value);
            return {
                ...prevState,
                touched: true,
                error,
                isValid: !error,
            };
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

    const isFormValid = name.isValid && description.isValid && link.isValid && image.isValid;


    return (
        <div className='video-modal-wrapper'>
            <div className="modal-heading">{heading}</div>

            <div className='video-modal-inputs'>
                <Input label='Project Name' placeholder='Enter Project Name' onChange={onNameChange} onBlur={onNameBlur} value={name.value} />
                <Input label='Project Description' component='Textarea' placeholder='Enter Project Description' onChange={onDescriptionChange} onBlur={onDescriptionBlur} value={description.value} />
                <Input label='Project Link' placeholder='Enter Project Link' onChange={onLinkChange} onBlur={onLinkBlur} value={link.value} />
                <Input label='Project Image' placeholder='Enter Project Image' onChange={onImageChange} onBlur={onImageBlur} value={image.value} />
            </div>
            <div className='video-modal-buttons'>
                <div className='secondary-button' onClick={onClose}>Cancel</div>
                <button className={`primary-button ${!isFormValid && 'disabled'}`} onClick={onSubmit} disabled={!isFormValid} >Submit</button>
            </div>
        </div>
    )
}

export default ProjectModal