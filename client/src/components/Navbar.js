import React, { useState, useEffect, useRef } from 'react';
import { useTransition, animated } from 'react-spring';
import axios from "axios";
import { Link } from 'react-scroll';
import Trips from './Trips';
import '../App.css';
import Switcher from './ThemeSwitcher';


const Navbar = ({ user, setUser, viewSignIn, setViewSignIn }) => {
    const [scrollY, setScrollY] = useState(0);
    const [showVertical, setShowVertical] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        setScrollY(currentScrollY);
        setShowVertical(currentScrollY > 0);
    };

    const handleClickOutside = event => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };

    const handleLogout = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/api/logout`)
            .then(res => {
                setUser(false);
                localStorage.removeItem("usertoken");
            })
            .catch(err => {
                console.log(err)
            })

    }
    const handleViewSignIn = () => {
        viewSignIn ? setViewSignIn(false) : setViewSignIn(true)
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
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
                <animated.div className={`navbar ${item ? 'vertical' : 'horizontal'} bg-zinc-900/80`} style={style}>
                    <h1 className="text-3xl font-bold">
                        <span className='venture'>Venture</span>
                        <span className='vector'>Vector</span>
                    </h1>
                    <Link className='text-2xl' to='hero' spy={true} smooth={true} duration={500}>Home</Link>
                    <Link className='text-2xl' to='search' spy={true} smooth={true} duration={500}>Search</Link>
                    <Link className='text-2xl' to='examples' spy={true} smooth={true} duration={500}>Examples</Link>
                    <Link className='text-2xl' to='about' spy={true} smooth={true} duration={500}>About</Link>
                    {user ? (
                        <>
                            <Link className='text-2xl' to='trips' spy={true} smooth={true} duration={500} onClick={() => setShowDropdown(!showDropdown)}>Trips</Link>
                            {showDropdown && <div ref={dropdownRef}><Trips user={user} setUser={setUser} show={showDropdown} /></div>}
                            <button
                                className='text-yellow-400 text-2xl'
                                onClick={handleLogout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        // <Link to='login' spy={true} smooth={true} onClick={setViewSignIn(true)} duration={500}>Sign in</Link>
                        <button  className='text-2xl' type='button' onClick={handleViewSignIn}>Login / Register</button>
                    )}
                    {/* Switcher is the dark/light mode button */}
                    <Switcher />
                </animated.div>
            ))}
        </>
    );
};

export default Navbar;