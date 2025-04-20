import { useRef, useState } from "react"

import { IoVolumeHighOutline } from "react-icons/io5";
import { IoVolumeMuteOutline } from "react-icons/io5";

export default function Audio()
{


    const audio = useRef()
    const [audioState, setAudioState] = useState(true)

    console.log('reattach')

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

        <audio ref={audio} loop>
            <source src="audio/background.mp3" type="audio/mpeg" />
        </audio>
        <div className="audio-button">
            <IoVolumeHighOutline size={40} onClick={toggleAudio}/>
        </div>
        { audioState ? 
            (
                <div className="audio-button audio-button-off">
                    <IoVolumeMuteOutline size={35} onClick={toggleAudio}/>
                </div>
                
            ) : 
            (
                <div className="audio-button audio-button-on">
                    <IoVolumeHighOutline size={35} onClick={toggleAudio}/>
                </div>
            )
        }


    </>
}