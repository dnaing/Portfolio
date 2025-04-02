import { useEffect, useState } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import useCard from '../../stores/useCard'

export default function Camera()
{

    const [ isParallaxEnabled, setIsParallaxEnabled ] = useState(true)
    let tl

    const { camera } = useThree();

    const visibleHeightAtZDepth = ( depth, camera, z ) => 
    {
        // compensate for cameras not positioned at z=0
        const cameraOffset = z;
        if ( depth < cameraOffset ) depth -= cameraOffset;
        else depth += cameraOffset;
        
        // vertical fov in radians
        const vFOV = camera.fov * Math.PI / 180; 
        
        // Math.abs to ensure the result is always positive
        return 2 * Math.tan( vFOV / 2 ) * Math.abs( depth );
    };
        
    const visibleWidthAtZDepth = ( depth, camera, z ) => 
    {
        const height = visibleHeightAtZDepth( depth, camera, z );
        return height * camera.aspect;
    }

    const animateCameraPositionIn = (newCameraPosition) =>
    {

        let cameraPanAmount = visibleWidthAtZDepth(0, camera, 3.25) / 4; 
        if (newCameraPosition[0] < 0)
        {
            cameraPanAmount *= -1
        }
        else if (newCameraPosition[0] === 0)
        {
            cameraPanAmount = 0
        }
        
        tl = gsap.timeline()
        tl.to(
            camera.position,
            {
                duration: 0.6,
                ease: 'power2.inOut',
                x: newCameraPosition[0],
                z: newCameraPosition[2]
            }
        ).to(
            camera.position,
            {
                duration: newCameraPosition[0] === 0 ? 0.3 : 0.6,
                ease: 'power2.inOut',
                x: newCameraPosition[0] - cameraPanAmount,

            }
        )

    }

    const animateCameraPositionOut = () =>
    {

        if (tl)
        {
            setTimeout(() => {
                tl.reverse()
            }, 300)
            
        }

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
                    // This also means that we had hit the exit button
                    if (value[0] === 0 && value[1] === 0 && value[2] === 5 )
                    {
                        // Wait until the camera animation finishes before re-enabling it
                        setTimeout(() => {
                            setIsParallaxEnabled(true)
                        }, 1200)
                        animateCameraPositionOut()
                        
                    }

                    // Otherwise, our new position is an active card, so we want to disable parallax
                    // This also means that we had hit a card
                    else
                    {
                        setIsParallaxEnabled(false)
                        animateCameraPositionIn(value)
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