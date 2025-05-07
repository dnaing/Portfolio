// import MobileAbout from './components/ui/mobile/MobileAbout'

import About from './components/ui/About'
import Skills from './components/ui/Skills'
import Projects from './components/ui/Projects'
import Experience from './components/ui/Experience'
import Resume from './components/ui/Resume'
import Contacts from './components/ui/Contacts'

export default function MobileInterface()
{

    
    return <>

        <About isMobile={ true } />

        {/* Skills */}
        <Skills isMobile={ true }/>

        {/* Projects */}
        {/* <Projects isMobile={ true } audioState={ false }/> */}

        {/* Experience */}
        <Experience isMobile={ true } />

        {/* Resume */}
        <Resume isMobile={ true } audioState={ false } />

        {/* Contacts */}
        <Contacts isMobile={ true } audioState={ false } />

    </>
}