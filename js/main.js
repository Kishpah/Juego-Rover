/* 
    Juego de un pequeño rover que pasea por Marte
*/

//Cargar módulos
//Cargar assets
//Inicializar el juego
//Iniciar el juego

var giroX = -1.3;
var giroY = -0.8;
var giroCabeza = 0.01;
var giroAntena = 0.01;
var posCamaraX = 0;
var posCamaraY = 0;
var mostrarSombras = false;

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xDD6655,8,40);
scene.background = new THREE.Color(0xDD6655);

const camera = new THREE.PerspectiveCamera(
    35,
    window.innerWidth / window.innerHeight,
    5,
    25
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = mostrarSombras;
document.body.appendChild(renderer.domElement);

// Luz ambiente para la escena
var light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);
// Luz direccional para darle chicha
var directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(1, 2, 3).normalize();
directionalLight.castShadow = mostrarSombras;
scene.add(directionalLight);

crearModelo();
/*
roverModel.scale.x=.5;
roverModel.scale.y=.5;
roverModel.scale.z=.5;
*/
scene.add(roverModel);

var geo = new THREE.PlaneGeometry(100,100, 20);
var mat = new THREE.MeshPhongMaterial({ color: 0xAA4433 });
var suelo = new THREE.Mesh(geo, mat);
suelo.receiveShadow = mostrarSombras;
scene.add(suelo);

terreno.init();
terreno.generarTerreno();
for(i=0;i<terreno.tamañoTerreno;i++){
    for(j=0;j<terreno.tamañoTerreno;j++){
        scene.add(terreno.baldosas[i][j].baldosaModel);
    }
}

camera.position.z = 5;
camera.rotation.x = 1;
camera.rotation.z = -0;
posCamaraY = -8;

const keyDown = function (e) {
    switch (e.key) {
        case "ArrowUp":
            posCamaraY += 0.05;
            posRoverY += 0.05;
            break;
        case "ArrowDown":
            posCamaraY -= 0.05;
            posRoverY -= 0.05;
            break;
        case "ArrowLeft":
            posCamaraX -= 0.05;
            posRoverX -= 0.05;
        break;
        case "ArrowRight":
            posCamaraX += 0.05;
            posRoverX += 0.05;
        break;
    }
    //posRoverZ = terreno.devolverZ(posRoverX, posRoverY)-0.4;
    colocarRover();
};

mouseClick = false;
offsetX = 0;
offsetY = 0;
proporcionGiro = 0.01;

const mouseMove = function (e) {
    if (mouseClick === true) {
        giroY += (e.offsetX - offsetX) * proporcionGiro;
        giroX += (e.offsetY - offsetY) * proporcionGiro;
        offsetX = e.offsetX;
        offsetY = e.offsetY;
    }
};

const mouseDown = function (e) {
    mouseClick = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
};

const mouseUp = function (e) {
    if (mouseClick === true) {
        giroX += (e.offsetX - offsetX) * proporcionGiro;
        giroY += (e.offsetY - offsetY) * proporcionGiro;
        offsetX = e.offsetX;
        offsetY = e.offsetY;
    }
    mouseClick = false;
};

const animate = function () {
    requestAnimationFrame(animate);

    cabeza.rotation.z += giroCabeza;
    if (Math.abs(cabeza.rotation.z) > 0.2) {
        giroCabeza = -giroCabeza;
    }
    antena.rotation.y += giroAntena;
    if (antena.rotation.y < 0.8 || antena.rotation.y > 1.2) {
        giroAntena = -giroAntena;
    }
    camera.position.x = posCamaraX;
    camera.position.y = posCamaraY;
    roverModel.position.x = posRoverX;
    roverModel.position.y = posRoverY;
    roverModel.position.z = posRoverZ;
    renderer.render(scene, camera);
};

document.body.addEventListener("keydown", keyDown, false);

renderer.domElement.addEventListener("mousemove", mouseMove, false);
renderer.domElement.addEventListener("mousedown", mouseDown, false);
renderer.domElement.addEventListener("mouseup", mouseUp, false);

animate();