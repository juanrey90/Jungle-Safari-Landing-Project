import Collapsible from 'react-collapsible';
import Filter from '../Filter';
import { faqs_content } from '../../../config';
import './styles.scss'

function FAQs() {
    const trigger = (title) => (<div className='trigger'>
        <div className='trigger-title'>
            {title}
        </div>
        <div className='trigger-symbol'>
        </div>
    </div>);

    return (
        <div className="faqs-container" id='faqs'>
            <Filter style={{background: '#54136F', right: '-5vw', top: 0}}/>
            <p className='faqs-title'>FAQS</p>
            {/* <p className='faqs-desc'>We're here to answer any questions you have about The Jungle Safari! Here are some of the most frequently asked questions:</p> */}
            <div className='faqs-content'>
                {
                    faqs_content.map((item, key) => 
                    <div 
                        className='faqs-content-item aos-item' 
                        key={key}
                        data-aos="fade-up"
                        data-aos-duration={500}
                    >
                        <Collapsible trigger={trigger(item.title)}>
                            <p>
                                {item.desc}
                            </p>
                        </Collapsible>
                    </div>)
                }

            </div>
        </div>
    );
}

export default FAQs;