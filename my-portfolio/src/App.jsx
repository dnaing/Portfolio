import './App.css'

import { Canvas } from '@react-three/fiber'

import Experience from './Experience'
import Interface from './Interface'

export default function App() {
    return <>
        <Canvas 
            // frameloop="demand"
            // gl={{ logarithmicDepthBuffer: true }}
        >
            <Experience />
        </Canvas>
        <Interface />
    </>
}