import { shaderMaterial } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { useControls, folder } from 'leva'
import * as THREE from 'three'

import sunVertexShader from '../../shaders/sun/vertex.glsl'
import sunFragmentShader from '../../shaders/sun/fragment.glsl'

import atmosphereVertexShader from '../../shaders/atmosphere/vertex.glsl'
import atmosphereFragmentShader from '../../shaders/atmosphere/fragment.glsl'

const SunMaterial = shaderMaterial(
    {
        uSunDirection: new THREE.Vector3(0, 0, 1),
        uAtmosphereDayColor: new THREE.Color('#00aaff'),
        uAtmosphereTwilightColor: new THREE.Color('#ff6600')
    },
    sunVertexShader,
    sunFragmentShader
)
extend({ SunMaterial })

const AtmosphereMaterial = shaderMaterial(
    {
        uSunDirection: new THREE.Vector3(0, 0, 1),
        uAtmosphereDayColor: new THREE.Color('#00aaff'),
        uAtmosphereTwilightColor: new THREE.Color('#ff6600')
    },
    atmosphereVertexShader,
    atmosphereFragmentShader
)
extend({ AtmosphereMaterial })

export default function Sun() 
{

    const atmosphereMaterial = useRef()
    const sunMaterial = useRef()
    const debugLight = useRef()

    let sunPhi = Math.PI * 1.5;
    let sunTheta = 3.14
    const sunOrbitSpeedPhi = 0.2;
    const sunOrbitSpeedTheta = 0.05;

    const sunSpherical = new THREE.Spherical(1, sunPhi, sunTheta) // if you increase 1, you need to normalize sun direction again in fragment
    const sunDirection = new THREE.Vector3(0, 0, 0)

    const updateSun = (phi, theta) =>
    {
        if (phi)
            sunSpherical.phi = phi
        if (theta)
            sunSpherical.theta = theta

        sunDirection.setFromSpherical(sunSpherical)

        // debugLight.current.position
        //     .copy(sunDirection)
        //     .multiplyScalar(5)
        
        sunMaterial.current.uniforms.uSunDirection.value.copy(sunDirection)
        atmosphereMaterial.current.uniforms.uSunDirection.value.copy(sunDirection)
    }

    // Tweaks
    const { uAtmosphereDayColor, uAtmosphereTwilightColor } = useControls(
        {
            'Sun Settings': folder(
                {
                    uAtmosphereDayColor: '#03a0ff',
                    uAtmosphereTwilightColor: '#065680'
                }, {collapsed: true}
            )
        }
    )

    useFrame((state, delta) =>
    {
        sunPhi += sunOrbitSpeedPhi * delta * 3
        sunTheta += sunOrbitSpeedTheta * delta * 3
        updateSun(sunPhi, sunTheta)
    }) 

    return <>

        {/* Debug Light */}
        {/* <mesh ref={ debugLight } position={ [ 0, 5, -5 ] }>
            <icosahedronGeometry args={ [ 0.1, 2 ] } />
            <meshBasicMaterial />
        </mesh> */}

        {/* Sun */}
        <mesh position={ [ 0, 5.6, -5 ] }>
            <sphereGeometry args={ [ 1.4, 75, 75 ] } />
            <sunMaterial 
                ref={ sunMaterial }
                uAtmosphereDayColor={ uAtmosphereDayColor }
                uAtmosphereTwilightColor={ uAtmosphereTwilightColor } 
            />
        </mesh>

        {/* Sun Atmosphere */}
        <mesh position={ [ 0, 5.6, -5 ] }>
            <sphereGeometry args={ [ 1.46, 75, 75 ] } />
            <atmosphereMaterial
                ref={ atmosphereMaterial }
                uAtmosphereDayColor={ uAtmosphereDayColor }
                uAtmosphereTwilightColor={ uAtmosphereTwilightColor }
                side={ THREE.BackSide }
                transparent={ true }
            />
        </mesh>

    </>
}