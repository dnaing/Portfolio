
uniform vec3 uColor;

varying vec2 vUv;

void main()
{

    // Rotate the UV counter clockwise 90 degrees
    vec2 rotatedUv = vec2(vUv.y, vUv.x);

    // Get the texture color from our map
    vec4 texColor = texture2D(map, rotatedUv);

    // // For cards with a white background

    // Invert Colors
    // vec4 invertedTexColor = vec4(1.0 - texColor.r, 1.0 - texColor.g, 1.0 - texColor.b, 1.0);

    // //  Outline Glow
    // vec3 glowColor = vec3(0.0, 1.0, 10.0);

    // // Brightness
    // float brightness = max(invertedTexColor.r, max(invertedTexColor.g, invertedTexColor.b));

    // // Use smoothstep to control the transition of the glow effect
    // float glowFactor = smoothstep(0.10, 0.50, brightness); // Adjust these values for softness

    // // Mix glows into texColor
    // texColor.rgb = mix(invertedTexColor.rgb, glowColor, glowFactor);


    // For cards with a dark background

    // // Outline Glow
    vec3 glowColor = uColor;

    // Brightness
    float brightness = max(texColor.r, max(texColor.g, texColor.b));

    // Use smoothstep to ocntrol the transition of the glow effect
    float glowFactor = smoothstep(0.15, 0.25, brightness); // Adjust 0.15 and 0.25 for more/less softness

    // Mix glows into texColor
    texColor.rgb = mix(texColor.rgb, glowColor, glowFactor);
 
    // Set the final color
    csm_FragColor = vec4(texColor.rgb, 1.0 * opacity);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}