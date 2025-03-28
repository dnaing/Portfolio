import { useFrame } from '@react-three/fiber'

export default function Parallax()
{

    useFrame((state, delta) => {

        const parallaxX = state.pointer.x 
        const parallaxY = state.pointer.y

        const dampStrength = 2.5
        const xRange = 0.6
        const yRange = 0.3

        state.camera.position.x += (parallaxX * xRange - state.camera.position.x) * dampStrength * delta
        state.camera.position.y += (parallaxY * yRange - state.camera.position.y) * dampStrength * delta
    })

    return null
}