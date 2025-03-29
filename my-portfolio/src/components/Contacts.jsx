import { FaLinkedin } from 'react-icons/fa'
import { FaSquareGithub } from 'react-icons/fa6';
import { FaSquareEnvelope } from 'react-icons/fa6';

export default function Contacts()
{
    return <>

        {/* Contacts Bar */}
        <div className="contacts-bar">
            
            {/* Contacts */}
            <div className="contact">
                <a className="text" href="https://www.linkedin.com/in/dereknaing/" target="_blank"> LINKEDIN </a>
                <FaLinkedin className="icon" />
            </div>
            <div className="contact">
                <a className="text" href="https://github.com/dnaing" target="_blank">GITHUB</a> 
                <FaSquareGithub className="icon" />
            </div>
            <div className="contact">
                <a className="text" href="mailto:dereknaing01@gmail.com" target="_blank">EMAIL</a> 
                <FaSquareEnvelope className="icon" />
            </div>

        </div>
    
    </>
}