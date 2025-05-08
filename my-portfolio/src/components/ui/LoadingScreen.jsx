import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

export default function LoadingScreen({ isMobile }) 
{

    // Desktop version loads 8 assets

    // Mobile version loads 3 assets

    const total = isMobile ? 3 : 8

    const { loaded } = useProgress()
    const [ start, setStart ] = useState(false)
    const [ disable, setDisable ] = useState(true)

    

    useEffect(() => 
    {
        if (loaded === total)
        {
            setTimeout(() =>
            {
                setDisable(false)
            }, 900)
        }

    }, [loaded])

    return <>

        <div className={`loading-screen ${start ? "loading-screen-started" : ""}`}>

            <div className="loading-screen-progress">
                <div
                className="loading-screen-progress-value"
                style={{
                    width: `${(loaded / total) * 100}%`,
                }}
                />
            </div>

            <button 
                className="loading-screen-button neon-effect" 
                onClick={() => { 
                    setStart(true) 
                    
                    if (!isMobile)
                    {
                        const audio = document.querySelector(".audio-background")
                        audio.volume = 0.1
                        audio.play()
                    }
                    
                }}
                disabled={ disable }
            > 
                ENTER 
            </button>

        </div>

    </>
}