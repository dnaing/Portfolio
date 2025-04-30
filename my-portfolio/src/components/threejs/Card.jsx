import * as THREE from 'three'
import React, { useMemo } from 'react'
import { useGLTF, useTexture, Float, Text3D } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { gsap } from 'gsap'
import CustomShaderMaterial from 'three-custom-shader-material'

import useCard from '../../stores/useCard'
import cardVertexShader from '../../shaders/card/vertex.glsl'
import cardFragmentShader from '../../shaders/card/fragment.glsl'

export default function Card({ cardName, position, cardWidth, cardColor = new THREE.Vector3(0,0,0), frontSideURL, cardsGroup }) {

    const { nodes, materials } = useGLTF('/models/card.glb')

    const title = useRef()
    const card = useRef()
    const cardGroup = useRef()

    const activeCard = useCard((state) => state.activeCard)
    const setActiveCard = useCard((state) => state.setActiveCard)
    const setCameraPosition = useCard((state) => state.setCameraPosition)

    const frontSideTexture = useTexture(frontSideURL)

    const cardHeight = cardWidth * 1.4

    const uniforms = {
        uColor: new THREE.Uniform(cardColor)
    }

    // Load in front texture and set it up
    const frontMaterial = useMemo(() =>
    {   
        frontSideTexture.repeat.y = - 1
        frontSideTexture.rotation = Math.PI / 2
        frontSideTexture.colorSpace = THREE.SRGBColorSpace

        const frontMaterial = materials.front.clone()
        frontMaterial.map = frontSideTexture
        frontMaterial.transparent = true
        frontMaterial.opacity = 1
        frontMaterial.depthWrite = false

        return frontMaterial
    }, [frontSideTexture])
    
    const fadeOtherMainCardsOut = () =>
    {

        // Fades other main cards out
        cardsGroup.current.traverse((child) =>
        {

            if ( 
                child.parent !== cardGroup.current && 
                child instanceof THREE.Mesh && 
                (child.material instanceof THREE.MeshBasicMaterial || child.material.isMeshStandardMaterial) 
            )
            {
                gsap.to(child.material,
                    {
                        duration: 0.75,
                        ease: 'power2.inOut',
                        opacity: 0,
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
                (child.material instanceof THREE.MeshBasicMaterial || child.material.isMeshStandardMaterial) 
            )
            {

                gsap.to(child.material,
                    {
                        duration: 0.75,
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
                setCameraPosition([ position[0], 0, 3.25 ]) // xyz
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
                    x: cardHeight,
                    z: cardWidth
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
                    x: cardHeight * 1.1,
                    z: cardWidth * 1.1
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
                    x: cardHeight,
                    z: cardWidth
                }
            )
        }
    }

    useFrame((state) =>
    {
        if (title.current)
        {
            title.current.lookAt(state.camera.position)
        }
        
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

            const textWidthX = boundingBox.max.x * 0.5
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

                {/* Card Name */}
                <group>
                    <Text3D
                        ref={ title }
                        font="./fonts/berry_rotunda.json"
                        size={ 0.45 }
                        position-y={ 4.7 }
                        position-x={0}
                    >
                        { cardName }
                        <meshBasicMaterial color={ [ cardColor.x, cardColor.y, cardColor.z ] } toneMapped={ false } transparent={ true } opacity={ 1 } depthWrite={ false } />
                    </Text3D>
                </group>

                {/* Front Side */}
                <mesh
                    ref={ card }
                    onClick={ (event) => click(event) }
                    onPointerEnter={ () => { pointerEnter() } }
                    onPointerLeave={ () => { pointerLeave() } }
                    geometry={nodes.Front.geometry}
                    rotation={[Math.PI / 2, Math.PI / 2, 0]}
                    scale={[cardWidth * 1.4, 1, cardWidth]} // height is always width * 1.4
                >
                    <CustomShaderMaterial
                        baseMaterial={ THREE.MeshStandardMaterial }
                        vertexShader={ cardVertexShader }
                        fragmentShader={ cardFragmentShader }
                        uniforms={ uniforms }

                        map={ frontMaterial.map }
                        transparent={ frontMaterial.transparent }
                        opacity={ frontMaterial.opacity }
                        depthWrite={ frontMaterial.depthWrite } 
                        side={THREE.FrontSide}
                    />
                </mesh>

            </group>
        </Float>
        
    </>
}

useGLTF.preload('/models/card.glb')