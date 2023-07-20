import React, {useEffect, useState} from 'react';

import {images} from '../../constants';
import {FaTwitter, FaInstagram, FaGithub, FaLinkedin} from 'react-icons/fa';
import {AppWrap, MotionWrap} from '../../wrapper';
import {client} from '../../client';
import './Footer.scss';

const Footer = () => {
  const [formData, setFormData] = useState({name:'', email:'', message:''
});
const [isFormSubmitted, setIsFormSubmitted] = useState(false);
const [loding, setLoding] = useState(false);
//for social contacts in smaller devices
const [widthOfViewport, setWidthOfViewport] = useState(window.innerWidth)
useEffect(() => {
  //for updating window size in useState every time window is changed
  const handleResize = () => {
    // console.log(window.innerWidth)
    setWidthOfViewport(window.innerWidth);
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
  

}, [])


const {name, email, message}=formData;

const handleChangeInput=(e)=>{
  const {name, value}= e.target;

  setFormData({...formData, [name]:value});
}

const handleSubmit=()=>{
  setLoding(true);

  const contact ={
    _type:'contact',
    name:name,
    email:email,
    message:message
  }

  client.create(contact)
    .then(()=>{
      setLoding(false);
      setIsFormSubmitted(true);
    })
}

  return (
    <>
      <h2 className='head-text'>Get in Touch <span>With Me</span></h2>
      <div className='app__footer-cards'>
      
      {/* for Smaller devices when social media icon of AppWrap getting removed from the side */
        widthOfViewport<500 &&
        <div className=' mobile-social-contacts '> 
          
          <a href='https://twitter.com/Code_Veer' target='_blank' rel='noreferrer' ><FaTwitter /></a>
          <a href='https://www.instagram.com/code.veer/' target='_blank' rel='noreferrer' ><FaInstagram /></a>
          <a href='https://github.com/SomveerKr' target='_blank' rel='noreferrer' ><FaGithub /></a>
          <a href='https://www.linkedin.com/in/somveerkumar/' target='_blank' rel='noreferrer' ><FaLinkedin /></a>
        </div> }

        <div className='app__footer-card'> 
          <img src={images.email} alt='email' />
          <a href='mailto:7somveerkumar@gmail.com' className='p-text '>7somveerkumar@gmail.com</a>
        </div>
        
        <div className='app__footer-card'> 
          <img src={images.mobile} alt='mobile' />
          <a href='tel:+91 7982577434' className='p-text '>+91 79*****434</a>
        </div>
      </div>


      {!isFormSubmitted ?
        <div className='app__footer-form app__flex'>
        <div className='app__flex'>
          <input className='p-text' type='text' placeholder='Your Name' name='name' value={name} onChange={handleChangeInput} />
        </div>
        <div className='app__flex'>
          <input className='p-text' type='email' placeholder='Your Email' name='email' value={email} onChange={handleChangeInput} />
        </div>
        <div>
          <textarea
          className='p-text'
          placeholder='Your Message'
          value={message}
          name='message'
          onChange={handleChangeInput}
           />
        </div>
        <button type='button' className='p-text' onClick={handleSubmit}>{loding ? 'Sending' :'Send Message'}</button>
      </div>
      :
      <div>
        <h3 className='head-text'>Thank You for Getting in Touch with Me!</h3>
      </div>
      }
      
    </>
  )
}

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__primarybg'
)