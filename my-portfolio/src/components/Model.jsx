import * as THREE from 'three'
import React from 'react'
import { useGLTF, useTexture, Float } from '@react-three/drei'


export function Model({position = [ 0, 0, 0 ], frontSideURL, backSideURL}) {
    
    const { nodes, materials } = useGLTF('./models/card.glb')

    const frontSideTexture = useTexture(frontSideURL)
    frontSideTexture.flipY = false
    frontSideTexture.colorSpace = THREE.SRGBColorSpace

    const backSideTexture = useTexture(backSideURL)
    backSideTexture.flipY = false
    backSideTexture.colorSpace = THREE.SRGBColorSpace

    nodes.Front.material.map = frontSideTexture
    nodes.Back.material.map = backSideTexture

    return <>
        <Float
            // autoInvalidate
            speed={2} // Animation speed, defaults to 1
            rotationIntensity={0.5} // XYZ rotation intensity, defaults to 1
            floatIntensity={1.5} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
            floatingRange={[-0.1, 0.1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
        >
            <group dispose={null} position={ position } scale={ 0.4 }>
                <mesh
                geometry={nodes.Back.geometry}
                material={materials.back}
                rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                scale={[3.5, 1, 2.5]}
                />
                <mesh
                geometry={nodes.Front.geometry}
                material={materials.front}
                position={[0, 0, 0.01]}
                rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                scale={[3.5, 1, 2.5]}
                />
            </group>
        </Float>
    </>
}

useGLTF.preload('/card.glb')