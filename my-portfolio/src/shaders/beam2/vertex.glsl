uniform float uTime;
uniform sampler2D uNoiseTexture;

varying vec2 vUv;

#include ../includes/rotate2D.glsl

void main()
{

    vec3 newPosition = position;
    
    // Twist
    // We are picking the halfway point on the perlin texture
    // float twistPerlin = texture(
    //     uNoiseTexture, 
    //     vec2(0.5, uv.y * 0.2 - uTime * 0.005)
    // ).r;
    // float angle = twistPerlin * 10.0;
    // newPosition.xz = rotate2D(newPosition.xz, angle);

    // // Wind
    // vec2 windOffset = vec2(
    //     texture(uNoiseTexture, vec2(0.25, uTime * 0.01)).r - 0.5,
    //     texture(uNoiseTexture, vec2(0.75, uTime * 0.01)).r - 0.5
    // );
    // // We multiple with uv.y so that as the y increases the smoke goes farther out
    // windOffset *= pow(uv.y, 2.0) * 10.0;
    // newPosition.xz += windOffset;
    
    // Final Position
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

    // Varyings
    vUv = uv;

}