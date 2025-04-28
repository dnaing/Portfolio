import { useTexture } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import CustomShaderMaterial from 'three-custom-shader-material'
import { useControls, folder } from 'leva'

import beamVertexShader from '../../shaders/beam/vertex.glsl'
import beamFragmentShader from '../../shaders/beam/fragment.glsl'

export default function Beam()
{

    const { uBeamColor, uBeamOpacity } = useControls(
        {
            'Sun Settings': folder(
                { 
                    uBeamColor: '#ff0000' ,
                    uBeamOpacity: {value: 0.5, min: 0.0, max: 1.0},
                }, {collapsed: true}
            )
        }
    )

    const beamMaterial = useRef()
    const { size, gl } = useThree();

    const uNoiseTexture = useTexture('./images/flame1.jpg')
    uNoiseTexture.wrapS = THREE.RepeatWrapping
    uNoiseTexture.wrapT = THREE.RepeatWrapping

    useEffect(() => {
        if (beamMaterial.current) {
            beamMaterial.current.uniforms.uBeamColor.value.set(uBeamColor)
            beamMaterial.current.uniforms.uBeamOpacity.value = uBeamOpacity
        }
    }, [uBeamColor, uBeamOpacity]) // Update the color uniform when the control changes

    useFrame((state, delta) =>
    {
        if (beamMaterial.current)
        {
            beamMaterial.current.uniforms.uTime.value += delta
        }
    })

    return <>

        <mesh position={[ 3, 1, -6 ]}>
            <planeGeometry args={ [ 5, 12, 40, 40 ] } />
            <CustomShaderMaterial
                ref={ beamMaterial }
                baseMaterial={ THREE.MeshStandardMaterial }
                vertexShader={ beamVertexShader }
                fragmentShader={ beamFragmentShader }
                uniforms={
                    {
                        uTime: new THREE.Uniform(0),
                        uResolution: new THREE.Uniform(new THREE.Vector2(size.width * gl.getPixelRatio(), size.height * gl.getPixelRatio())),
                        uNoiseTexture: new THREE.Uniform(uNoiseTexture),
                        uBeamColor: new THREE.Uniform(new THREE.Color(uBeamColor)),
                        uBeamOpacity: new THREE.Uniform(uBeamOpacity)
                    }
                }
                transparent={ true }
                toneMapped={ false }
            />
        </mesh>
    
    </>
}