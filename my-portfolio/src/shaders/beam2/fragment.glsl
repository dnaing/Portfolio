uniform float uTime;
uniform sampler2D uNoiseTexture;

varying vec2 vUv; // we can't directly alter varyings

void main()
{

    // Scale and Animate
    vec2 smokeUv = vUv;
    // Use less of the uv so that it is less detailed
    smokeUv.x *= 0.3;
    smokeUv.y *= 0.3;

    // Animate the smoke upwards
    smokeUv.y -= uTime * 0.01;

    // Smoke
    float smoke = texture(uNoiseTexture, smokeUv).g;

    // Remapping to make it less smoky
    // smoke = smoothstep(0.4, 1.0, smoke);

    // Fade Edges
    smoke *= smoothstep(0.0, 0.1, vUv.x);
    smoke *= smoothstep(1.0, 0.9, vUv.x);
    smoke *= smoothstep(0.0, 0.1, vUv.y);
    smoke *= smoothstep(1.0, 0.4, vUv.y);

    gl_FragColor = vec4(0.0, 2.0, 8.0, 1.0);
    // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}