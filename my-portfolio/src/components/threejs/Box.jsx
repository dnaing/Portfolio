import { extend } from "@react-three/fiber"

import CustomCardMaterial from "../custom-materials/CustomCardMaterial"

extend({ CustomCardMaterial })

export default function Box()
{

    return <>

        <mesh>
            <boxGeometry />
            <customCardMaterial />
        </mesh>
    
    </>
}