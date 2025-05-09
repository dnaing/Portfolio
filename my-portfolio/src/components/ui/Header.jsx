import gsap from 'gsap'
import { useRef, useEffect, useState } from 'react'
import useCard from '../../stores/useCard'

export default function Header({ isMobile, audioState })
{

    const activeCard = useCard((state) => state.activeCard)
    const setActiveCardNull = useCard((state) => state.setActiveCardNull)
    const setCameraPosition = useCard((state) => state.setCameraPosition)

    const audio = useRef()

    const [ hamburgerMenuOpen, setHamburgerMenuOpen ] = useState(false)
    let hamburgerMenuOpenRef = useRef(null)
    const navHeader = useRef()
    const navMenu = useRef()
    const hamburger = useRef()

    const fadeOutContent = () =>
    {

        // Update global state of our camera position back to default
        setCameraPosition([ 0, 0, 5 ])

        // Fade out the header
        const header = document.querySelector('.header')
        gsap.to(
            header,
            {
                duration: 0.5,
                ease: 'power2.inOut',
                opacity: '0',
                onComplete: () => { header.style.zIndex = -1 }
            }
        )
        
        // Fade out the section information
        const className = '.' + activeCard.toLowerCase()
        const section = document.querySelector(className)
        gsap.to(
            section,
            {
                duration: 0.5,
                ease: 'power2.inOut',
                opacity: '0',
                onComplete: () => { section.style.zIndex = -1 }
            }
        )

        // Set active card status in the store to null
        setTimeout(() => {
            setActiveCardNull()
        }, activeCard === 'Projects' ? 800 : 1100)
        
    }

    const playClick = () =>
    {
        if (audio.current && audioState === true)
        {
            audio.current.volume = 0.1
            audio.current.currentTime = 0
            audio.current.play()
        }
    }

    const handleScroll = () =>
    {
        if (isMobile && navHeader.current)
        {
            navHeader.current.style.background = window.scrollY === 0 ? "#00000000" : "#131313FF"
        }
        
    }

    const toggleHamburgerMenu = () =>
    {

        setHamburgerMenuOpen(prev => !prev)

        // Give hamburger and nav menu the active class
        if (hamburger.current)
        {
            hamburger.current.classList.toggle("active")
        }
        if (navMenu.current)
        {
            navMenu.current.classList.toggle("active")
        }
        if (navHeader.current)
        {
            if (window.scrollY === 0)
            {
                navHeader.current.style.background = (hamburgerMenuOpenRef.current === true ? "#00000000" : "#131313FF")
            }  
        }
    }

    const closeHamburgerMenu = () =>
    {

        setHamburgerMenuOpen(false)

        // Take away the hamburger and navmenu active class
        if (hamburger.current)
        {
            hamburger.current.classList.remove("active")
        }
        if (navMenu.current)
        {
            navMenu.current.classList.remove("active")
        }
    }

    useEffect(() => 
    {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)

    }, [])

    useEffect(() => 
    {
        hamburgerMenuOpenRef.current = hamburgerMenuOpen
    }, [ hamburgerMenuOpen ])

    return <>

        <audio ref={ audio } className="click-audio" src="./audio/click.wav" preload="auto"></audio>

        { isMobile ? 
            (
                // Hamburger menu nav bar
                <div>
                    <header ref={ navHeader } className="navbar-header">
                        <nav className="navbar">

                            <div>
                                <a href="#" className="nav-branding" onClick={ closeHamburgerMenu }><h1>Derek Naing</h1><h3>Full Stack Developer</h3></a>
                            </div>
                            <ul ref={ navMenu } className="nav-menu">
                                <li className="nav-item">
                                    <a href="#about" className="nav-link" onClick={ closeHamburgerMenu }>About</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#skills" className="nav-link" onClick={ closeHamburgerMenu }>Skills</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#projects" className="nav-link" onClick={ closeHamburgerMenu }>Projects</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#experience" className="nav-link" onClick={ closeHamburgerMenu }>Experience</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#resume" className="nav-link" onClick={ closeHamburgerMenu }>Resume</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#contact" className="nav-link" onClick={ closeHamburgerMenu }>Contact</a>
                                </li>
                            </ul>
                            <div ref={ hamburger } className="hamburger" onClick={ toggleHamburgerMenu }>
                                <span className="bar"></span>
                                <span className="bar"></span>
                                <span className="bar"></span>
                            </div>
                        </nav>
                    </header>
                </div>
            )
            :
            (

                <div>
                    <div className="name-section">
                        <h1>Derek Naing</h1>
                        <h3>Fullstack Web Developer</h3>
                    </div>
                    <div className="header">
                    
                        <div className="title-section">
                            <h1 className="title"></h1>
                        </div>
                        <button className="exit-button neon-effect" onClick={ fadeOutContent }>
                            <h1 onPointerEnter={playClick}>EXIT</h1>
                        </button>
                    </div>
                </div>
            ) 
        }
        

    </>
}