import React, { useState, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import { Link } from 'react-scroll';
import '../App.css';

const Navbar = ({ activeSection }) => {
    const [scrollY, setScrollY] = useState(0);
    const [showVertical, setShowVertical] = useState(false);

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        setScrollY(currentScrollY);
        setShowVertical(currentScrollY > 0);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const transition = useTransition(showVertical, {
        from: { transform: 'translateX(0px)' },
        enter: { transform: 'translateX(0px)' },
        leave: { transform: 'translateX(-100%)' },
        config: { duration: 300 }
    });

    return (
        <>
            {transition((style, item) => (
                <animated.div className={`navbar ${item ? 'vertical' : 'horizontal'}`} style={style}>
                    <h1>
                        <span className='venture'>Venture</span>
                        <span className='vector'>Vector</span>
                    </h1>
                    <Link to='hero' spy={true} smooth={true} duration={500}>Home</Link>
                    <Link to='search' spy={true} smooth={true} duration={500}>Search</Link>
                    <Link to='examples' spy={true} smooth={true} duration={500}>Examples</Link>
                    <Link to='about' spy={true} smooth={true} duration={500}>About</Link>
                    <button>Sign in</button>
                </animated.div>
            ))}
        </>
    );
};

export default Navbar;
