import CrudHeader from '../crud-header/crud-header'
import './crud-video.scss'

const CrudVideo = () => {
    return (
        <div className='crud-video-wrapper'>

            <CrudHeader
                title="Upload or update video"
                fileType="Add Video"
                onClick={() => {
                    console.log("add video");
                }} />
            video
        </div>
    )
}

export default CrudVideo