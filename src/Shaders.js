// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE = `
    precision mediump float;
    attribute vec4 a_Position;
    attribute vec2 a_UV;
    attribute vec3 a_Normal;
    varying vec2 v_UV;
    varying vec3 v_Normal;
    varying vec4 v_VertPos;
    uniform mat4 u_ModelMatrix;
    uniform mat4 u_GlobalRotateMatrix;
    uniform mat4 u_ViewMatrix;
    uniform mat4 u_ProjectionMatrix;
    uniform float u_Size;

    void main() {
        gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
        v_UV = a_UV;
        v_Normal = a_Normal;
        //v_Normal = normalize(mat3(u_ModelMatrix) * a_Normal); // Correct normal transformation
        v_VertPos = u_ModelMatrix * a_Position;
    }`

// Fragment shader program

var FSHADER_SOURCE =`
  precision mediump float;
  varying vec2 v_UV;
  varying vec3 v_Normal;
  uniform vec4 u_FragColor;
  uniform sampler2D u_Sampler0;
  uniform sampler2D u_Sampler1;
  uniform sampler2D u_Sampler2;
  uniform sampler2D u_Sampler3;
  uniform sampler2D u_Sampler4;
  uniform int u_whichTexture;
  uniform vec3 u_lightPos;
  uniform vec3 u_cameraPos;
  varying vec4 v_VertPos;

  void main() {

    if (u_whichTexture == -3) {
        gl_FragColor = vec4((v_Normal+1.0)/2.0, 1.0);  // use normal
    }
    else if (u_whichTexture == -2) {
        gl_FragColor = u_FragColor;  // use color
    }else if (u_whichTexture == -1) {
        gl_FragColor = vec4(v_UV, 1.0, 1.0); // use UV debug color
    }else if (u_whichTexture == 0) {
        gl_FragColor = texture2D(u_Sampler0, v_UV); // use texture0
    } else if (u_whichTexture == 1) {
        gl_FragColor = texture2D(u_Sampler1, v_UV); // use texture1
    } else if (u_whichTexture == 2) {
        gl_FragColor = texture2D(u_Sampler2, v_UV); // use texture2 for sky
    } else if (u_whichTexture == 3) {
      gl_FragColor = texture2D(u_Sampler3, v_UV); // use texture3 for wall
  } else if (u_whichTexture == 4) {
        gl_FragColor = texture2D(u_Sampler4, v_UV); // use texture4 for ground
  }
    else {
        gl_FragColor = vec4(1,0.2,0.2,1); // error, put reddish
    }

    vec3 lightVector = u_lightPos - vec3(v_VertPos);
    float r = length(lightVector);
    
    
    // if (r < 1.0) {
    //     gl_FragColor = vec4(1,0,0,1);
    // } else if (r < 2.0) {
    //     gl_FragColor = vec4(0,1,0,1);
    // } 

    // N dot L

    vec3 L = normalize(lightVector);
    vec3 N = normalize(v_Normal);
    float nDotL = max(dot(N,L), 0.0);

    // reflection
    vec3 R = reflect(-L,N);

    // eye
    vec3 E = normalize(u_cameraPos - vec3(v_VertPos));

    // specular
    float specular = pow(max(dot(E,R), 0.0), 10.0);


    vec3 diffuse = vec3(gl_FragColor) * nDotL * 0.7;
    vec3 ambient = vec3(gl_FragColor) * 0.3;
    gl_FragColor = vec4(specular+diffuse+ambient, 1.0);
    // gl_FragColor = gl_FragColor * nDotL;
    // gl_FragColor.a = 1.0;
  }`