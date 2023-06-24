import React from 'react';
import { FullpageSection, FullPageSections } from '@ap.cx/react-fullpage';
import Hero from './sections/Hero';
import Examples from './sections/Examples';
import Search from './sections/Search';
import About from './sections/About';

const Section = () => (
    <FullPageSections>
        <FullpageSection>
            <Hero />
        </FullpageSection>
        <FullpageSection>
            <Search />
        </FullpageSection>
        <FullpageSection>
            <Examples />
        </FullpageSection>
        <FullpageSection>
            <About />
        </FullpageSection>
    </FullPageSections>
);

export default Section;
