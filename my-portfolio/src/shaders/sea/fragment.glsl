// float distanceToCamera = distance(cameraPosition, modelPosition);

// //so first of all I sent a viewPosition to an fragment (I had been thinking about difference between projectedPosition and viewPosition). If I'm correct, the viewPosition stays the same, although I change the scale of a mesh to lets say scale(3,3,3) -> the fog effect should be the same regardless of the scale

// varying vec4 vView;

// //Bruno gave a hint to calculate a distance 
// float distanceFromCamera = (distance(vView.xy, vUv.xy) - 5.0) / 100.0;

// // -5.0 black part
// // / 100 smoothness of edges


// // I flipped black and white using smoothstep and clamped the values (wasnt sure if the values can be negative so i'm clamping it to be able to use it in opacity
// float smoothCamera = clamp(
//         smoothstep(0.01, 0.0, distanceFromCamera),
//         0.0,
//         1.0
//     );

// gl_FragColor = vec4(color, smoothCamera);


uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform vec3 uEmissiveColor;
uniform vec3 uFogColor;
uniform float uColorOffset;
uniform float uColorMultiplier;
uniform float uFogDensity;

uniform float uSmoothMin;
uniform float uSmoothMax;
uniform float uEmissiveStrength;

varying float vElevation;
varying vec3 vPosition;
varying vec3 vNormal;

#include ../includes/directionalLight.glsl

void main()
{
    float distanceToCamera = distance(cameraPosition, vPosition);

    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 normal = normalize(vNormal);

    // Light
    vec3 light = vec3(0.0);

    light += directionalLight(
        vec3(1.0), // Light color
        1.0, // Light intensity
        normal, // Normal
        vec3(-1.0, 0.5, 0.0), // Light position
        viewDirection, // View direction
        30.0 // Specular power
    );

    // Base Color
    float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
    mixStrength = smoothstep(0.0, 1.0, mixStrength);
    vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);
    
    color *= light;

    // Emission
    float emissiveFactor = smoothstep(uSmoothMin, uSmoothMax, vElevation);
    color.rgb += uEmissiveColor * emissiveFactor * uEmissiveStrength;

    // Fog
    float fogFactor = clamp(distanceToCamera / (101.0 - uFogDensity), 0.0, 1.0);
    vec3 finalColor = mix(color, uFogColor, fogFactor);
    
    // No Fog
    // vec3 finalColor = color;

    // Final Color
    gl_FragColor = vec4(finalColor, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}