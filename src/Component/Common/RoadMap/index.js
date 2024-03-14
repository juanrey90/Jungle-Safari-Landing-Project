import Filter from '../Filter';
import './styles.scss'

import { roadmap_contents } from '../../../config';

function RoadMap() {
    return (
        <>
        <Filter style={{background: '#54136F', right: '-5vw', top: 0}}/>
        
        <div className="roadmap-container" id='roadmap'>
            <p className='roadmap-title'>THE ROADMAP</p>
            <div className='roadmap-content'>
                {roadmap_contents.map((item, key) => 
                    <div className='roadmap-content-item'  key={key}>
                        <div className='roadmap-content-item-border-vertical'>

                        </div>
                        <div className='roadmap-content-item-border-horizontal'>
                            <img src='/assets/img/roadmap/circle.png' alt='circle'/>
                        </div>
                        <div className='roadmap-content-item-symbol'>

                        </div>
                        <div 
                            className='
                                roadmap-content-item-text 
                                aos-item
                            '
                            data-aos="fade-up"
                            data-aos-duration={500}
                        >
                            {/* <p className='roadmap-content-item-title'>
                                {item.title}
                            </p> */}
                            <p className='roadmap-content-item-content'>
                                {item.content}
                            </p>
                            <div className='roadmap-content-item-desc'>
                                {
                                    item.desc.map((desc_item, i) => <div key={i}>
                                        {desc_item}
                                    </div>)
                                }
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
        </>
    );
}

export default RoadMap;