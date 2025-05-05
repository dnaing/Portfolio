import { useRef, useState } from 'react';

import { ToastContainer, toast, Flip } from 'react-toastify'

import { FaLinkedin } from 'react-icons/fa'
import { FaSquareGithub } from 'react-icons/fa6'
import { FaSquareEnvelope } from 'react-icons/fa6'
import { IoClose } from "react-icons/io5";

export default function Contacts({ audioState })
{

    const audio = useRef()
    const contactModal = useRef()

    const [ isContactVisible, setIsContactVisible ] = useState(false)
    const [ result, setResult ] = useState('')

    const playClick = () =>
    {
        if (audio.current && audioState === true)
        {
            audio.current.volume = 0.1
            audio.current.currentTime = 0
            audio.current.play()
        }
    }

    const toggleContactModal = () =>
    {
        setIsContactVisible(prev => !prev)
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        // setResult('Sending....')
        const formData = new FormData(event.target)
    
        formData.append('access_key', '89b1f892-e719-40f0-873e-8491a6b9109c');
    
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });
    
        const data = await response.json()
    
        if (data.success) {
        //   setResult('Form Submitted Successfully')
          toast('Message sent')
          event.target.reset()
        } else {
          console.log('Error', data)
        //   setResult(data.message)
        }
    }

    return <>

        <ToastContainer position="top-center" theme="dark" autoClose={ 1500 } pauseOnHover={ false } transition={Flip} />

        <audio ref={ audio } className="click-audio" src="./audio/click.wav" preload="auto"></audio>

        {/* Contact Modal */}
        <div ref={ contactModal } className={`contact-modal-container ${isContactVisible ? 'visible' : 'hidden'}`} >
            <div className='contact-modal'>

                <IoClose className='icon' onClick={toggleContactModal} />   

                {/* Contact Form */}
                <form onSubmit={onSubmit}>

                    <div className="name-and-email">
                        <input type="text" name="name" placeholder="Name" required/>
                        <input type="email" name="email" placeholder="Email" required/>
                    </div>
                    
                    <textarea name="message" placeholder="Message" rows={9} required></textarea>

                    <button className="neon-effect" type="submit"><h1>Send</h1></button>

                </form>
                {/* <span>{result}</span> */}

            </div>
        </div>

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
                <div className="text" onPointerEnter={playClick} onClick={toggleContactModal}>
                    <span>CONTACT</span>
                    <FaSquareEnvelope className="icon" />
                </div>   
            </div>

        </div>
    
    </>
}