import React from 'react';
import {BsTwitter, BsInstagram} from 'react-icons/bs';
import {FaYoutube} from 'react-icons/fa';

const SocialMedia = () => {
  return (
    <div className='app__social'>
        <div>
        <a href='https://twitter.com/Code_Veer' target='_blank' rel='noreferrer' >
        <BsTwitter />
        </a>
        </div>
        <div>
        <a href='https://www.youtube.com/@CodeVeer' target='_blank' rel='noreferrer'>
        <FaYoutube />
        </a> 
        </div>
        <div>
        <a href='https://www.instagram.com/code.veer/' target='_blank' rel='noreferrer'>
        <BsInstagram />
        </a>     
        </div>
    </div>
  )
}

export default SocialMedia;