import * as THREE from 'three'
import CustomShaderMaterial from 'three-custom-shader-material'
import { useControls } from 'leva'

import fogFragmentShader from '../../shaders/fog/fragment.glsl'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect } from 'react'

export default function Smoke()
{

    const { uXMod, uYMod } = useControls({
        uXMod: { value: 2.0, min: 0.0, max: 5.0, step: 0.01 },
        uYMod: { value: 3.0, min: 0.0, max: 5.0, step: 0.01 },
    })

    const fogMaterial = useRef()

    const { size, gl } = useThree();

    useFrame((state, delta) =>
    {
        if (fogMaterial.current)
        {
            fogMaterial.current.uniforms.uTime.value += delta
            fogMaterial.current.uniforms.uXMod.value = uXMod
            fogMaterial.current.uniforms.uYMod.value = uYMod
        }
    })

    return <>

        <mesh position={ [ 0, 7, -15 ] }>
            <planeGeometry args={[ 80, 50 ]}/>
            <CustomShaderMaterial
                ref={ fogMaterial }
                baseMaterial={ THREE.MeshStandardMaterial }
                fragmentShader={ fogFragmentShader }
                uniforms={
                    {
                        uTime: new THREE.Uniform(0),
                        uResolution: new THREE.Uniform(new THREE.Vector2(size.width * gl.getPixelRatio(), size.height * gl.getPixelRatio())),
                        uXMod: new THREE.Uniform(uXMod),
                        uYMod: new THREE.Uniform(uYMod)

                    }
                }
                transparent={ true }
                toneMapped={ false }
            />
        </mesh>

    </>
}