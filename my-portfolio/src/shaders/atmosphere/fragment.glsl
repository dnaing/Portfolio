uniform vec3 uSunDirection;
uniform vec3 uAtmosphereDayColor;
uniform vec3 uAtmosphereTwilightColor;

varying vec3 vNormal;
varying vec3 vPosition;

void main()
{

    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 normal = normalize(vNormal);
    vec3 color = vec3(0.0);

    // Sun Orientation
    float sunOrientation = max(dot(normal, uSunDirection), 0.0);

    // Atmosphere
    float atmosphereDayMix = smoothstep(0.0, 1.0, dot(uSunDirection, normal));

    vec3 atmosphereColor = mix(uAtmosphereTwilightColor, uAtmosphereDayColor, atmosphereDayMix);
    color += atmosphereColor * 75.0;

    // Alpha
    float edgeAlpha = dot(viewDirection, normal);
    edgeAlpha = smoothstep(0.0, 0.5, edgeAlpha);

    // float dayAlpha = smoothstep(-0.5, 0.0, dot(uSunDirection, normal));
    
    // float alpha = max(0.1, (edgeAlpha * dayAlpha));

    // Final Color
    gl_FragColor = vec4(color, edgeAlpha);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}