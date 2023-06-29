import React from 'react'
import { Element } from 'react-scroll';

const Hero = () => {
    return (
        <Element name='hero' className='section'>
            <div className='p-5 bg-zinc-600/80 flex max-w-7xl flex-col'>
                <h2><span className='venture'>Venture</span>
                    <span className='vector'>Vector</span></h2>
                <h3>VentureVector gives you the freedom to choose your own adventure and the tools to make it happen.</h3>
                <h3>Our AI chatbot assists you in planning, while Google Maps shows you the way.</h3>
                <h3>Explore the world at your own pace!</h3>
            </div>

        </Element>
    )
}

export default Hero
