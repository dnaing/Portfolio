// varying vec3 vColor;
uniform float uOpacity;

uniform float uEmissiveIntensity;

varying vec3 vColor;

void main() {
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 0.05 / distanceToCenter - 0.1;
    strength = clamp(strength, 0.0, 1.0);
    // if (strength < 0.001) discard; // Discard pixels that are too dark
    // float colorR = vColor.r * uEmissiveStrength;
    // float colorG = vColor.g * uEmissiveStrength;
    // float colorB = vColor.b * uEmissiveStrength;
    gl_FragColor = vec4(vColor * uEmissiveIntensity, strength * uOpacity);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}