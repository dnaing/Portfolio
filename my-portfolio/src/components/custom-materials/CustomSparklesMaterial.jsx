import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'

import sparklesVertexShader from '../../shaders/sparkles/vertex.glsl'
import sparklesFragmentShader from '../../shaders/sparkles/fragment.glsl'

const CustomSparklesMaterial = shaderMaterial(
    {
        uTime: 0,
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

export default CustomSparklesMaterial