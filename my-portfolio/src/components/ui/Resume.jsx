import { useRef } from "react"

export default function Resume()
{

    const audio = useRef()

    const playClick = () =>
    {
        if (audio.current)
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

                <div className="resume-item">
                    <img
                        src="./images/resume/resume.png"
                        alt="My Resume"
                    />
                </div>

                <div className="resume-download">
                    <a className="neon-effect" href="/images/resume/resume.pdf" download="derek-resume" onPointerEnter={playClick}>Download</a>
                </div>
            
            </div>
            
        </div>

    </>
}