'use client';

import { useState } from 'react';
import Link from 'next/link';
import './Testimonial.scss';
import { motion } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import AppWrap from '@/components/AppWrap';
import MotionWrap from '@/components/MotionWrap';
import { urlFor } from '@/lib/sanity';

const Testimonial = ({ testimonials = [], brands = [] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleClick = (index) => {
        setCurrentIndex(index);
    };

    const test = testimonials[currentIndex];

    return (
        <>
            {
                testimonials.length && (
                    <>
                        <div className='app__testimonial-item app__flex'>
                            <Link href="https://contra.com/SomveerKumar/reviews?r=SomveerKumar"
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                <img src={urlFor(test.imageurl)} alt='testimonial' />
                            </Link>
                            <div className='app__testimonial-content'>
                                <p className='p-text'>{test.feeback}</p>
                                <div>
                                    <h4 className='bold-text'>{test.name}</h4>
                                    <h5 className='p-text'>{test.company}</h5>
                                </div>
                            </div>
                        </div>

                        <div className='app__testimonial-btns app__flex'>
                            <div className='app__flex' onClick={() => handleClick(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)}>
                                <HiChevronLeft />
                            </div>
                            <div className='app__flex' onClick={() => handleClick(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)}>
                                <HiChevronRight />
                            </div>
                        </div>

                        {/* <div className='app__testimonial-brands app__flex'>
                            {brands.map((brand) => (
                                <motion.div
                                    whileInView={{ opacity: [0, 1] }}
                                    transition={{ duration: 0.5, type: 'tween' }}
                                    key={brand._id}
                                >
                                    <img src={urlFor(brand.imgUrl)} alt={brand.name} />
                                </motion.div>
                            ))}
                        </div> */}
                    </>
                )
            }
        </>
    );
};

export default AppWrap(
    MotionWrap(Testimonial, 'app__testimonial'),
    'testimonial',
    'app__primarybg'
);
