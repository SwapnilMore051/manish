import { useNavigate } from 'react-router-dom';
import './crud-header.scss'

const CrudHeader = ({ title, fileType, onClick }: any) => {

    const navigate = useNavigate();
    const onBackClick = () => navigate('/admin');

    return (
        <div className='crud-header-wrapper'>
            <div className='hamburger' onClick={onBackClick}>
                <img src="/assets/icons/arrow_left.svg" alt="" />
                <div className='hamburger-title'>Admin Settings</div>
            </div>
            <div className='crud-update-title'>{title}</div>
            <div className='add-file-button' onClick={onClick}>
                <img src="/assets/icons/ic_add.svg" alt="" />
                <div className='add-file-title'>{fileType}</div>
            </div>
        </div>
    )
}

export default CrudHeader