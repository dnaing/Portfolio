import { Sparkles } from '@react-three/drei';
import { useControls } from 'leva';
import * as THREE from 'three'

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

    return <>
        <Sparkles
            color={ new THREE.Color('#1767b1') }
            count={ 80 }
            position={ [ 0, 0, -5.5 ] }
            size={ Math.random() * 15 + 15 }
            scale={ [ 30, 15, 10 ] }
            speed={ 1 }
        />
    </>
}