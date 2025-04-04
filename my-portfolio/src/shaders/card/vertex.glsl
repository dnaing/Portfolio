#include ../includes/simplexNoise4d.glsl

uniform float uTime;
uniform float uPositionFrequency;
uniform float uTimeFrequency;
uniform float uStrength;


float getWobble(vec3 position)
{
    return simplexNoise4d(vec4(
        position * uPositionFrequency,
        uTime * uTimeFrequency
    )) * uStrength;
}

void main()
{
    // X is vertical (y)
    // Z is horizontal (x)
    // Y is depth (z)
    
    // csm_Position.y += sin(csm_Position.x * 10.0) * 0.5;

    float wobble = getWobble(csm_Position);

    csm_Position += wobble * normal;
}