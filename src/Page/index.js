/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import VLine from '../Component/Common/VLine'
import HLine from '../Component/Common/HLine'
import Join from '../Component/Common/Join'
import Meta from '../Component/Common/Meta'
import RoadMap from '../Component/Common/RoadMap'
import Mamber from '../Component/Common/Mamber'
import FAQs from '../Component/Common/FAQs'
import Footer from '../Component/Common/Footer'
import Filter from 'Component/Common/Filter'

import {animation_delay} from '../config';
import NavbarContainer from 'Container/NavbarContainer'
import DiscoverContainer from 'Container/DiscoverContainer'

function Index() {

  return (
      <div className='minting'>
          {/* <VLine /> */}
          <div className='row'>
              <HLine />
          </div>
          <div className='row'>
              <NavbarContainer />
          </div>
          <div className='row discover'>
              <DiscoverContainer />
          </div>
          <div 
              className='row join aos-item' 
              
             
          >
              <Join />
          </div>
          <div 
              className='row meta aos-item' 
              id='artworks'
          >
              <Meta />
          </div>
          <div className='row roadmap aos-item'>
              <RoadMap />
          </div>
          <div 
              className='row mamber aos-item'  
              id='team'
          >
              <Mamber />
          </div>
          <div className='row faqs'>
              <FAQs />
          </div>
          <div 
              className='row footer aos-item' 
              data-aos-duration={animation_delay}
          >
              {<Filter style={{background: '#6E2B34', left: '-25vw', bottom: 0}}/>}
              <Footer />
          </div>
      </div>
  )
}

export default Index;