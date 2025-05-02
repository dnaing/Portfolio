import { Perf } from 'r3f-perf'
import { useControls, folder } from 'leva'
import * as THREE from 'three'
import { useRef } from 'react'
import { OrbitControls, Center } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { EffectComposer, Bloom, ToneMapping, FXAA } from '@react-three/postprocessing'
import { ToneMappingMode } from 'postprocessing'
import { Fluid, useConfig } from '@whatisjery/react-fluid-distortion';

import Camera from './components/threejs/Camera'
import CustomSparkles from './components/threejs/CustomSparkles'
import Card from './components/threejs/Card'
import Smoke from './components/threejs/Smoke'
import Sea from './components/threejs/Sea'
import Sun from './components/threejs/Sun'

export default function MobileExperience()
{

    const { size } = useThree()

    const { backgroundColor } = useControls(
        {
            'Background Setting': folder(
                { 
                    backgroundColor: '#000000' 
                }, {collapsed: true}
            )
        }
    )

    return <>

        {/* <Perf position="top-left" /> */}

        {/* Orbit Controls */}
        <OrbitControls />

        {/* Camera Animations and Parallax */}
        {/* <Camera /> */}

        {/* Postprocess */}

        <EffectComposer 
            multisampling={ 4 }
            resolutionScale={ 0.75 }
        >
            <FXAA />

            <Fluid
                // {...config}
                // fluidColor="#78fffa"
                fluidColor='#ffffff'
                radius={ 0.03 }
                intensity={ 8 }
                force={ 2 }
                curl={ 3 }
                swirl={ 4 }
                blend={ 15 }
                densityDissipation={0.92}
                velocityDissipation={ 1 }
            />

            <Bloom
                mipmapBlur
                intensity={ 0.8 }
                luminanceThreshold={ 0.8 }
                radius={ 0.55 }
            />
            <ToneMapping mode={ ToneMappingMode.ACES_FILMIC } />
        </EffectComposer>

        {/* Background Color */}
        <color args={ [ backgroundColor ] } attach="background" />

        {/* Lighting */}
        <ambientLight intensity={ 5 } />

        {/* Fog */}
        <Smoke/>

        {/* Particles */}
        <CustomSparkles
            count={ 50 }
            size={ 400 } 
            opacity={ 1 }
            emissiveIntensity={ 3 }
            speed={ 0.5 }
        />

        <Sun />

        {/* Main Cards */}
        {/* <group ref={ cardsGroup }>
            {cardsArray.map((value, index) => (
                <group key={ index } position={ value.position }  >
                    <Card cardName={ value.cardName } position={ value.position } cardColor={ value.cardColor } frontSideURL={ value.frontSideURL }  cardsGroup={ cardsGroup } />
                </group>
            ))}
        </group> */}

        <Sea />

    </>
}