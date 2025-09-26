import './audios.scss';

const Audios = () => {
    const audioList = [
        {
            file: 'alyad_palyad.mp3',
            image: "/assets/icons/alyad-palyad.jpg",
            description: 'Foley work sample from Alyad Palyad movie',
        },
    ];

    return (
        <div className='audio-outlet'>
            <div className='title'>Audios</div>
            <div className='audio-wrapper'>
                {audioList.map((audio, index) => (
                    <div key={index} className="audio-item">
                        <img className='audio-cover-image' src={audio.image} alt="/assets/icons/audio-img-2.jpg" />
                        <audio controls
                            controlsList="nodownload">
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
