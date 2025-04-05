import { Perf } from 'r3f-perf'
import { useControls, Leva } from 'leva'
import { useRef, Suspense } from 'react'
import { OrbitControls, Center } from '@react-three/drei'
import { EffectComposer, Bloom, ToneMapping, FXAA, SMAA } from '@react-three/postprocessing'
import { ToneMappingMode } from 'postprocessing'
import { Fluid, useConfig } from '@whatisjery/react-fluid-distortion';

import Parallax from './components/threejs/Parallax'
import Camera from './components/threejs/Camera'
import Fog from './components/threejs/Fog'
import CustomSparkles from './components/threejs/CustomSparkles'
import { Card } from './components/threejs/Card'
import Box from './components/threejs/Box'
import Model from './components/threejs/Test'

export default function Experience()
{

    const cardsGroup = useRef()
    // const { backgroundColor } = useControls({ backgroundColor: '#0d0425' })
    const { backgroundColor } = useControls({ backgroundColor: '#070707' })

    const cardsInfo = 
    [
        {
            cardName: 'About',
            frontSideURL: './images/pixel-cards/club.png'
            // frontSideURL: './images/normal/cardClubsA.png'

        },
        {
            cardName: 'Skills',
            frontSideURL: './images/pixel-cards/diamond.png'
            // frontSideURL: './images/normal/cardDiamondsA.png'

        },
        {
            cardName: 'Projects',
            frontSideURL: './images/pixel-cards/joker.png'
            // frontSideURL: './images/normal/cardHeartsA.png'
        },
        {
            cardName: 'Experience',
            frontSideURL: './images/pixel-cards/heart.png'
            // frontSideURL: './images/normal/cardHeartsA.png'
        },
        {
            cardName: 'Resume',
            frontSideURL: './images/pixel-cards/spade.png'
            // frontSideURL: './images/normal/cardClubsA.png'
        }
    ]

    const cardsArray = []
    for (let i = 0; i < 5; i++)
    {
        cardsArray.push({
            position: [ i * 3, 0, 0 ],
            cardName: cardsInfo[i].cardName,
            frontSideURL: cardsInfo[i].frontSideURL,
            backSideURL: './images/pixel-cards/back.png',
        })
    }

    const config = useConfig()

    return <>

        <Perf position="top-left" />

        <Leva hidden/>
        

        {/* Orbit Controls */}
        {/* <OrbitControls /> */}

        {/* Parallax Only */}
        {/* <Parallax /> */}

        {/* Camera Animations and Parallax */}
        <Camera />


        {/* Postprocess */}
        <Suspense fallback={ null }>
            <SMAA />
            {/* <FXAA /> */}
            <EffectComposer multisampling={ 8 }>
                <Fluid
                    // {...config}
                    // fluidColor="#78fffa"
                    fluidColor='#ffffff'
                    radius={ 0.03 }
                    intensity={ 5 }
                    force={ 1.2 }
                    curl={ 2 }
                    swirl={ 4 }
                    blend={ 10 }
                    densityDissipation={0.97}
                    velocityDissipation={ 1 }
                />
                <Bloom
                    mipmapBlur
                    intensity={ 1.0 }
                    luminanceThreshold={ 0.5 }
                    radius={ 0.5 }
                />
                <ToneMapping mode={ ToneMappingMode.ACES_FILMIC } />
            </EffectComposer>
        </Suspense>

        {/* Background Color */}
        <color args={ [ backgroundColor ] } attach="background" />

        {/* Lighting */}
        <ambientLight intensity={ 4 } />

        {/* Fog */}
        <Fog />

        {/* Particles */}
        <CustomSparkles
            count={ 100 }
            size={ 400 } 
            opacity={ 1 }
            emissiveIntensity={ 3 }
            speed={ 0.5 }
        />

        {/* Main Cards */}
        <Center ref={ cardsGroup }>
            {cardsArray.map((value, index) => (
                <group key={ index } position={ value.position }  >
                    <Card cardName={ value.cardName } frontSideURL={ value.frontSideURL } backSideURL={ value.backSideURL } position={ value.position } cardsGroup={ cardsGroup } />
                </group>
            ))}
        </Center>

        {/* <Box /> */}
        {/* <Model /> */}
    </>
}