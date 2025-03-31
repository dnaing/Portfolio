import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import useCard from '../../stores/useCard'

export default function Camera()
{

    const state = useThree()

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
                    animateCameraPosition(value)
                } 
            }
        )

        // Clean up subscription
        return () =>
        {
            unsubscribeCameraPosition()
        }

    }, [])


    return null
}