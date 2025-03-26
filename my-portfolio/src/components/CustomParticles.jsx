import { useFrame, extend } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useControls } from 'leva'
import { shaderMaterial } from '@react-three/drei'
import sparklesVertexShader from '../shaders/sparkles/vertex.glsl'
import sparklesFragmentShader from '../shaders/sparkles/fragment.glsl'

const CustomSparklesMaterial = shaderMaterial(
    {
        uTime: 0,
        uPixelRatio: Math.min(window.devicePixelRatio, 2),
        uSize: 1000,
        uOpacity: 1.5,
        uEmissiveStrength: 1.0,
        uSpeed: 0.50,
        uNoise: new THREE.Vector3(1, 1, 1),
    },
    sparklesVertexShader,
    sparklesFragmentShader
)

extend({ CustomSparklesMaterial })

export default function CustomSparkles()
{

    const customSparklesMaterial = useRef()

    const { sparklesColor } = useControls({ sparklesColor: '#406ad1' })
    const [ threeSparklesColor, setThreeSparklesColor ]  = useState(new THREE.Color(sparklesColor))

    const sparklesCount = 100
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

        scaleArray[i] = Math.random()
    }


    window.addEventListener('resize', () =>
    {
        if (customSparklesMaterial.current)
        {
            customSparklesMaterial.current.uPixelRatio = Math.min(window.devicePixelRatio, 2) 
        }     
    })

    useFrame((state, delta) => 
    {
        customSparklesMaterial.current.uTime += delta
    })

    return <>
        <points 
        // key={`particle-${count}-${JSON.stringify(scale)}`} {...props} ref={ref}
        >
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