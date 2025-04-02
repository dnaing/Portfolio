import { useEffect } from 'react'
import gsap from 'gsap'

import Header from './components/ui/Header'
import Contacts from './components/ui/Contacts'
import About from './components/ui/About'
import Skills from './components/ui/Skills'
import Projects from './components/ui/Projects'
import Experience from './components/ui/Experience'
import Resume from './components/ui/Resume'
import useCard from './stores/useCard'

export default function Interface()
{

    const fadeInContent = (activeCard) =>
    {

        const delay = activeCard === 'Projects' ? 1.0 : 1.5
        
        // Fade in the header
        const header = document.querySelector('.header')
        const headerTitle = header.children[0].children[0]
        header.style.zIndex = 1
        headerTitle.innerHTML = activeCard.toUpperCase()
        gsap.to(
            header,
            {
                delay: delay,
                duration: 0.5,
                ease: 'power2.inOut',
                opacity: '1',
            }
        )
        
        const className = '.' + activeCard.toLowerCase()
        const section = document.querySelector(className)

        // Fades in the section information
        section.style.zIndex = 1
        gsap.to(
            section,
            {
                delay: delay,
                duration: 0.5,
                ease: 'power2.inOut',
                opacity: '1'
            }
        )
    }


    useEffect(() => 
    {
        
        // Subscribe to the card store
        const unsubscribeActiveCard = useCard.subscribe(
            (state) => state.activeCard,
            (value) => 
            {
                if (value)
                {
                    fadeInContent(value)
                } 
            }
        )

        // Clean up subscription
        return () =>
        {
            unsubscribeActiveCard()
        }

    }, [])


    return <div className="interface">

        {/* Header */}
        <Header />

        {/* About */}
        <About />

        {/* Skills */}
        <Skills />

        {/* Projects */}
        <Projects />

        {/* Experience */}
        <Experience />

        {/* Resume */}
        <Resume />

        {/* Contacts */}
        <Contacts />

    </div>
}