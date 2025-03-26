import { Sparkles } from '@react-three/drei';
import { useControls } from 'leva';
import * as THREE from 'three'
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Particles()
{

    // const particleColor = useControls({
    //     particleColor: new THREE.Color('#1767b1')
    // })

    // const arr = new Float32Array(75 * 3)
    // for (let i = 0; i < 75; i++)
    // {
    //     const i3 = i * 3
    //     arr[i3] = particleColor.particleColor.r / 255
    //     arr[i3 + 1] = particleColor.particleColor.g / 255
    //     arr[i3 + 2] = particleColor.particleColor.b / 255
    // }

    const sparkles = useRef()

    useEffect(() =>
    {
        if (sparkles.current)
        {
            const material = sparkles.current.material

            material.onBeforeCompile = (shader) =>
            {

                console.log(shader)


                shader.fragmentShader = `
                    varying vec3 vColor;
                    varying float vOpacity;
                    void main() {
                        float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
                        float strength = 0.05 / distanceToCenter - 0.1;
                        
                        float clamped = clamp(vOpacity, 0.1, 1.0);
                        gl_FragColor = vec4(vColor, strength * clamped);
                        
                        #include <tonemapping_fragment>
                        #include <colorspace_fragment>
                    }
                `
                console.log('modified')
                console.log(shader.fragmentShader)
            }
        }
    }, [])

    return <>
        <Sparkles
            ref={ sparkles }
            color={ new THREE.Color('#1767b1') }
            count={ 80 }
            position={ [ 0, 0, -5.5 ] }
            size={ Math.random() * 15 + 15 }
            scale={ [ 30, 15, 10 ] }
            speed={ 1 }
            opacity={  2 }
        />
    </>
}