'use client';

import NavigationDots from './NavigationDots';
import SocialMedia from './SocialMedia';

const d = new Date();
let year = d.getFullYear();

const AppWrap = (Component, idName, classNames) => function HOC(props) {
    return (
        <section id={idName} className={`app__container ${classNames}`} aria-label={idName}>
            <SocialMedia />

            <div className='app__wrapper app__flex'>
                <Component {...props} />
                <div className='copyright'>
                    <p className='p-text'>&copy;{year} SOMVEER KUMAR</p>
                </div>
            </div>
            <NavigationDots active={idName} />
        </section>
    );
};

export default AppWrap;
