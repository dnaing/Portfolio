import * as THREE from 'three'
import { useEffect, useState, useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'



function InstancedCards({ instances })
{

    const ref = useRef()

    useEffect(() => 
    {
        for (let i = 0; i < instances.count; i++)
        {
            const matrix = new THREE.Matrix4()
            matrix.compose(
                new THREE.Vector3(instances[i].position[0], instances[i].position[1], instances[i].position[2]),
                new THREE.Quaternion(),
                new THREE.Vector3(instances[i].rotation[0], instances[i].rotation[1], instances[i].rotation[2])
            )
            // cards.current.setMatrixAt(i, matrix)
            ref.current.setMatrixAt(i, matrix)
            // ref.current.instanceMatrix.needsUpdate = true
        }
    }, [])


    return <>

        <instancedMesh ref={ref} args={[null, null, instances.length]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshNormalMaterial />
        </instancedMesh>

    </>
}


export default function BackgroundCards()
{

    const cardsCount = 52

    const instances = useMemo(() =>
    {
        const instances = []

        for (let i = 0; i < cardsCount; i++)
        {
            instances.push({
                key: 'instance_' + i,
                position: [ i * 2, 0, 0 ],
                rotation: [ 0, 0, 0 ]
            })
        }

        return instances

    }, [])

    return <>

        <InstancedCards instances={ instances }/>

    </>



    // const cardsCount = 52
    // const cards = useRef()

    // useEffect(() => 
    // {
    //     for (let i = 0; i < cardsCount; i++)
    //     {
    //         const matrix = new THREE.Matrix4()
    //         matrix.compose(
    //             new THREE.Vector3(i * 2, 0, 0),
    //             new THREE.Quaternion(),
    //             new THREE.Vector3(1, 1, 1)
    //         )
    //         cards.current.setMatrixAt(i, matrix)
    //     }
    // }, [])

    // return <>

    //     <instancedMesh ref={ cards } args={ [ null, null, cardsCount ] } >
    //         <boxGeometry />
    //         <meshStandardMaterial color="tomato" />
    //     </instancedMesh>

    // </>
}