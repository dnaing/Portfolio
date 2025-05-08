import * as THREE from 'three'
import React, { useMemo } from 'react'
import { useGLTF, useTexture, Float, PresentationControls } from '@react-three/drei'
import CustomShaderMaterial from 'three-custom-shader-material'

import cardVertexShader from '../../shaders/card/vertex.glsl'
import cardFragmentShader from '../../shaders/card/fragment.glsl'

export default function MobileCard() {

    const { nodes, materials } = useGLTF('/models/card.glb')

    const cardWidth = 1.2

    const uniforms = {
        uColor: new THREE.Uniform(new THREE.Vector3(0, 3, 10))
    }

    const frontSideTexture = useTexture('./images/pixel-cards/joker.png')
    const backSideTexture = useTexture('./images/pixel-cards/back.png')

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

    // Load in back texture and set it up
    const backMaterial = useMemo(() =>
    {
        backSideTexture.repeat.y = - 1
        backSideTexture.rotation = Math.PI / 2
        backSideTexture.colorSpace = THREE.SRGBColorSpace

        const backMaterial = materials.back.clone()
        backMaterial.map = backSideTexture
        backMaterial.transparent = true
        backMaterial.opacity = 1
        backMaterial.depthWrite = false

        return backMaterial

    }, [backSideTexture])

    
    
    return <>
        <PresentationControls
            global
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]} // vertical
            azimuth={[-Math.PI / 1.4, Math.PI / 1.4]} // horizontal
            config={ { mass: 2, tension: 500 } }
            snap
        >
            <Float
                // autoInvalidate
                speed={2} // Animation speed, defaults to 1
                rotationIntensity={0.5} // XYZ rotation intensity, defaults to 1
                floatIntensity={1.5} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
                floatingRange={[-0.1, 0.1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
            >
                {/* Front Side */}
                <mesh
                    geometry={nodes.Front.geometry}
                    rotation={ [ Math.PI / 2, Math.PI / 2, 0 ] }
                    position={ [ 0, -0.25, 0 ] }
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


                {/* Back Side */}
                <mesh
                    geometry={nodes.Back.geometry}
                    position={[0, -0.25, -0.01]}
                    rotation={[Math.PI / 2, Math.PI / 2, 0]}
                    scale={[cardWidth * 1.4, 1, cardWidth]} // height is always width * 1.4
                >
                    <CustomShaderMaterial
                        baseMaterial={ THREE.MeshStandardMaterial }
                        vertexShader={ cardVertexShader }
                        fragmentShader={ cardFragmentShader }
                        uniforms={ uniforms }

                        map={ backMaterial.map }
                        transparent={ backMaterial.transparent }
                        opacity={ backMaterial.opacity }
                        depthWrite={ backMaterial.depthWrite } 
                        side={THREE.BackSide}
                    />
                </mesh>



            </Float>
        </PresentationControls>
    </>
}

useGLTF.preload('/models/card.glb')