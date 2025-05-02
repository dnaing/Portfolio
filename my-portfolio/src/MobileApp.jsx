// import './MobileApp.css'

import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'

import MobileExperience from './MobileExperience'
import MobileInterface from './MobileInterface'
import LoadingScreen from './components/ui/LoadingScreen'

export default function MobileApp()
{
    return <>

        <div className="canvas-container">
            <Canvas gl={{ antialias: true}} dpr={[1, 2]}>
                <MobileExperience />
            </Canvas>
        </div>

        <Leva collapsed={true} hidden />
        {/* <LoadingScreen /> */}
        <MobileInterface />

    </>
}