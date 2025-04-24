import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

export default function Box() {
    const ref = useRef()
    useFrame((state, delta) => {
    ref.current.position.y = 10 + Math.sin(state.clock.elapsedTime) * 20
    ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += delta
    })
    return (
        <mesh ref={ref} scale={5}>
            <boxGeometry />
            <meshStandardMaterial />
        </mesh>
    )
}