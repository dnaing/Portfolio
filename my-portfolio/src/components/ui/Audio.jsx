import { useEffect, useRef, useState } from 'react'

import { IoVolumeHighOutline } from 'react-icons/io5'
import { IoVolumeMuteOutline } from 'react-icons/io5'

export default function Audio({ audioState, setAudioState })
{

    const [ userInteracted, setUserInteracted ] = useState(false)

    const audio = useRef()
    const audioStateRef = useRef(audioState)
    const fadeIntervalRef = useRef(null)
    const userInteractedRef = useRef(null)


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

    const clearFadeInterval = () => {
        if (fadeIntervalRef.current) {
            clearInterval(fadeIntervalRef.current)
            fadeIntervalRef.current = null
        }
    }

    const fadeInAudio = () =>
    {

        clearFadeInterval()

        if (audioStateRef.current === true && userInteractedRef.current)
        {
            // only play if the user has interacted with the document
            audio.current.play()
            fadeIntervalRef.current = setInterval(() => {
                if (audio.current.volume < 0.1) {
                    audio.current.volume += 0.01
                } 
                else 
                {
                    audio.current.volume = 0.1
                    clearFadeInterval()
                }
            }, 100)
        }
    }

    const fadeOutAudio = () =>
    {

        clearFadeInterval()

        if (audioStateRef.current === true)
        {

            fadeIntervalRef.current = setInterval(() => {
                if (audio.current.volume > 0.01) {
                    audio.current.volume -= 0.01
                } 
                else 
                {
                    audio.current.volume = 0
                    audio.current.pause()
                    clearFadeInterval()
                }
            }, 100)
        }
    }

    useEffect(() => {
        audioStateRef.current = audioState
    }, [audioState])

    useEffect(() =>
    {
        userInteractedRef.current = userInteracted
    }, [userInteracted])


    useEffect(() => {

        const markInteracted = () =>
        {
            setUserInteracted(true)
            window.removeEventListener('click', markInteracted)
            window.removeEventListener('keydown', markInteracted)
        }
        
        const handleVisibilityChange = () => {

            if (document.visibilityState === 'hidden') 
            {
                fadeOutAudio()
            } 
            
            else if (document.visibilityState === 'visible') 
            {
                fadeInAudio()
            }
        }

        // Used to check if the user has interacted with the page
        window.addEventListener('click', markInteracted)
        window.addEventListener('keydown', markInteracted)
        
        // Used to check if the user navigates to or away from the page
        document.addEventListener('visibilitychange', handleVisibilityChange)
        window.addEventListener('pagehide', fadeOutAudio)
        window.addEventListener('pageshow', fadeInAudio)
        
        return () => {
            window.removeEventListener('click', markInteracted)
            window.removeEventListener('keydown', markInteracted)
            document.removeEventListener('visibilitychange', handleVisibilityChange)
            window.removeEventListener('pagehide', fadeOutAudio)
            window.removeEventListener('pageshow', fadeInAudio)
            
        }
    }, [])

    return <>

        <audio ref={audio} className="audio-background" loop preload="auto">
            <source src="audio/background.mp3" type="audio/mpeg" />
        </audio>
        { audioState ? 
            (
                <div className="audio-button audio-button-on" onClick={toggleAudio}>
                    <IoVolumeHighOutline size={25} />
                </div>
                
                
            ) : 
            (
                <div className="audio-button audio-button-off" onClick={toggleAudio}>
                    <IoVolumeMuteOutline size={25} />
                </div>
            )
        }


    </>
}