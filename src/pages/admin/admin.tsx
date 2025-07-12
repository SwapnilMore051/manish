import './admin.scss'
import { Link } from 'react-router-dom';

const Admin = () => {

    const adminSettings = [
        {
            id: 1,
            title: "Projects",
            description: "Add, update, and delete project entries and details.",
            icon: "/assets/icons/admin_image.png",
            link: "crud-projects",
        },
        {
            id: 2,
            title: "Video",
            description: "Upload, update, and delete videos showcasing your work.",
            icon: "/assets/icons/admin_video.png",
            link: "crud-video",
        },
        {
            id: 3,
            title: "Audio",
            description: "Upload, update, and delete audio tracks for the portfolio.",
            icon: "/assets/icons/admin_audio.png",
            link: "crud_audio",
        },
        {
            id: 4,
            title: "Gallery",
            description: "Upload, update, and delete image galleries and photos.",
            icon: "/assets/icons/admin_gallery.png",
            link: "crud-gallery",
        },

    ]

    return (
        <div className='admin-panel-wrapper'>
            <div className='admin-settings-section'>
                {adminSettings.map((setting, index) => (
                    <Link to={setting.link} className="admin-setting" key={index}>
                        <img className='setting-icon' src={setting.icon} alt={setting.title} />
                        <div className='setting-title-description'>
                            <div className='setting-title'>{setting.title}</div>
                            <div className='setting-description'>{setting.description}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
export default Admin