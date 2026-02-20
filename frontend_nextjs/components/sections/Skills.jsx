'use client';

import './Skills.scss';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

import AppWrap from '@/components/AppWrap';
import MotionWrap from '@/components/MotionWrap';
import { urlFor } from '@/lib/sanity';

const Skills = ({ skills = [], experiences = [] }) => {
    return (
        <>
            <h2 className='head-text'>Skills & <span>Experience</span></h2>

            <div className='app__skills-container'>
                <motion.div className='app__skills-list'>
                    {skills?.map((skill) => (
                        <motion.div
                            whileInView={{ opacity: [0, 1] }}
                            transition={{ duration: 0.5 }}
                            className='app__skills-item app__flex'
                            key={skill.name}
                        >
                            <div className='app__flex' style={{ backgroundColor: skill.bgColor }}>
                                <img src={urlFor(skill.icon)} alt={skill.name} />
                            </div>
                            <p className='p-text'>{skill.name}</p>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div className='app__skills-exp'>
                    {experiences?.map((experience) => (
                        <motion.div
                            className='app__skills-exp-item'
                            key={experience.year}
                        >
                            <div className='app__skills-exp-year'>
                                <p className='bold-text'>{experience.year}</p>
                            </div>
                            <motion.div className='app__skills-exp-works'>
                                {experience.works.map((work) => (
                                    <div key={work.name}>
                                        <motion.div
                                            whileInView={{ opacity: [0, 1] }}
                                            transition={{ duration: 0.5 }}
                                            className='app__skills-exp-work'
                                            data-tip
                                            data-for={work.name}
                                        >
                                            <a
                                                data-tooltip-id={work.name}
                                                data-tooltip-content={work.desc}
                                            >
                                                <h4 className='bold-text'>{work.name}</h4>
                                                <p className='p-text'>{work.company}</p>
                                            </a>
                                            <Tooltip id={work.name} className='skills-tooltip' />
                                        </motion.div>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </>
    );
};

export default AppWrap(
    MotionWrap(Skills, 'app__skills'),
    'skills',
    'app__whitebg'
);
