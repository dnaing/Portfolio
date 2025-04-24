import * as THREE from 'three'
import React, { useRef, useMemo } from 'react'
import { extend, useThree, useLoader, useFrame } from '@react-three/fiber'
import { Water } from 'three-stdlib'

extend({ Water })

export default function Ocean() {
    const ref = useRef()
    const gl = useThree((state) => state.gl)
    const waterNormals = useLoader(THREE.TextureLoader, "./images/waternormals.jpg")
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping
    const geom = useMemo(() => new THREE.PlaneGeometry(60, 40), [])
    const config = useMemo(() => ({
        textureWidth: 512,
        textureHeight: 512,
        waterNormals,
        sunDirection: new THREE.Vector3(0, -1, 0),
        sunColor: 0x000000,
        waterColor: 0x000000,
        distortionScale: 0.01,
        fog: true,
        format: gl.encoding
    }), [waterNormals])
    useFrame((state, delta) => (ref.current.material.uniforms.time.value += delta / 10))
    return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} position-y={-2.4} />
}




    // return (
    //     <Canvas camera={{ position: [0, 5, 100], fov: 55, near: 1, far: 20000 }}>
    //         <pointLight decay={0} position={[100, 100, 100]} />
    //         <pointLight decay={0.5} position={[-100, -100, -100]} />
    //         <Suspense fallback={null}>
    //         <Ocean />
    //         <Box />
    //         </Suspense>
    //         <Sky scale={1000} sunPosition={[500, 150, -1000]} turbidity={0.1} />
    //         <OrbitControls />
    //     </Canvas>
    // )
