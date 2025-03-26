import { OrbitControls, Center, Float, Clouds, Cloud, Sparkles } from '@react-three/drei'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
import { Model } from './components/Model'
import Parallax from './components/Parallax'
import Fog from './components/Fog'
import Particles from './components/Particles'

export default function Experience()
{

    const { backgroundColor } = useControls({ backgroundColor: '#050a0e' })

    const cardsArray = []
    for (let i = 0; i < 5; i++)
    {
        cardsArray.push({
            position: [ i * 3, 0, 0 ],
            frontSideURL: "./images/Spades_K.png",
            backSideURL: "./images/Back_2.png"
        })
    }

    return <>

        <Perf position="top-left" />

        {/* Orbit Controls */}
        {/* <OrbitControls /> */}

        {/* Parallax */}
        <Parallax />

        {/* Fog */}
        <Fog />

        {/* Particles */}
        <Particles />

        {/* Background Color */}
        <color args={ [ backgroundColor ] } attach="background" />

        {/* Lighting */}
        <ambientLight intensity={ 4 } />

        {/* Main Cards */}
        <Center>
            {cardsArray.map((value, index) => (
                <group key={ index } position={ value.position }  >
                    <Model frontSideURL={ value.frontSideURL } backSideURL={ value.backSideURL } />
                </group>
            ))}
        </Center>

        {/* <axesHelper /> */}

    
    </>
}