#include ../includes/simplexNoise4d.glsl

varying vec2 vUv;


void main()
{
    // X is vertical (y)
    // Z is horizontal (x)
    // Y is depth (z)
    vUv = uv;
}