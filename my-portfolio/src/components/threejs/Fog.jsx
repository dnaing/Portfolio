import { useControls } from 'leva'
import * as THREE from 'three'
import { Cloud, Clouds } from '@react-three/drei'

export default function Fog()
{

    const { fogColor } = useControls({
        fogColor: '#ffffff'
    })

    return <>

        <Clouds material={ THREE.MeshBasicMaterial }>
            <Cloud
                color={ fogColor }
                segments={ 10 }
                concentrate="inside"
                scale={ 2 }
                volume={ 10 }
                speed={ 0.25 }
                growth={ 1 }
                fade={ 100 }
                opacity={ 0.2 }
            />
        </Clouds>
    </>
}