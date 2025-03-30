import gsap from 'gsap'
import useCard from '../../stores/useCard'


export default function Header()
{

    const activeCard = useCard((state) => state.activeCard)

    const fadeOutContent = () =>
    {

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
    }

    return <>
        <div className="header">

            <div className="title-section">
                <div className="title"/>
            </div>

            <button className="exit-button" onClick={ fadeOutContent }>
                <div className="text" >EXIT</div>
            </button>

        </div>
    </>
}