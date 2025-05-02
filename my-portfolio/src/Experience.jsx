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
import MobileCard from './components/threejs/MobileCard'

export default function Experience({ isMobile })
{

    // console.log(isMobile)

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

    // Initialize card information
    const cardsGroup = useRef()
    const cardsInfo = []
    const cardsArray = []

    
    // If we're on desktop, we'll populate our card information
    if (!isMobile)
    {

        cardsInfo.push(
            {
                cardName: 'About',
                frontSideURL: './images/pixel-cards/club.png',
                cardColor: new THREE.Vector3(15, 0, 0) // red
    
            },
            {
                cardName: 'Skills',
                frontSideURL: './images/pixel-cards/diamond.png',
                cardColor: new THREE.Vector3(3, 1, 8) // violet
                
    
            },
            {
                cardName: 'Projects',
                frontSideURL: './images/pixel-cards/joker.png',
                cardColor: new THREE.Vector3(0, 3, 10) // blue
                
            },
            {
                cardName: 'Experience',
                frontSideURL: './images/pixel-cards/heart.png',
                cardColor: new THREE.Vector3(0, 3, 2) // green
            },
            {
                cardName: 'Resume',
                frontSideURL: './images/pixel-cards/spade.png',
                cardColor: new THREE.Vector3(4.5, 1, 0) // amber
            }
        )
        
        const aspectRatio = size.width / size.height
        const minAspectRatio = 1.33
        const maxAspectRatio = 2.32
    
        // Remap gap depending on how much horizontal space is available
        const minGap = 2
        const maxGap = 3.2
        const gap = THREE.MathUtils.mapLinear(aspectRatio, minAspectRatio, maxAspectRatio, minGap, maxGap)
    
        const offset = gap * 2
        for (let i = 0; i < 5; i++)
        {
            cardsArray.push({
                position: [ (i * gap) - offset, 0, 0 ], // (i * gap) - offset is how we center the cards
                cardName: cardsInfo[i].cardName,
                cardColor: cardsInfo[i].cardColor,
                frontSideURL: cardsInfo[i].frontSideURL,
            })
        }
    }
    

    return <>

        {/* <Perf position="top-left" /> */}

        {/* Orbit Controls */}
        {/* <OrbitControls /> */}

        {/* Camera Animations and Parallax */}
        <Camera />

        {/* Postprocessing */}

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

        {/* Smoke */}
        <Smoke />

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
        {isMobile ?
        
            // If we're on mobile, render a singular non interactable card
            (
                <MobileCard />
            ) :

            // Other wise, render all main cards
            (
                <group ref={ cardsGroup }>
                    {cardsArray.map((value, index) => (
                        <group key={ index } position={ value.position }  >
                            <Card cardName={ value.cardName } position={ value.position } cardColor={ value.cardColor } frontSideURL={ value.frontSideURL }  cardsGroup={ cardsGroup } />
                        </group>
                    ))}
                </group>
            )
        }
        
        <Sea />

    </>
}