import { OrbitControls, Center } from '@react-three/drei'

export default function MobileExperience()
{
    return <>

        <OrbitControls />

        <mesh>
            <boxGeometry args={ [ 1, 1 ] } />
            <meshBasicMaterial color={"red"} />
        </mesh>
    
    </>
}