import { useControls, folder } from 'leva'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame, extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

import sparklesVertexShader from '../../shaders/sparkles/vertex.glsl'
import sparklesFragmentShader from '../../shaders/sparkles/fragment.glsl'

const CustomSparklesMaterial = shaderMaterial(
    {
        uTime: 0,
        uSparklesColor: new THREE.Color('#494949'),
        uPixelRatio: Math.min(window.devicePixelRatio, 2),
        uSize: 1,
        uOpacity: 1,
        uEmissiveIntensity: 3,
        uSpeed: 0.5,
        uNoise: new THREE.Vector3(Math.random(), Math.random(), Math.random()),
    },
    sparklesVertexShader,
    sparklesFragmentShader
)
extend({ CustomSparklesMaterial })

export default function CustomSparkles({ count = 100, size = 100, opacity = 1, emissiveIntensity = 1, speed = 1, isMobile })
{

    const customSparklesMaterial = useRef()

    const { uSparklesColor } = useControls(
        {
            'Sparkles Settings': folder(
                {
                    uSparklesColor: '#494949' 
                }, {collapsed: true}
            )
        }
    )

    const sparklesCount = count
    const positionArray = new Float32Array(sparklesCount * 3)
    const scaleArray = new Float32Array(sparklesCount)

    // const xRange = isMobile ? 20 : 40
    // const yRange = isMobile ? 

    for (let i = 0; i < sparklesCount; i++)
    {
        const i3 = i * 3
        positionArray[i3 + 0] = (Math.random() - 0.5) * 40
        positionArray[i3 + 1] = (Math.random() - 0.5) * 20
        positionArray[i3 + 2] = (Math.random() - 0.5) * 10 - 7

        scaleArray[i] = Math.random() + 0.25
    }

    window.addEventListener('resize', () =>
    {
        if (customSparklesMaterial.current)
        {
            customSparklesMaterial.current.uPixelRatio = Math.min(window.devicePixelRatio, 2) 
        }     
    })

    useEffect(() => 
    {
        customSparklesMaterial.current.uSize = size
        customSparklesMaterial.current.uOpacity = opacity
        customSparklesMaterial.current.uEmissiveIntensity = emissiveIntensity
        customSparklesMaterial.current.uSpeed = speed

    }, [])

    useFrame((state, delta) => 
    {
        customSparklesMaterial.current.uniforms.uTime.value += delta
    })

    return <>
        <points>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positionArray, 3]} />
                <bufferAttribute attach="attributes-aScale" args={[scaleArray, 1]} />
            </bufferGeometry>
            <customSparklesMaterial
                ref={ customSparklesMaterial }
                uSparklesColor={ new THREE.Color(uSparklesColor) }
                transparent 
                depthWrite={ false }
                toneMapped={ false }
                blending={ THREE.AdditiveBlending }
            />
        </points>
    </>
}