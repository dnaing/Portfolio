import './App.css'

import { Canvas } from '@react-three/fiber'
import { Perf } from 'r3f-perf'

import Experience from './Experience'

export default function App() {
    return (
        <Canvas 
            // frameloop="demand"
        >

            <Perf position="top-left" />

            <Experience />

        </Canvas>
    )
}