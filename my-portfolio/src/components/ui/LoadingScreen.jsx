import { useProgress } from "@react-three/drei";
import { useState } from "react";

export default function LoadingScreen() 
{

    const { active, progress, errors, item, loaded, total } = useProgress()
    const [ start, setStart ] = useState(false)

    return <>

        <div className={`loading-screen ${start ? "loading-screen-started" : ""}`}>

            <div className="loading-screen-progress">
                <div
                className="loading-screen-progress-value"
                style={{
                    width: `${(loaded / 12) * 100}%`,
                }}
                />
            </div>

            <button 
                className="loading-screen-button" 
                onClick={() => { 
                    setStart(true) 
                    const audio = document.querySelector("audio")
                    audio.play()
                }}
                disabled = {loaded < 12}
            > 
                Enter 
            </button>

        </div>

    </>
}