import * as THREE from 'three'
import CustomShaderMaterial from 'three-custom-shader-material'
import { useControls, folder } from 'leva'

import smokeFragmentShader from '../../shaders/smoke/fragment.glsl'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect } from 'react'

export default function Smoke()
{

    const { uXMod, uYMod } = useControls(
        {
            'Smoke Settings': folder(
                {
                    uXMod: { value: 2.0, min: 0.0, max: 5.0, step: 0.01 },
                    uYMod: { value: 3.0, min: 0.0, max: 5.0, step: 0.01 },
                }, {collapsed: true}
            )
        }
    )

    const smokeMaterial = useRef()

    const { size, gl } = useThree();

    useFrame((state, delta) =>
    {
        if (smokeMaterial.current)
        {
            smokeMaterial.current.uniforms.uTime.value += delta
            smokeMaterial.current.uniforms.uXMod.value = uXMod
            smokeMaterial.current.uniforms.uYMod.value = uYMod
        }
    })

    return <>

        <mesh position={ [ 0, 7, -15 ] }>
            <planeGeometry args={[ 80, 50 ]}/>
            <CustomShaderMaterial
                ref={ smokeMaterial }
                baseMaterial={ THREE.MeshStandardMaterial }
                fragmentShader={ smokeFragmentShader }
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