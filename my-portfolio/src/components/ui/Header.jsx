import gsap from 'gsap'
import { useRef, useEffect } from 'react'
import useCard from '../../stores/useCard'

export default function Header({ isMobile, audioState })
{

    const activeCard = useCard((state) => state.activeCard)
    const setActiveCardNull = useCard((state) => state.setActiveCardNull)
    const setCameraPosition = useCard((state) => state.setCameraPosition)

    const audio = useRef()
    const nameSection = useRef()

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
        if (isMobile && nameSection.current)
        {
            nameSection.current.style.background = window.scrollY === 0 ? "#00000000" : "#131313FF"
        }
        
    }

    useEffect(() => 
    {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)

    }, [])

    return <>

        <audio ref={ audio } className="click-audio" src="./audio/click.wav" preload="auto"></audio>

        <div ref={ nameSection } className="name-section">
            <h1>Derek Naing</h1>
            <h3>Fullstack Web Developer</h3>
        </div>
        

        { isMobile ? 
            (
                // Hamburger menu
                <div>hi</div>
            )
            :
            (
                <div className="header">

                    <div className="title-section">
                        <h1 className="title"></h1>
                    </div>

                    <button className="exit-button neon-effect" onClick={ fadeOutContent }>
                        <h1 onPointerEnter={playClick}>EXIT</h1>
                    </button>

                </div>
            ) 
        }
        

    </>
}