import './App.css'

import { Canvas } from '@react-three/fiber'

import Experience from './Experience'

export default function App() {
    return (
        <Canvas 
            // frameloop="demand"
            // gl={{ logarithmicDepthBuffer: true }}
        >
            <Experience />
        </Canvas>
    )
}