uniform float uTime;
uniform float uPixelRatio;
uniform float uSize;
uniform float uSpeed;
uniform vec3 uNoise;

attribute float aScale; 

varying float vOffset;

void main() {

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    modelPosition.y += sin(uTime * uSpeed + modelPosition.x * uNoise.x * 100.0) * 0.2;
    modelPosition.z += cos(uTime * uSpeed + modelPosition.x * uNoise.y * 100.0) * 0.2;
    modelPosition.x += cos(uTime * uSpeed + modelPosition.x * uNoise.z * 100.0) * 0.2;

    vec4 viewPosition = viewMatrix * modelPosition;

    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;
    gl_PointSize = uSize * aScale * uPixelRatio;
    gl_PointSize *= (1.0 / - viewPosition.z);

    // Varyings
    vOffset = aScale;
}