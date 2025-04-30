import { useRef } from 'react';

import { FaLinkedin } from 'react-icons/fa'
import { FaSquareGithub } from 'react-icons/fa6';
import { FaSquareEnvelope } from 'react-icons/fa6';

export default function Contacts()
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

        {/* Contacts Bar */}
        <div className="contacts-bar">
            
            {/* Contacts */}
            <div className="contact">
                <a className="text" href="https://www.linkedin.com/in/dereknaing/" target="_blank" rel="noopener noreferrer" onPointerEnter={playClick}> 
                    <span>LINKEDIN</span> 
                    <FaLinkedin className="icon" /> 
                </a>
            </div>
            <div className="contact">
                <a className="text" href="https://github.com/dnaing" target="_blank" rel="noopener noreferrer" onPointerEnter={playClick}>
                    <span>GITHUB</span>
                    <FaSquareGithub className="icon" />
                </a> 
                
            </div>
            <div className="contact">
                <a className="text" href="mailto:dereknaing01@gmail.com" target="_blank" rel="noopener noreferrer" onPointerEnter={playClick}>
                    <span>EMAIL</span>
                    <FaSquareEnvelope className="icon" />
                </a>   
            </div>

        </div>
    
    </>
}