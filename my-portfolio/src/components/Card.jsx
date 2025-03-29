import * as THREE from 'three'
import React from 'react'
import { useGLTF, useTexture, Float, Text3D, Center, Billboard } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { gsap } from 'gsap'

export function Card({position = [ 0, 0, 0 ], cardName, frontSideURL, backSideURL, }) {
    
    const { nodes, materials } = useGLTF('./models/card.glb')

    const title = useRef()
    const card = useRef()

    const frontSideTexture = useTexture(frontSideURL)
    frontSideTexture.flipY = false
    frontSideTexture.wrapS = THREE.RepeatWrapping;
    frontSideTexture.repeat.x = - 1
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

    const pointerEnter = () =>
    {
        document.body.style.cursor = 'pointer'

        gsap.to(
            card.current.scale,
            {
                duration: 0.3,
                ease: 'power2.inOut',
                x: '3.85',
                z: '2.75'

            }
        )
    }

    const pointerLeave = () =>
    {
        document.body.style.cursor = 'default'

        gsap.to(
            card.current.scale,
            {
                duration: 0.3,
                ease: 'power2.inOut',
                x: '3.5',
                z: '2.5'
            }
        )
    }

    useFrame((state) =>
    {
        title.current.lookAt(state.camera.position)
    })

    useEffect(() =>
    {
        if (title.current)
        {

            title.current.geometry.computeBoundingBox()
            const boundingBox = title.current.geometry.boundingBox

            const textWidthX = boundingBox.max.x * 0.3
            const textWidthY = boundingBox.max.y * 0.3

            title.current.geometry.translate(-textWidthX, -textWidthY, 0)
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
                    ref={ title }  
                    font="./fonts/berry_rotunda.json" 
                    size={ 0.45 } 
                    position-y={ 4.85 }
                >
                    { cardName }
                    <meshBasicMaterial color={ [ 15, 15, 15 ] } toneMapped={ false } />
                </Text3D>

                <mesh
                    ref={ card }
                    onClick={ (event) => click(event) }
                    onPointerEnter={ () => { pointerEnter() } }
                    onPointerLeave={ () => { pointerLeave() } }
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