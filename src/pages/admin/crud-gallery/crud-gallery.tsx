import CrudHeader from '../crud-header/crud-header';
import './crud-gallery.scss'

const CrudGallery = () => {
    return (
        <div className='crud-gallery-wrapper'>

            <CrudHeader
                title="Upload or update gallery"
                fileType="Add Gallery"
                onClick={() => {
                    console.log("add gallery");
                }} />
            gallery
        </div>
    )
}

export default CrudGallery