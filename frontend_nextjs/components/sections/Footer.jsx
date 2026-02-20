'use client';

import { useState, useEffect } from 'react';
import images from '@/constants/images';
import { FaTwitter, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';
import AppWrap from '@/components/AppWrap';
import MotionWrap from '@/components/MotionWrap';
import { client } from '@/lib/sanity';
import './Footer.scss';

const Footer = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', message: ''
    });
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [loding, setLoding] = useState(false);
    const [widthOfViewport, setWidthOfViewport] = useState(0);

    useEffect(() => {
        setWidthOfViewport(window.innerWidth);

        const handleResize = () => {
            setWidthOfViewport(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const { name, email, message } = formData;

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        setLoding(true);

        const contact = {
            _type: 'contact',
            name: name,
            email: email,
            message: message
        };

        client.create(contact)
            .then(() => {
                setLoding(false);
                setIsFormSubmitted(true);
            });
    };

    return (
        <>
            <h2 className='head-text'>Get in Touch <span>With Me</span></h2>
            <div className='app__footer-cards'>

                {widthOfViewport < 500 &&
                    <div className='mobile-social-contacts'>
                        <a href='https://twitter.com/Code_Veer' target='_blank' rel='noreferrer' aria-label='Twitter profile'><FaTwitter /></a>
                        <a href='https://www.instagram.com/code.veer/' target='_blank' rel='noreferrer' aria-label='Instagram profile'><FaInstagram /></a>
                        <a href='https://github.com/SomveerKr' target='_blank' rel='noreferrer' aria-label='GitHub profile'><FaGithub /></a>
                        <a href='https://www.linkedin.com/in/somveerkumar/' target='_blank' rel='noreferrer' aria-label='LinkedIn profile'><FaLinkedin /></a>
                    </div>}

                <div className='app__footer-card'>
                    <img src={images.email} alt='email' />
                    <a href='mailto:work.somveerk@gmail.com' className='p-text '>work.somveerk@gmail.com</a>
                </div>
            </div>

            {!isFormSubmitted ?
                <form className='app__footer-form app__flex' aria-label='Contact form' onSubmit={(e) => e.preventDefault()}>
                    <div className='app__flex'>
                        <label htmlFor='contact-name' className='sr-only'>Your Name</label>
                        <input className='p-text' type='text' id='contact-name' placeholder='Your Name' name='name' value={name} onChange={handleChangeInput} />
                    </div>
                    <div className='app__flex'>
                        <label htmlFor='contact-email' className='sr-only'>Your Email</label>
                        <input className='p-text' type='email' id='contact-email' placeholder='Your Email' name='email' value={email} onChange={handleChangeInput} />
                    </div>
                    <div>
                        <label htmlFor='contact-message' className='sr-only'>Your Message</label>
                        <textarea
                            className='p-text'
                            id='contact-message'
                            placeholder='Your Message'
                            value={message}
                            name='message'
                            onChange={handleChangeInput}
                        />
                    </div>
                    <button type='button' className='p-text' onClick={handleSubmit}>{loding ? 'Sending' : 'Send Message'}</button>
                </form>
                :
                <div>
                    <h3 className='head-text'>Thank You for Getting in Touch with Me!</h3>
                </div>
            }
        </>
    );
};

export default AppWrap(
    MotionWrap(Footer, 'app__footer'),
    'contact',
    'app__primarybg'
);
