import './audios.scss';

const Audios = () => {
    const audioList = [
        {
            file: 'audio_1.mp3',
            image: "/assets/icons/audio-img-1.jpg",
            description: 'Relaxing forest ambience',
        },
        {
            file: 'audio_2.mp3',
            image: "/assets/icons/audio-img-2.jpg",
            description: 'City rain sounds',
        },
        {
            file: 'audio_1.mp3',
            image: "/assets/icons/audio-img-1.jpg",
            description: 'Relaxing forest ambience',
        },
        {
            file: 'audio_2.mp3',
            image: "/assets/icons/audio-img-2.jpg",
            description: 'City rain sounds',
        },
        {
            file: 'audio_1.mp3',
            image: "/assets/icons/audio-img-1.jpg",
            description: 'Relaxing forest ambience',
        },
        {
            file: 'audio_2.mp3',
            image: "/assets/icons/audio-img-2.jpg",
            description: 'City rain sounds',
        },
        {
            file: 'audio_2.mp3',
            image: "/assets/icons/audio-img-2.jpg",
            description: 'City rain sounds',
        },
    ];

    return (
        <div className='audio-outlet'>
            <div className='title'>Audios</div>
            <div className='audio-wrapper'>
                {audioList.map((audio, index) => (
                    <div key={index} className="audio-item">
                        <img className='audio-cover-image' src={audio.image} alt="/assets/icons/audio-img-2.jpg" />
                        <audio controls>
                            <source src={`/assets/audios/${audio.file}`} type="audio/mpeg" />
                        </audio>
                        <div className="audio-description">{audio.description}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Audios;
