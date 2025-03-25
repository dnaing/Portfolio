import React from 'react'
import * as THREE from 'three'
import { useTexture, useGLTF, Float } from '@react-three/drei'
import { useMemo } from 'react'

export default function Card({ position = [0, 0, 0] })
{

    const frontSideTexture = useTexture('./images/hank2.jpg')
    frontSideTexture.flipY = false
    frontSideTexture.colorSpace = THREE.SRGBColorSpace
    
    const backSideTexture = useTexture('./images/hank.jpg')
    backSideTexture.flipY = false
    backSideTexture.colorSpace = THREE.SRGBColorSpace

    const model = useGLTF('./models/card.glb')

    // Whenever the model changes, we reclone everything
    // const clonedScene = useMemo(() => model.scene.clone(), [model]);
    const clonedScene = model.scene.clone()

    model.nodes.Front.material.map = frontSideTexture
    model.nodes.Back.material.map = backSideTexture

    return <>

        <Float
            speed={2} // Animation speed, defaults to 1
            rotationIntensity={0.5} // XYZ rotation intensity, defaults to 1
            floatIntensity={1.5} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
            floatingRange={[-0.1, 0.1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
        >
            <primitive object={ clonedScene } scale={ 0.4 } position={ position } />
        </Float>


        
    </>
}