/* eslint-disable */
import { useState } from 'react';
import Button from '../Button';
import Filter from '../Filter';
import './styles.scss'
import {animation_delay} from '../../../config';

function Discover() {
    return (
        <>
            <Filter style={{background: '#6E2B34', left: 0, top: 0}}/>
            <div 
                className="left aos-item"
                data-aos="fade-up"
                data-aos-duration={animation_delay}
            >
                <Filter style={{background: '#170725', right: 0, bottom: 0}}/>
                <p className='title'>
                    Become a Tribe member of Jungle Safari
                </p>
                
                
                <div>
                
                <div className='mint-btn'>
                  <a href='https://discord.gg/junglesafari' target='_blank'>
                    <Button text={'JOIN OUR DISCORD'}                   
                    />
                  </a>
                </div>
                
                </div>
            </div>
            <div
                className="right aos-item"
                data-aos="fade-up"
                data-aos-duration={animation_delay}
            >
                <Filter style={{background: '#54136F', left: 0, bottom: 0}}/>
                <img
                    src='assets/img/member/1.png'
                    className='image'
                    alt='discover'
                />
            </div>
        </>
    );
}

export default Discover;