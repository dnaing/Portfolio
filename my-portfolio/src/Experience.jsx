import { OrbitControls, Center, Float } from '@react-three/drei'

import Card from './components/Card'
import { Model } from './components/Model'
import Box from './components/Box'
import { useControls } from 'leva'


export default function Experience()
{

    const { backgroundColor } = useControls({ backgroundColor: '#02131f' })

    const cardsArray = []
    for (let i = 0; i < 5; i++)
    {
        cardsArray.push({
            position: [ i * 3, 0, 0 ],
            frontSideURL: "./images/king_of_diamonds.png",
            backSideURL: "./images/card_back.png"
        })
    }

    return <>

        {/* Orbit Controls */}
        <OrbitControls />

        {/* Parallax */}


        {/* Background Color */}
        <color args={ [ backgroundColor ] } attach="background" />

        {/* Lighting */}
        <ambientLight intensity={ 7.5 } />

        {/* Main Cards */}
        <Center>
            {cardsArray.map((value, index) => (
                <group key={ index } position={ value.position }  >
                    <Model frontSideURL={ value.frontSideURL } backSideURL={ value.backSideURL } />
                </group>
            ))}
        </Center>



    
    </>
}