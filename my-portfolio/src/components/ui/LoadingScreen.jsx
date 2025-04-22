import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

export default function LoadingScreen() 
{

    const { active, progress, errors, item, loaded, total } = useProgress()
    const [ start, setStart ] = useState(false)
    const [ disable, setDisable ] = useState(true)

    useEffect(() => 
    {
        if (loaded === 9)
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
                    width: `${(loaded / 9) * 100}%`,
                }}
                />
            </div>

            <button 
                className="loading-screen-button neon-effect" 
                onClick={() => { 
                    setStart(true) 
                    const audio = document.querySelector("audio")
                    audio.volume = 0.1
                    audio.play()
                }}
                disabled={ disable }
            > 
                ENTER 
            </button>

        </div>

    </>
}