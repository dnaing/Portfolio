import * as THREE from 'three'

import CustomShaderMaterial from 'three-custom-shader-material'
import { Card } from './Card'

import cardVertexShader from '../../shaders/card/vertex.glsl'
import cardFragmentShader from '../../shaders/card/fragment.glsl'

import { Float } from '@react-three/drei'
import { useTexture } from '@react-three/drei'

export default function Box()
{


    const frontSideTexture = useTexture('./images/Joker_2.png')


    return <>

        <mesh position={[ 0, 0, 1 ]}>
            <planeGeometry args={[ 5, 5, 30, 30 ]} />
            <CustomShaderMaterial
                baseMaterial={ THREE.MeshStandardMaterial }
                vertexShader={ cardVertexShader }
                fragmentShader={ cardFragmentShader }
                map={ frontSideTexture }
                // wireframe
                color="hotpink"
                side={THREE.DoubleSide}
            />
        </mesh>


    </>
}