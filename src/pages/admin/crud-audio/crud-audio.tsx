
import CrudHeader from '../crud-header/crud-header';
import './crud-audio.scss'
const CrudAudio = () => {
    return (
        <div className='crud-audio-wrapper'>

            <CrudHeader
                title="Upload or update audio"
                fileType="Add Audio"
                onClick={() => {
                    console.log("add audio");
                }} />
            audio
        </div>
    )
}

export default CrudAudio