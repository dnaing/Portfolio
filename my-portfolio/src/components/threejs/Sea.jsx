import { extend, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { useControls } from "leva"
import * as THREE from 'three'

import SeaMaterial from "../custom-materials/SeaMaterial"

extend({ SeaMaterial })

export default function Sea()
{

    const seaMaterial = useRef()

    const { uBigWavesElevation, uBigWavesFrequencyX, uBigWavesFrequencyY, uBigWavesSpeed, uDepthColor, uSurfaceColor, uColorOffset, uColorMultiplier, uSmallWavesElevation, uSmallWavesFrequency, uSmallWavesSpeed, uSmallWavesIterations, uFogColor, uFogDensity } = useControls(
        {
            uBigWavesElevation: { value: 0.35, min: 0, max: 1, step: 0.001 },
            uBigWavesFrequencyX: { value: 1.5, min: 0, max: 10, step: 0.001 },
            uBigWavesFrequencyY: { value: 0.5, min: 0, max: 10, step: 0.001 },
            uBigWavesSpeed: { value: 0.75, min: 0, max: 4, step: 0.001 },

            uSmallWavesElevation: { value: 0.15, min: 0, max: 1, step: 0.001 },
            uSmallWavesFrequency: { value: 3, min: 0, max: 30, step: 0.001 },
            uSmallWavesSpeed: { value: 0.2, min: 0, max: 4, step: 0.001 },
            uSmallWavesIterations: { value: 2, min: 0, max: 5, step: 1 },
            
            uDepthColor: '#053148',
            uSurfaceColor: '#9bd8ff',
            uFogColor: '#000000',
            uColorOffset: { value: 0.6, min: 0, max: 1, step: 0.001 },
            uColorMultiplier: { value: 0.2, min: 0, max: 10, step: 0.001 },
            uFogDensity: { value: 90, min: 0, max: 100, step: 1 }
        }
    )

    useFrame((state, delta) =>
    {
        if (seaMaterial.current)
        {
            seaMaterial.current.uniforms.uTime.value += delta
        }
    })

    return <>

        <mesh rotation-x={ -Math.PI / 2 } position-y={ -2.5 }>
            <planeGeometry args={ [ 50, 50, 512, 512 ] } />
            <seaMaterial
                ref={ seaMaterial }
                uBigWavesElevation={ uBigWavesElevation }
                uBigWavesFrequency={ new THREE.Vector2(uBigWavesFrequencyX, uBigWavesFrequencyY) }
                uBigWavesSpeed={ uBigWavesSpeed }

                uSmallWavesElevation={ uSmallWavesElevation }
                uSmallWavesFrequency={ uSmallWavesFrequency }
                uSmallWavesSpeed={ uSmallWavesSpeed }
                uSmallWavesIterations={ uSmallWavesIterations }
            
                uDepthColor={ new THREE.Color(uDepthColor) }
                uSurfaceColor={ new THREE.Color(uSurfaceColor) }
                uFogColor={ new THREE.Color(uFogColor) }
                uColorOffset={ uColorOffset }
                uColorMultiplier={ uColorMultiplier }
                uFogDensity={ uFogDensity }
            />
        </mesh>

    </>
}