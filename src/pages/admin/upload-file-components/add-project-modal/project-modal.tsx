import { useState, useEffect } from 'react';
import Input from '../../../../components/inputs/input';
import './project-modal.scss';

const ProjectModal = ({ onClose, onSubmit, heading, project }: any) => {
    const [name, setName] = useState({ value: '', touched: false, error: '', isValid: false });
    const [description, setDescription] = useState({ value: '', touched: false, error: '', isValid: false });
    const [link, setLink] = useState({ value: '', touched: false, error: '', isValid: false });
    const [image, setImage] = useState({ value: '', touched: false, error: '', isValid: false });

    // Pre-fill form when editing
    useEffect(() => {
        if (project) {
            setName({ value: project.name, touched: true, error: '', isValid: true });
            setDescription({ value: project.description, touched: true, error: '', isValid: true });
            setLink({ value: project.link || '', touched: true, error: '', isValid: true });
            setImage({ value: project.cover_image || '', touched: true, error: '', isValid: true });
        }
    }, [project]);

    const validateField = (value: string, fieldName: string) => {
        if (!value.trim()) return `${fieldName} is required`;
        return '';
    };

    const handleChange = (setter: any, fieldName: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value;
        const error = validateField(value, fieldName);
        setter({ value, touched: true, error, isValid: !error });
    };

    const handleBlur = (setter: any, fieldName: string, value: string) => () => {
        const error = validateField(value, fieldName);
        setter({ value, touched: true, error, isValid: !error });
    };

    const isFormValid = name.isValid && description.isValid 
        // && link.isValid && image.isValid
        ;

    return (
        <div className='video-modal-wrapper'>
            <div className="modal-heading">{heading}</div>

            <div className='video-modal-inputs'>
                <Input label='Project Name *' placeholder='Enter Project Name'
                    onChange={handleChange(setName, 'Project Name')}
                    onBlur={handleBlur(setName, 'Project Name', name.value)}
                    value={name.value}
                />
                <Input label='Project Description *' component='Textarea' placeholder='Enter Project Description'
                    onChange={handleChange(setDescription, 'Project Description')}
                    onBlur={handleBlur(setDescription, 'Project Description', description.value)}
                    value={description.value}
                />
                <Input label='Project Link' placeholder='Enter Project Link'
                    onChange={handleChange(setLink, 'Project Link')}
                    onBlur={handleBlur(setLink, 'Project Link', link.value)}
                    value={link.value}
                />
                <Input label='Project Image' placeholder='Enter Project Image'
                    onChange={handleChange(setImage, 'Project Image')}
                    onBlur={handleBlur(setImage, 'Project Image', image.value)}
                    value={image.value}
                />
            </div>

            <div className='video-modal-buttons'>
                <div className='secondary-button' onClick={onClose}>Cancel</div>
                <button
                    className={`primary-button ${!isFormValid && 'disabled'}`}
                    disabled={!isFormValid}
                    onClick={() =>
                        onSubmit({
                            name: name.value,
                            description: description.value,
                            link: link.value,
                            cover_image: image.value
                        })
                    }
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default ProjectModal;
