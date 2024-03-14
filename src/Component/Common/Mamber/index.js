import './styles.scss'

import { mambers, animation_delay } from '../../../config';

function Mamber() {
    return (
        <div
            data-aos="fade-up"
            data-aos-duration={animation_delay} 
            className="mamber-container"
        >
            <p className='mamber-title'>OUR TEAM MEMBER</p>
            <div className='mamber-content'>
                {
                    mambers.map((mamber, key) =>
                        <div className='mamber-item' key={key}>
                            <div className='mamber-item-img'>
                                <img src={mamber.img} alt='mamber'/>
                            </div>
                            <div className='mamber-item-name'>
                                {mamber.name}
                            </div>
                            <div className='mamber-item-role'>
                                {mamber.role}
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Mamber;