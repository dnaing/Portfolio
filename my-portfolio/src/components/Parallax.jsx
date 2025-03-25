import { useFrame } from "@react-three/fiber"
import { useThree } from "@react-three/fiber"

export default function Parallax()
{

    useFrame((state) => {

        const parallaxX = state.pointer.x 
        const parallaxY = state.pointer.y

        const dampStrength = 0.02
        const xRange = 0.6
        const yRange = 0.3

        state.camera.position.x += (parallaxX * xRange - state.camera.position.x) * dampStrength
        state.camera.position.y += (parallaxY * yRange - state.camera.position.y) * dampStrength
    })

    return null
}