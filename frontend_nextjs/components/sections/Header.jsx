'use client';

import { easeInOut, motion } from 'framer-motion';
import images from '@/constants/images';
import AppWrap from '@/components/AppWrap';
import './Header.scss';

const scaleVariants = {
    whileInView: {
        scale: [0, 1],
        opacity: [0, 1],
        transition: {
            duration: 1,
            ease: 'easeInOut'
        }
    }
};

const techSkillNames = ['JavaScript', 'React.js', 'Tailwind CSS', 'Node.js', 'Python'];

const Header = () => {
    return (
        <header className='app__header app__flex' role="banner">
            <motion.div
                whileInView={{ x: [-100, 0], opacity: [0, 1] }}
                transition={{ duration: 0.5 }}
                className='app__header-info'
            >
                <div className='app__header-badge'>
                    <div className='badge-cmp app__flex'>
                        <span>👋</span>
                        <div style={{ marginLeft: 20 }}>
                            <p className='p-text'>Hello, I am</p>
                            <h1 className='head-text'>Somveer Kumar</h1>
                        </div>
                    </div>

                    <div className='tag-cmp app__flex'>
                        <p className='p-text'>Full Stack Developer</p>
                        <p className='p-text'>Web Scraping &amp; Bots</p>
                        <p className='p-text'>Legal Tech Expert</p>
                    </div>
                </div>

                <p className='sr-only'>
                    Somveer Kumar is a Full Stack Web Developer and Legal Tech Expert based in India,
                    specializing in React, Node.js, Python, MERN stack, web scraping, and legal technology solutions.
                </p>
            </motion.div>

            <motion.div
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 0.5, delayChildren: 0.5 }}
                className='app__header-img'
            >
                <img src={images.profile} alt='Somveer Kumar - Full Stack Developer and Legal Tech Expert' />
                <motion.img
                    whileInView={{ scale: [0, 1] }}
                    transition={{ duration: 1, ease: easeInOut }}
                    src={images.circle}
                    className='overlay_circle'
                    alt='Decorative circle background'
                />
            </motion.div>

            <motion.div
                variant={scaleVariants}
                whileInView={scaleVariants.whileInView}
                className='app__header-circles'
            >
                {[images.javascript, images.react, images.tailwind, images.node, images.python].map((circle, index) => (
                    <div className='app__flex' key={`circle-${index}`}>
                        <img src={circle} alt={`${techSkillNames[index]} skill icon`} />
                    </div>
                ))}
            </motion.div>
        </header>
    );
};

export default AppWrap(Header, 'home');
