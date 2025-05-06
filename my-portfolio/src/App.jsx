import './App.css'

import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'

import useCheckMobileScreen from './stores/useCheckMobileScreen'
import Experience from './Experience'
import Interface from './Interface'
import MobileInterface from './MobileInterface'
import LoadingScreen from './components/ui/LoadingScreen'

export default function App() {

    const isMobile = useCheckMobileScreen()
    
    return <>
        <div className="canvas-container">
            <Canvas gl={{ antialias: true}} dpr={[1, 2]}>
                <Experience isMobile={ isMobile } />
            </Canvas>
        </div>
        <Leva collapsed={true} hidden />
        <LoadingScreen isMobile={ isMobile } />
        { isMobile ? <MobileInterface /> : <Interface /> }
    </>
}