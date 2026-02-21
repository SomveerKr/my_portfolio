'use client';

import { BsTwitter, BsGithub } from 'react-icons/bs';
import { FaYoutube } from 'react-icons/fa';

const SocialMedia = () => {
    return (
        <div className='app__social'>
            <div>
                <a href='https://twitter.com/Code_Veer' target='_blank' rel='noreferrer' aria-label='Follow Somveer Kumar on Twitter'>
                    <BsTwitter />
                </a>
            </div>
            <div>
                <a href='https://www.youtube.com/@CodeVeer' target='_blank' rel='noreferrer' aria-label='Somveer Kumar YouTube channel'>
                    <FaYoutube />
                </a>
            </div>
            <div>
                <a href='https://github.com/SomveerKr' target='_blank' rel='noreferrer' aria-label='Follow Somveer Kumar on Github'>
                    <BsGithub />
                </a>
            </div>
        </div>
    );
};

export default SocialMedia;
