import './bts.scss'

const BehindTheScene = () => {

    const btsImages = [
        'bts1.jpg',
        'bts2.jpg',
        'bts4.jpg',
        'bts5.jpg',
        'bts3.jpg',
    ]
    return (
        <div className='bts-wrapper'>
            <div className='title'>Behind The Scene</div>
            <div className='bts-image-container'>
                {btsImages.map((image, index) => (
                    <div key={index}>
                        <img className='bts-image' src={`/assets/icons/${image}`} alt="behind the scene" />
                    </div>
                ))}
            </div>

        </div>
    )
}

export default BehindTheScene