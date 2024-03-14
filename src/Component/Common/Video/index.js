import videofile from '../../../video/roadmap.mp4';
import './index.scss';

const Video = () => {
  return(
    // <div className='video-container'>
      <video className='video-content' loop muted autoPlay>
        <source src={videofile} type="video/mp4" />
      </video>
    // </div>
  )
}

export default Video;