import { useFrame } from '@react-three/fiber'

export default function Parallax()
{

    useFrame((state, delta) => {

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
    })

    return null
}