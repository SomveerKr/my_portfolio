'use client';

import { motion } from 'framer-motion';
import AppWrap from '@/components/AppWrap';
import MotionWrap from '@/components/MotionWrap';
import { urlFor } from '@/lib/sanity';
import './About.scss';

const About = ({ abouts = [] }) => {
    return (
        <>
            <h2 className='head-text'>I Build <span>Digital Solutions</span>
                <br /> That Bridge <span>Law &amp; Technology</span>
            </h2>
            <div className='app__profiles'>
                {abouts.map((about, index) => (
                    <motion.div
                        whileInView={{ opacity: 1 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5, type: 'tween' }}
                        className='app__profile-item'
                        key={about.title + index}
                    >
                        <img src={urlFor(about.imgUrl)} alt={about.title} />
                        <h2 className='bold-text' style={{ marginTop: 20 }}>{about.title}</h2>
                        <p className='p-text' style={{ marginTop: 10 }}>{about.description}</p>
                    </motion.div>
                ))}
            </div>
        </>
    );
};

export default AppWrap(
    MotionWrap(About, 'app__about'),
    'about',
    'app__whitebg'
);
