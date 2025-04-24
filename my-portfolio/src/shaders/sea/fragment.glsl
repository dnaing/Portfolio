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
uniform vec3 uFogColor;
uniform float uColorOffset;
uniform float uColorMultiplier;
uniform float uFogDensity;

varying float vElevation;
varying vec3 vPosition;

void main()
{
    float distanceToCamera = distance(cameraPosition, vPosition);

    float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
    vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);
    float fogFactor = clamp(distanceToCamera / (101.0 - uFogDensity), 0.0, 1.0);
    vec3 finalColor = mix(color, uFogColor, fogFactor);

    gl_FragColor = vec4(finalColor, 1.0);

    #include <colorspace_fragment>
    #include <tonemapping_fragment>
}