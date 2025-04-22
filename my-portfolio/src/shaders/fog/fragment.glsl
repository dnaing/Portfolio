// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform float uTime;
uniform vec2 uResolution;
uniform float uXMod;
uniform float uYMod;

float random (in vec2 _st) {
    return 
        fract(
            sin(
                dot(_st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
        (c - a)* u.y * (1.0 - u.x) +
        (d - b) * u.x * u.y;
}

#define NUM_OCTAVES 4
float fbm ( in vec2 _st) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(_st);
        _st = rot * _st * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}



void main()
{

    vec2 st = gl_FragCoord.xy / uResolution.xy * 3.0;
    st.y *= 2.0;
    st.x *= 1.5;
    // st += st * abs(sin(uTime*0.1)*1.0);

    vec3 color = vec3(0.0);

    vec2 q = vec2(0.0);
    q.x = fbm( st + 0.00*uTime) * uXMod;
    q.y = fbm( st + vec2(1.0)) * uYMod;

    vec2 r = vec2(0.0);
    r.x = fbm( st + 1.0*q + vec2(1.7,9.2)+ 0.15*uTime) * uXMod;
    r.y = fbm( st + 1.0*q + vec2(8.3,2.8)+ 0.126*uTime) * uYMod;

    // vec2 s = vec2(0.0);
    // s.x = fbm( st + 1.0*r + vec2(1.7,9.2)+ 0.15*uTime) * uXMod;
    // s.y = fbm( st + 1.0*r + vec2(8.3,2.8)+ 0.126*uTime) * uYMod;

    // vec2 t = vec2(0.0);
    // t.x = fbm( st + 1.0*s + vec2(1.7,9.2)+ 0.15*uTime) * uXMod;
    // t.y = fbm( st + 1.0*s + vec2(8.3,2.8)+ 0.126*uTime) * uYMod;

    // vec2 u = vec2(0.0);
    // u.x = fbm( st + 1.0*t + vec2(1.7,9.2)+ 0.15*uTime) * uXMod;
    // u.y = fbm( st + 1.0*t + vec2(8.3,2.8)+ 0.126*uTime) * uYMod;

    // vec2 v = vec2(0.0);
    // v.x = fbm( st + 1.0*u + vec2(1.7,9.2)+ 0.15*uTime) * uXMod;
    // v.y = fbm( st + 1.0*u + vec2(8.3,2.8)+ 0.126*uTime) * uYMod;

    float f = fbm(st + r);

    // color = mix(vec3(0.05, 0.05, 0.08),  // deep shadowy blue
    //         vec3(0.2, 0.1, 0.25),    // muted purple
    //         clamp((f*f)*4.0,0.0,1.0));

    // color = mix(color,
    //         vec3(0.01, 0.01, 0.02),  // near black
    //         clamp(length(q), 0.0, 1.0));

    // color = mix(color,
    //         vec3(0.3, 0.2, 0.5),  // deep violet or arcane glow
    //         clamp(length(r.x), 0.0, 1.0));

    // color = mix(color,
    //             vec3(0.666667,1,1),
    //             clamp(length(r.x),0.0,1.0));

    float alpha = smoothstep(0.3, 0.8, f);

    // Final Color
    csm_FragColor = vec4((f*f*f+.6*f*f+.5*f) * color, alpha);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}