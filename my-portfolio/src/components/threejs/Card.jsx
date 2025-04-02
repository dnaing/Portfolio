import * as THREE from 'three'
import React, { useMemo } from 'react'
import { useGLTF, useTexture, Float, Text3D } from '@react-three/drei'
import { useRef, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { gsap } from 'gsap'

import useCard from '../../stores/useCard'

export function Card({position, cardName, frontSideURL, backSideURL, cardsGroup }) {

    const { nodes, materials } = useGLTF('./models/card.glb')

    const title = useRef()
    const card = useRef()
    const cardGroup = useRef()

    const activeCard = useCard((state) => state.activeCard)
    const setActiveCard = useCard((state) => state.setActiveCard)
    const setCameraPosition = useCard((state) => state.setCameraPosition)

    const frontSideTexture = useTexture(frontSideURL)
    const backSideTexture = useTexture(backSideURL)

    // Load in front texture and set it up
    const frontMaterial = useMemo(() =>
    {   
        frontSideTexture.flipY = false
        frontSideTexture.wrapS = THREE.RepeatWrapping;
        frontSideTexture.repeat.x = - 1
        frontSideTexture.colorSpace = THREE.SRGBColorSpace

        const frontMaterial = materials.front.clone()
        frontMaterial.map = frontSideTexture
        frontMaterial.transparent = true
        frontMaterial.opacity = 1
        frontMaterial.depthWrite = false

        return frontMaterial
    }, [frontSideTexture])
    
    // Load in back texture and set it up
    const backMaterial = useMemo(() =>
    {
        backSideTexture.flipY = false
        backSideTexture.wrapS = THREE.RepeatWrapping;
        backSideTexture.repeat.x = - 1
        backSideTexture.colorSpace = THREE.SRGBColorSpace

        const backMaterial = materials.back.clone()
        backMaterial.map = backSideTexture
        backMaterial.transparent = true
        backMaterial.opacity = 1
        backMaterial.depthWrite = false

        return backMaterial

    }, [backSideTexture])

    const fadeOtherMainCardsOut = () =>
    {

        // Fades other main cards out
        cardsGroup.current.traverse((child) =>
        {
            if ( 
                child.parent !== cardGroup.current && 
                child instanceof THREE.Mesh && 
                (child.material instanceof THREE.MeshBasicMaterial || child.material instanceof THREE.MeshStandardMaterial) 
            )
            {
                gsap.to(child.material,
                    {
                        duration: 0.5,
                        ease: 'power2.inOut',
                        opacity: 0,
                        onComplete: (() => {

                            // Disallow other main cards to be interactable if fade option is 'OUT
                            // Allow other main cards to be interactable if fade option is 'IN'

                            if (child.material instanceof THREE.MeshBasicMaterial)
                            {
                                child.scale.set(0, 0, 0)
                            }
                            else
                            {
                                child.scale.set(0, 0, 0)
                            }
                        })
                    }
                )
            } 
        })
    }

    const fadeOtherMainCardsIn = () =>
    {

        // Fades other main cards in
        cardsGroup.current.traverse((child) =>
        {
            if ( 
                child.parent !== cardGroup.current && 
                child instanceof THREE.Mesh && 
                (child.material instanceof THREE.MeshBasicMaterial || child.material instanceof THREE.MeshStandardMaterial) 
            )
            {
                if (child.material instanceof THREE.MeshBasicMaterial)
                {
                    child.scale.set(1, 1, 1)
                }
                else
                {
                    child.scale.set(3.5, 1, 2.5)
                }

                gsap.to(child.material,
                    {
                        duration: 0.5,
                        ease: 'power2.inOut',
                        opacity: 1,
                    }
                )
            } 
        })
    }
  
    const click = (event) =>
    {
        
        if (!activeCard)
        {

            fadeOtherMainCardsOut()

            setTimeout(() => {
                setCameraPosition([ position[0] - 6, 0, 3.25 ])
            }, 500)

            // Update global states for which card is active and what camera position we should be at
            setActiveCard(cardName)
            
            

            // Make sure the cursor isn't a pointer anymore
            document.body.style.cursor = 'default'

            // Animate the card back to its proper size
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

        // Don't trigger click on back side of card
        event.stopPropagation()  
    }

    // Enlargen the current card if not selected
    const pointerEnter = () =>
    {
        if (!activeCard)
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
    }

    // Delargen the current card if not selected
    const pointerLeave = () =>
    {
        if (!activeCard)
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
    }

    useFrame((state) =>
    {
        title.current.lookAt(state.camera.position)
    })


    useEffect(() =>
    {

        const unsubscribeActiveCard = useCard.subscribe(
            (state) => state.activeCard,
            (value) =>
            {
                if (!value)
                {
                    // Fade back in other main cards and resize them to scale of 3.5, 1, 2.5
                    fadeOtherMainCardsIn()
                }
            }
        )

        if (title.current)
        {

            title.current.geometry.computeBoundingBox()
            const boundingBox = title.current.geometry.boundingBox

            const textWidthX = boundingBox.max.x * 0.3
            const textWidthY = boundingBox.max.y * 0.3

            title.current.geometry.translate(-textWidthX, -textWidthY, 0)
        }

        return () =>
        {
            unsubscribeActiveCard()
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
                ref={ cardGroup }
                dispose={null} 
                scale={ 0.4 }

            >

                <Text3D
                    ref={ title }  
                    font="./fonts/berry_rotunda.json" 
                    size={ 0.45 } 
                    position-y={ 4.85 }
                >
                    { cardName }
                    <meshBasicMaterial color={ [ 15, 15, 15 ] } toneMapped={ false } transparent={ true } opacity={ 1 } depthWrite={ false } />
                </Text3D>

                <mesh
                    ref={ card }
                    onClick={ (event) => click(event) }
                    onPointerEnter={ () => { pointerEnter() } }
                    onPointerLeave={ () => { pointerLeave() } }
                    geometry={nodes.Front.geometry}
                    material={frontMaterial}
                    position={[0, 0, 0.01]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    scale={[3.5, 1, 2.5]}
                />
                <mesh
                    geometry={nodes.Back.geometry}
                    material={backMaterial}
                    rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                    scale={[3.5, 1, 2.5]}
                />
            </group>
        </Float>
        
    </>
}

useGLTF.preload('/card.glb')