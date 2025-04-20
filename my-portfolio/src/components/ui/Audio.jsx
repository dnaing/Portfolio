import { useRef, useState } from "react"

import { IoVolumeHighOutline } from "react-icons/io5";
import { IoVolumeMuteOutline } from "react-icons/io5";

export default function Audio()
{


    const audio = useRef()
    const [audioState, setAudioState] = useState(true)

    const toggleAudio = () =>
    {

        if (audio.current.paused)
        {
            audio.current.play()
        }
        else
        {
            audio.current.pause()
        }

        setAudioState(!audioState)
    }

    return <>

        <audio ref={audio} className="audio" loop>
            <source src="audio/background.mp3" type="audio/mpeg" />
        </audio>
        { audioState ? 
            (
                <div className="audio-button audio-button-on" onClick={toggleAudio}>
                    <IoVolumeHighOutline size={35} />
                </div>
                
                
            ) : 
            (
                <div className="audio-button audio-button-off" onClick={toggleAudio}>
                    <IoVolumeMuteOutline size={35} />
                </div>
            )
        }


    </>
}