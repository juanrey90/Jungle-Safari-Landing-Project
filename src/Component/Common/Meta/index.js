import Slider from '../Slider/Slider';
import './styles.scss'

import {animation_delay } from '../../../config'

function Meta() {
    return (
        <div 
            className="meta-container"
            data-aos="zoom-in"
            data-aos-duration={animation_delay}
        >
            <p className='meta-title'>THE JUNGLE SAFARI</p>
            <Slider />
        </div>
    );
}

export default Meta;