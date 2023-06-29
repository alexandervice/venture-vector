import React from 'react'
import { Element } from 'react-scroll';
import logo from "../logo.jpg"

const Hero = () => {
    return (
        <Element name='hero' className='section h-screen flex items-center justify-center'>
            <div className='p-5 bg-zinc-900/80 max-w-7xl w-screen sm:w-4/5 flex flex-col items-center'>
                <div className='mt-10 sm:mt-0' style={{ height: '10vh' }}></div>
                <div className='flex items-center justify-center'>
                    <img className='max-w-full max-h-full' src={logo} alt='logo' />
                </div>
                <div className='flex flex-col items-center mt-10'>
                    <h3 className="text-2xl font-medium text-yellow-300">VentureVector gives you the freedom to choose your own adventure and the tools to make it happen.</h3>
                    <h3 className="text-2xl font-medium text-green-500">Our AI chatbot assists you in planning, while Google Maps shows you the way.</h3>
                    <h3 className="text-2xl font-medium text-yellow-300">Explore the world at your own pace!</h3>
                </div>
            </div>

        </Element>
    )
}

export default Hero
