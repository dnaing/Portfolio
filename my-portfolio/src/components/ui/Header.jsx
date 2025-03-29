import gsap from "gsap"

export default function Header()
{

    const exit = () => 
    {

        // Fade out the header
        const header = document.querySelector('.header')
        gsap.to(
            header,
            {
                duration: 0.5,
                ease: 'power2.inOut',
                opacity: '0',
                onComplete: () => { header.style.zIndex = '-1' }
            }
        )

        // Fade out the appropriate content section
        const contentSection = document.querySelector('.about')
        gsap.to(
            contentSection,
            {
                duration: 0.5,
                ease: 'power2.inOut',
                opacity: '0',
                onComplete: () => { contentSection.style.zIndex = '-1' }
            }
        )
    }

    return <>
        <div className="header">

            <div className="title-section">
                <div className="title"/>
            </div>

            <button className="exit-button" onClick={ exit }>
                <div className="text" >EXIT</div>
            </button>

        </div>
    </>
}