import './App.css'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Leva } from 'leva'

import Experience from './Experience'
import Interface from './Interface'

import MobileExperience from './MobileExperience'
import MobileInterface from './MobileInterface'

import LoadingScreen from './components/ui/LoadingScreen'

export default function App() {

    
    return <>
        <Canvas gl={{ antialias: true}} dpr={[1, 2]}>
            <Experience />
        </Canvas>
        <Leva collapsed={true} hidden />
        <LoadingScreen />
        <Interface />
    </>
}