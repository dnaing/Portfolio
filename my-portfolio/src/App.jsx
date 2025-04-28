import './App.css'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Leva } from 'leva'

import Experience from './Experience'
import LoadingScreen from './components/ui/LoadingScreen'
import Interface from './Interface'

export default function App() {

    

    return <>
        <Canvas 
            // frameloop="demand"
            // gl={{ logarithmicDepthBuffer: true }}
            gl={{ antialias: true }} 
            dpr={[1, 2]}
        >
            <Suspense fallback={null}>
                <Experience />
            </Suspense>
        </Canvas>
        <Leva collapsed={true} hidden />
        <LoadingScreen />
        <Interface />
    </>
}