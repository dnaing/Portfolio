uniform float uTime;

varying vec2 vUv;

void main()
{
    vec2 rotatedUv = vec2(vUv.y, 1.0 - vUv.x); // Rotate 90 degrees clockwise
    vec4 texColor = texture2D(map, rotatedUv); // 'map' is the texture uniform
    texColor.rgb *= 0.75;

    // Range from 1.00 to 1.50
    float glow = (sin(uTime * 1.5) + 1.0) / 5.0 + 1.0;
    csm_FragColor = vec4(texColor.rgb * glow, 1.0);

}