import { useRef } from "react"

export default function Resume({ isMobile, audioState })
{

    const audio = useRef()

    const playClick = () =>
    {
        if (audio.current && audioState === true)
        {
            audio.current.volume = 0.1
            audio.current.currentTime = 0
            audio.current.play()
        }
    }

    return <>

        <audio ref={ audio } className="click-audio" src="./audio/click.wav" preload="auto"></audio>

        <div className="resume">

            <div className="resume-section">

                { isMobile && <h1 className="resume-title">RESUME</h1> }

                <div className="resume-item">
                    <img
                        src="./images/resume/resume.png"
                        alt="My Resume"
                    />
                </div>

                { !isMobile && 
                    <div className="resume-download">
                        <a className="neon-effect" href="/images/resume/resume.pdf" download="derek-resume" onPointerEnter={playClick}>Download</a>
                    </div>
                }
                
            </div>
            
        </div>

    </>
}