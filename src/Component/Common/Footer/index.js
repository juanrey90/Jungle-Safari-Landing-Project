/* eslint-disable react/jsx-no-target-blank */
import './styles.scss'
import { footer_left } from '../../../config';
import Button from '../Button';

function Footer() {
    return (
        <div className="footer-container">
            <p className='footer-title'>TODAY</p>
            <p className='footer-desc'>Today, we want you to join us Jungle Safari <br></br>Get ready to rock the stage.</p>
            <div className='footer-links'>
                <div className='footer-links-left'>
                    {
                        footer_left.map((item, key) =>
                          <a href={item.link} key={key} target='_blank'>
                            <img src={item.img}  alt='footer'/>
                          </a>
                        )
                    }
                </div>
                <div className='footer-links-right'>
                    <a href='https://discord.gg/junglesafari' target='_blank'><Button text='JOIN THE DISCORD COMMUNITY' /></a>
                </div>
            </div>
        </div>
    );
}

export default Footer;