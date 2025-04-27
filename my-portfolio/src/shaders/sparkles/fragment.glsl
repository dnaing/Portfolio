// varying vec3 vColor;
uniform float uTime;
uniform float uOpacity;
uniform float uEmissiveIntensity;
uniform vec3 uSparklesColor;

varying float vOffset;

void main() {

    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 0.05 / distanceToCenter - 0.1;

    // Makes particles fade in and out
    strength *= (sin(uTime + vOffset * 5.0) + 1.0) / 2.0 + 0.4;

    // Clamp strength between 0 and 1
    strength = clamp(strength, 0.0, 1.0);
    
    // Final Color
    gl_FragColor = vec4(uSparklesColor * uEmissiveIntensity, strength * uOpacity);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}