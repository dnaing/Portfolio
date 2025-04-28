// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

/*
    "Turbulent Flame" by @XorDev
    
    All credit for this shader goes out to @XorDev. 

    https://www.shadertoy.com/view/wffXDr
*/

uniform float uTime;
uniform vec2 uResolution;
uniform sampler2D uNoiseTexture;
uniform vec3 uBeamColor;
uniform float uBeamOpacity;

varying vec2 vUv;

//Fire ring radius
#define RADIUS 0.4
//Falloff gradient
#define GRADIENT 0.3
//Scroll speed
#define SCROLL 0.1
//Flicker intensity
#define FLICKER 0.12
//Flicker animation speed
#define FLICKER_SPEED 12.0

//Number of turbulence waves
#define TURB_NUM 10.0
//Turbulence wave amplitude
#define TURB_AMP 0.4
//Turbulence wave speed
#define TURB_SPEED 0.001
//Turbulence frequency (inverse of scale)
#define TURB_FREQ 7.0
//Turbulence frequency multiplier
#define TURB_EXP 1.3

//Apply turbulence to coordinates
vec2 turbulence(vec2 p)
{
    //Turbulence starting scale
    float freq = TURB_FREQ;
    
    //Turbulence rotation matrix
    mat2 rot = mat2(0.6, -0.8, 0.8, 0.6);
    
    //Loop through turbulence octaves
    for(float i=0.0; i<TURB_NUM; i++)
    {
        //Scroll along the rotated y coordinate
        float phase = freq * (p * rot).y + TURB_SPEED*uTime + i;
        //Add a perpendicular sine wave offset
        p += TURB_AMP * rot[0] * sin(phase) / freq;
        
        //Rotate for the next octave
        rot *= mat2(0.6, -0.8, 0.8, 0.6);
        //Scale down for the next octave
        freq *= TURB_EXP;
    }
    
    return p;
}

void main()
{



    //Screen coordinates, centered and aspect corrected
    vec2 p = (gl_FragCoord.xy*2.0-uResolution.xy) / uResolution.y;

    vec2 screen = p;
    
    //Expand vertically
    float xstretch = 20.0 - .5*smoothstep(-2.0,2.0,p.y);

    //Decelerate horizontally
    float ystretch = 1.0 - 0.5 / (1.0+p.x*p.x);

    //Combine
    vec2 stretch = vec2(xstretch, ystretch);

    //Stretch coordinates
    p *= stretch;
    
    //Scroll upward
    float scroll = SCROLL*uTime;
    p.y -= scroll;
    
    p = turbulence(p);
    
    //Reverse the scrolling offset
    p.y += scroll;
    
    //Distance to fireball
    float dist = length(min(p,p/vec2(1,stretch.y))) - RADIUS;
    //Attenuate outward and fade vertically
    float light = 1.0/pow(dist*dist+GRADIENT*max(p.y+.5,0.0),3.0);
    //Coordinates relative to the source
    vec2 source = p + 2.0*vec2(0,RADIUS) * stretch;
    //RGB falloff gradient
    vec3 grad = 0.1 / (1.0 + 8.0*length(source) / vec3(9, 2, 1));
    
    //Flicker animation time
    // float ft = FLICKER_SPEED * uTime;

    //Flicker brightness
    // float flicker = 1.0+FLICKER*cos(ft+sin(ft*1.618-p.y));

    //Ambient lighting
    // vec3 amb = 16.0*flicker/(1.0+dot(screen,screen))*grad;
    
    //Scrolling texture uvs
    vec2 uv = (p - SCROLL*vec2(0,uTime)) / 1e2 * TURB_FREQ;

    //Sample texture for fire
    // vec3 tex = texture(uNoiseTexture,uv).rgb;
    // vec3 tex = vec3(0.5, 0.1, 0.1); // Bright orange by default
    
    //Combine ambient light and fire
    vec3 col = light * grad * uBeamColor;

    //Exponential tonemap
    //https://mini.gmshaders.com/p/tonemaps
    col = 1.0 - exp(-col);

    // Alpha
    float alpha = smoothstep(0.0, 1.0, light);  // Transparency based on light intensity
    alpha *= uBeamOpacity;
    
    csm_FragColor = vec4(col, alpha);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}