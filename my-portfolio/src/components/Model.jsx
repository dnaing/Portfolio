import * as THREE from 'three'
import React from 'react'
import { useGLTF, useTexture, Float, Text3D, Center, Billboard } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'


export function Model({position = [ 0, 0, 0 ], cardName, frontSideURL, backSideURL, }) {
    
    const { nodes, materials } = useGLTF('./models/card.glb')

    const textRef = useRef()

    const frontSideTexture = useTexture(frontSideURL)
    frontSideTexture.flipY = false
    frontSideTexture.colorSpace = THREE.SRGBColorSpace

    const backSideTexture = useTexture(backSideURL)
    backSideTexture.flipY = false
    backSideTexture.colorSpace = THREE.SRGBColorSpace

    nodes.Front.material.map = frontSideTexture
    nodes.Back.material.map = backSideTexture

    const click = (event) =>
    {
        // Depending on the card that was clicked a different page will reveal itself
        console.log('Clicked!')

        // Don't trigger click on back side of card
        event.stopPropagation()
        
    }

    useFrame((state) =>
    {
        textRef.current.lookAt(state.camera.position)
    })

    useEffect(() =>
    {
        if (textRef.current)
        {

            textRef.current.geometry.computeBoundingBox()
            const boundingBox = textRef.current.geometry.boundingBox

            const textWidthX = boundingBox.max.x * 0.3
            const textWidthY = boundingBox.max.y * 0.3

            textRef.current.geometry.translate(-textWidthX, -textWidthY, 0)
        }
    }, [])

    return <>
        <Float
            // autoInvalidate
            speed={2} // Animation speed, defaults to 1
            rotationIntensity={0.5} // XYZ rotation intensity, defaults to 1
            floatIntensity={1.5} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
            floatingRange={[-0.1, 0.1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
        >
            <group 
                dispose={null} 
                position={ position } 
                scale={ 0.4 } 
            >

                <Text3D
                    ref={ textRef }  
                    font="./fonts/berry_rotunda.json" 
                    size={ 0.45 } 
                    position-y={ 4.6 }
                >
                    { cardName }
                    <meshBasicMaterial color={ [ 15, 15, 15 ] } toneMapped={ false } />
                </Text3D>

                <mesh
                    className="card"
                    onClick={ (event) => click(event) }
                    onPointerEnter={ () => { document.body.style.cursor = 'pointer' } }
                    onPointerLeave={ () => { document.body.style.cursor = 'default' } }
                    geometry={nodes.Front.geometry}
                    material={materials.front.clone()}
                    position={[0, 0, 0.01]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    scale={[3.5, 1, 2.5]}
                />
                <mesh
                    geometry={nodes.Back.geometry}
                    material={materials.back}
                    rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                    scale={[3.5, 1, 2.5]}
                />
            </group>
        </Float>
        
    </>
}

useGLTF.preload('/card.glb')