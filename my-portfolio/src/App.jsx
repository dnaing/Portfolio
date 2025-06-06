import './App.css'

import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'
import { useEffect, useRef, useState } from 'react'

import Experience from './Experience'
import Interface from './Interface'
import MobileInterface from './MobileInterface'
import LoadingScreen from './components/ui/LoadingScreen'

export default function App({ isMobile }) {

    // Check if the canvas is in view
    const [ isVisible, setIsVisible ] = useState(true)
    const canvas = useRef()

    useEffect(() => 
    {
        if (canvas.current)
        {
            const observer = new window.IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    return
                }
                setIsVisible(false)
                }, {
                root: null,
                threshold: 0.01, // set offset 0.1 means trigger if atleast 10% of element in viewport
                                // set offset 0.6 means trigger if atleast 60% of element in viewport
                                // set offset 0.05 means trigger if at least 5% of element in viewport
            })

            observer.observe(canvas.current)
        }

    }, [])

    return <>
        <div ref={ canvas } className="canvas-container">
            <Canvas className="r3f" gl={{ antialias: true}} dpr={[1, 2]} frameloop={ isVisible ? "always" : "never" }>
                <Experience isMobile={ isMobile } />
            </Canvas>
        </div>
        <Leva collapsed={true} hidden />
        <LoadingScreen isMobile={ isMobile } />
        { isMobile ? <MobileInterface /> : <Interface /> }
    </>
}