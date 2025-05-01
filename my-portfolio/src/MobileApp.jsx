// import './MobileApp.css'

import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'

import MobileExperience from './MobileExperience'
import MobileInterface from './MobileInterface'
import LoadingScreen from './components/ui/LoadingScreen'

export default function MobileApp()
{
    return <>
        <Canvas gl={{ antialias: true}} dpr={[1, 2]}>
            <MobileExperience />
        </Canvas>
        <Leva collapsed={true} hidden />
        <MobileInterface />
    </>
}