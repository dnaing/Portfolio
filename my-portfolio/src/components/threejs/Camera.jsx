import { useEffect, useState } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import useCard from '../../stores/useCard'

export default function Camera()
{

    const state = useThree()

    const [ isParallaxEnabled, setIsParallaxEnabled ] = useState(true)

    const animateCameraPosition = (newCameraPosition) =>
    {
        gsap.to(
            state.camera.position,
            { 
                duration: 1,
                ease: 'power2.inOut',
                x: newCameraPosition[0],
                y: newCameraPosition[1],
                z: newCameraPosition[2]
            }
        )
    }
    
    useEffect(() => 
    {
        
        // Subscribe to the card store
        const unsubscribeCameraPosition = useCard.subscribe(
            (state) => state.cameraPosition,
            (value) => 
            {
                if (value)
                {
                    
                    // If our new position is the initial one, we want to re-enable parallax
                    if (value[0] === 0 && value[1] === 0 && value[2] === 5 )
                    {
                        // Wait until the camera animation finishes before re-enabling it
                        setTimeout(() => {
                            setIsParallaxEnabled(true)
                            
                        }, 1000)
                        animateCameraPosition(value)
                        
                    }

                    // Otherwise, our new position is an active card, so we want to disable parallax
                    else
                    {
                        setIsParallaxEnabled(false)
                        animateCameraPosition(value)
                    }

                    
                } 
            }
        )

        // Clean up subscription
        return () =>
        {
            unsubscribeCameraPosition()
        }

    }, [])

    // Parallax Effect
    useFrame((state, delta) => {

        if (isParallaxEnabled)
        {

            // Clamp delta to a max of 0.1
            delta = Math.min(delta, 0.1)

            // Animate Camera
            const parallaxX = state.pointer.x 
            const parallaxY = state.pointer.y
            const dampStrength = 3
            const xRange = 0.6
            const yRange = 0.3

            state.camera.position.x += (parallaxX * xRange - state.camera.position.x) * dampStrength * delta
            state.camera.position.y += (parallaxY * yRange - state.camera.position.y) * dampStrength * delta
        }
    })

    return null
}