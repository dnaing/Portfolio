import { shaderMaterial, useTexture } from '@react-three/drei'
import { extend, useThree, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'


import beamVertexShader from '../../shaders/beam2/vertex.glsl'
import beamFragmentShader from '../../shaders/beam2/fragment.glsl'

const BeamMaterial = shaderMaterial(
    {
        uTime: 0,
    },
    beamVertexShader,
    beamFragmentShader
)
extend({ BeamMaterial })

export default function Beam2()
{

    const beamMaterial = useRef()
    const { size, gl } = useThree();

    const noiseTexture = useTexture('./images/flame1.jpg')
    noiseTexture.wrapS = THREE.RepeatWrapping
    noiseTexture.wrapT = THREE.RepeatWrapping

    useFrame((state, delta) =>
    {
        if (beamMaterial.current)
        {
            beamMaterial.current.uniforms.uTime.value += delta
        }
    })

    return <>

        <mesh position={[ 0, 3, -6 ]} rotation={ [ 0, 0, 0 ] }>
            <planeGeometry args={ [ 0.1, 8, 40, 40 ] } />
            <beamMaterial
                ref={ beamMaterial }
                uResolution={ new THREE.Vector2(size.width * gl.getPixelRatio(), size.height * gl.getPixelRatio()) }
                uNoiseTexture={ noiseTexture }
                transparent={ true }
                depthWrite={ false }
                // wireframe
            />
        </mesh>
    
    </>
}