import { Element } from 'react-scroll';
import Hero from './sections/Hero';
import Examples from './sections/Examples';
import Search from './sections/Search';
import About from './sections/About';

const FullPageSections = () => (
    <>
        <Element name="hero">
            <Hero />
        </Element>
        <Element name="examples">
            <Examples />
        </Element>
        <Element name="search">
            <Search />
        </Element>
        <Element name="about">
            <About />
        </Element>
    </>
);

export default FullPageSections;
