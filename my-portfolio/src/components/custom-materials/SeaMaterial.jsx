import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

import seaVertexShader from '../../shaders/sea/vertex.glsl'
import seaFragmentShader from '../../shaders/sea/fragment.glsl'

const SeaMaterial = shaderMaterial(
    {
        uTime: 0,
        uBigWavesElevation: 0.35,
        uBigWavesFrequency: new THREE.Vector2(1.5, 1.5),
        uBigWavesSpeed: 0.75,

        uSmallWavesElevation: 0.15,
        uSmallWavesFrequency: 3,
        uSmallWavesSpeed: 0.2,
        uSmallWavesIterations: 2,

        uDepthColor: new THREE.Color('#053148'),
        uSurfaceColor: new THREE.Color('#9bd8ff'),
        uFogColor: new THREE.Color('#1a2a3b'),
        uColorOffset: 0.6,
        uColorMultiplier: 0.2,
        uFogDensity: 90

    },
    seaVertexShader,
    seaFragmentShader
)

export default SeaMaterial