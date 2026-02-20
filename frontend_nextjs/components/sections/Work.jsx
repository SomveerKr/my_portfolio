'use client';

import { useState, useEffect } from 'react';
import './Work.scss';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';
import ReactPaginate from 'react-paginate';

import AppWrap from '@/components/AppWrap';
import MotionWrap from '@/components/MotionWrap';
import { urlFor } from '@/lib/sanity';

const Work = ({ works: initialWorks = [] }) => {
    const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
    const [activeFilter, setActiveFilter] = useState('All');
    const [works] = useState(initialWorks);
    const [filterWork, setFilterWork] = useState(initialWorks);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 3;

    const [portfolioIndex, setPortfolioIndex] = useState(null);
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        setIsTouch(
            ('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0)
        );
    }, []);

    const handleWorkFilter = (item) => {
        setActiveFilter(item);
        setAnimateCard([{ y: 100, opacity: 0 }]);
        setCurrentPage(0);

        setTimeout(() => {
            setAnimateCard([{ y: 0, opacity: 1 }]);

            if (item === 'All') {
                setFilterWork(works);
            } else {
                setFilterWork(works.filter((work) => work.tags.includes(item)));
            }
        }, 500);
    };

    const pageCount = Math.ceil(filterWork.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    const currentItems = filterWork.slice(offset, offset + itemsPerPage);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    function handleTouch(index) {
        setPortfolioIndex(index);
        setTimeout(() => {
            setPortfolioIndex(null);
        }, 6000);
    }

    return (
        <>
            <h2 className='head-text'>My Creative <span>Portfolio</span></h2>
            <div className='app__work-filter'>
                {['Landing Page', 'Web App', 'React JS', "NEXT JS", 'MERN App', 'All'].map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleWorkFilter(item)}
                        className={`app__work-filter-item app__flex p-text ${activeFilter === item ? "item-active" : ""}`}
                    >
                        {item}
                    </div>
                ))}
            </div>

            <motion.div
                animate={animateCard}
                transition={{ duration: 0.5, delayChildren: 0.5 }}
                className='app__work-portfolio'
            >
                {currentItems.map((work, index) => (
                    <div className='app__work-item app__flex' key={index}>
                        <div className='app__work-img app__flex' onClick={() => handleTouch(index)}>
                            <img src={urlFor(work.imgUrl)} alt={work.name} />

                            {
                                isTouch
                                    ?
                                    portfolioIndex === index &&
                                    (
                                        <div className='app__work-touch app__flex'>
                                            <a href={work.projectLink} target='_blank' rel='norefer'>
                                                <div className='app__flex'>
                                                    <AiFillEye />
                                                </div>
                                            </a>
                                            <a href={work.codeLink} target='_blank' rel='norefer'>
                                                <div className='app__flex'>
                                                    <AiFillGithub />
                                                </div>
                                            </a>
                                        </div>
                                    )
                                    :
                                    <motion.div
                                        whileHover={{ opacity: [0, 1] }}
                                        transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}
                                        className='app__work-hover app__flex'
                                    >
                                        <a href={work.projectLink} target='_blank' rel='norefer'>
                                            <motion.div
                                                whileInView={{ scale: [0, 1] }}
                                                whileHover={{ scale: [1, 0.9] }}
                                                transition={{ duration: 0.25 }}
                                                className='app__flex'
                                            >
                                                <AiFillEye />
                                            </motion.div>
                                        </a>
                                        <a href={work.codeLink} target='_blank' rel='norefer'>
                                            <motion.div
                                                whileInView={{ scale: [0, 1] }}
                                                whileHover={{ scale: [1, 0.9] }}
                                                transition={{ duration: 0.25 }}
                                                className='app__flex'
                                            >
                                                <AiFillGithub />
                                            </motion.div>
                                        </a>
                                    </motion.div>
                            }
                        </div>

                        <div className='app__work-content app__flex'>
                            <h4 className='bold-text '>{work.title}</h4>
                            <p className='p-text' style={{ marginTop: 10 }}>{work.description}</p>

                            <div className='app__work-tag app__flex'>
                                <p className='p-text'>{work.tags[0]}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </motion.div>

            {currentItems.length > 0 ? (
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    pageClassName={"pagination__page-item"}
                    pageLinkClassName={"pagination__page-link"}
                    activeClassName={"pagination__page-item--active"}
                    previousClassName={"pagination__page-item"}
                    nextClassName={"pagination__page-item"}
                    breakClassName={"pagination__page-item"}
                    disabledClassName={"pagination__page-item--disabled"}
                />
            ) : (
                <div className='app__work-empty'>
                    <h2>No work found</h2>
                </div>
            )}
        </>
    );
};

export default AppWrap(
    MotionWrap(Work, 'app__works'),
    'work',
    'app__primarybg'
);
