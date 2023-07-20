import React from 'react';
import {NavigationDots, SocialMedia} from "../components";
//Current Year
const d = new Date();
let year = d.getFullYear();

const AppWrap = (Component, idName, classNames) => function HOC(){

  return (
    <div id={idName} className={`app__container ${classNames}`}>
        <SocialMedia />

        <div className='app__wrapper app__flex'>
            <Component />
            <div className='copyright'>
                <p className='p-text'>&copy;{year} SOMVEER KUMAR</p>
                {/* <p className='p-text'>All rights reserved</p> */}
            </div>
        </div>
            <NavigationDots active={idName} />
    </div>
  )
}

export default AppWrap;