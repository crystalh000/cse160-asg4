// Global Variables
let canvas;
let g_camera;
let u_whichTexture;
let gl;
let a_Position;
let a_UV;
let a_Normal;
let u_FragColor;
let u_Size;
let u_ModelMatrix;
let u_ViewMatrix;
let u_ProjectionMatrix;
let u_GlobalRotateMatrix;
let u_Sampler0;
let u_Sampler1;
let u_Sampler2;
let u_Sampler3;
let u_Sampler4;
let u_lightPos;



let g_yellowAngle = 0;
let g_magentaAngleL = 0;
let g_magentaAngleR = 0;
let g_footAngleR = 0;
let g_footAngleL = 0;
let g_footLiftR = 0;
let g_footLiftL = 0;
let g_globalAngle = 0; // Add this line
let g_yellowAnimation=false;
let g_magentaAnimation=false;
let g_runAnimation = false;
let g_pokeAnimation = false;
let maxSwingAngle = 25;
let maxLiftHeight = 0.1;
let g_armAngleR = 0;
let g_armAngleL = 0;
let g_bodyAngle = 0;
let g_headAngle = 0;
let g_headY = 0;
var g_jumpHeight = 0;
var animalXRotation = 0;
var animalYRotation = 0;
let g_normalOn = false;

let cubesData = [];
const numCubes = 12; // Number of cubes to generate
const worldSize = 32; // Size of the world

let bunnyHappiness = 0;

// from ChatGPT to help with adding and removing blocks
// referenced Bees in Hall of Fame as well

var BUILD_MODE = 1;
var DESTROY_MODE = 2;
let g_buildMode = null;
var none = 0;
var carrotBlock = 4;
var g_blockType = carrotBlock;

var g_selected = null;
var g_buildHeight = 10;
let g_map;
let g_mapInitialized = false;
let g_lightPos = [0,1.5,1];

let u_cameraPos;
