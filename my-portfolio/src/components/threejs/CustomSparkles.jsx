import { useControls } from 'leva'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame, extend } from '@react-three/fiber'

import CustomSparklesMaterial from '../custom-materials/CustomSparklesMaterial'

extend({ CustomSparklesMaterial })

export default function CustomSparkles({ count = 100, size = 100, opacity = 1, emissiveIntensity = 1, speed = 1 })
{

    const customSparklesMaterial = useRef()

    // const { sparklesColor } = useControls({ sparklesColor: '#279cb1' })
    const { sparklesColor } = useControls({ sparklesColor: '#494949' })

    const [ threeSparklesColor, setThreeSparklesColor ]  = useState(new THREE.Color(sparklesColor))

    const sparklesCount = count
    const positionArray = new Float32Array(sparklesCount * 3)
    const scaleArray = new Float32Array(sparklesCount)
    const colorArray = new Float32Array(sparklesCount * 3)

    useEffect(() => {
        setThreeSparklesColor(new THREE.Color(sparklesColor))
    }, [sparklesColor])

    for (let i = 0; i < sparklesCount; i++)
    {
        const i3 = i * 3
        positionArray[i3 + 0] = (Math.random() - 0.5) * 40
        positionArray[i3 + 1] = (Math.random() - 0.5) * 20
        positionArray[i3 + 2] = (Math.random() - 0.5) * 10 - 7

        colorArray[i3 + 0] = threeSparklesColor.r
        colorArray[i3 + 1] = threeSparklesColor.g
        colorArray[i3 + 2] = threeSparklesColor.b

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
        customSparklesMaterial.current.uTime += delta
    })

    return <>
        <points>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positionArray, 3]} />
                <bufferAttribute attach="attributes-aScale" args={[scaleArray, 1]} />
                <bufferAttribute attach="attributes-aColor" args={[colorArray, 3]} />
            </bufferGeometry>
            <customSparklesMaterial
                ref={ customSparklesMaterial }
                transparent 
                depthWrite={ false }
                toneMapped={ false }
                blending={ THREE.AdditiveBlending }
            />
        </points>
    </>
}