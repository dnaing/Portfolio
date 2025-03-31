import { Perf } from 'r3f-perf'
import { useControls, Leva } from 'leva'
import { OrbitControls, Center } from '@react-three/drei'
import { EffectComposer, Bloom, ToneMapping } from '@react-three/postprocessing'
import { ToneMappingMode } from 'postprocessing'

import Parallax from './components/threejs/Parallax'
import Camera from './components/threejs/Camera'
import Fog from './components/threejs/Fog'
import CustomSparkles from './components/threejs/CustomSparkles'
import { Card } from './components/threejs/Card'

export default function Experience()
{

    const { backgroundColor } = useControls({ backgroundColor: '#0d0425' })

    const cardsInfo = 
    [
        {
            cardName: 'About',
            frontSideURL: './images/Spades_K.png'
        },
        {
            cardName: 'Skills',
            frontSideURL: './images/Diamonds_K.png'
        },
        {
            cardName: 'Projects',
            frontSideURL: './images/Joker_2.png'
        },
        {
            cardName: 'Experience',
            frontSideURL: './images/Hearts_K.png'
        },
        {
            cardName: 'Resume',
            frontSideURL: './images/Clubs_K.png'
        }
    ]

    const cardsArray = []
    for (let i = 0; i < 5; i++)
    {
        cardsArray.push({
            position: [ i * 3, 0, 0 ],
            cardName: cardsInfo[i].cardName,
            frontSideURL: cardsInfo[i].frontSideURL,
            backSideURL: './images/Back_2.png',
        })
    }

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
        <EffectComposer>
            <Bloom
                mipmapBlur 
                intensity={ 0.1 }
                luminanceThreshold={ 0 }
            />
            <ToneMapping mode={ ToneMappingMode.ACES_FILMIC } />
        </EffectComposer>

        {/* Background Color */}
        <color args={ [ backgroundColor ] } attach="background" />

        {/* Lighting */}
        <ambientLight intensity={ 4 } />

        {/* Fog */}
        <Fog />

        {/* Particles */}
        <CustomSparkles
            count={ 200 }
            size={ 400 } 
            opacity={ 1 }
            emissiveIntensity={ 3 }
            speed={ 0.5 }
        />

        {/* Main Cards */}
        <Center>
            {cardsArray.map((value, index) => (
                <group key={ index } position={ value.position }  >
                    <Card cardName={ value.cardName } frontSideURL={ value.frontSideURL } backSideURL={ value.backSideURL } position={ value.position } />
                </group>
            ))}
        </Center>
    </>
}