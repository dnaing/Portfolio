import { OrbitControls, Center, Float, Clouds, Cloud, Sparkles, Text3D } from '@react-three/drei'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
import { EffectComposer, Vignette, Glitch, Bloom, ToneMapping } from '@react-three/postprocessing'
import { ToneMappingMode } from 'postprocessing'
import { Model } from './components/Model'
import Parallax from './components/Parallax'
import Fog from './components/Fog'
import CustomSparkles from './components/CustomParticles'

export default function Experience()
{

    const { backgroundColor } = useControls({ backgroundColor: '#1d1c28' })

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

        {/* Orbit Controls */}
        {/* <OrbitControls /> */}

        {/* Parallax */}
        <Parallax />

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
            count={ 150 }
            size={ 400 } 
            opacity={ 1 }
            emissiveIntensity={ 3 }
            speed={ 0.5 }
        />

        {/* Main Cards */}
        <Center>
            {cardsArray.map((value, index) => (
                <group key={ index } position={ value.position }  >
                    <Model cardName={ value.cardName } frontSideURL={ value.frontSideURL } backSideURL={ value.backSideURL } />
                </group>
            ))}
        </Center>
    </>
}