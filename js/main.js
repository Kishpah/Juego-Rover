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

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Luz ambiente para la escena
var light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);
// Luz direccional para darle chicha
var directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(1, 2, 3).normalize();
directionalLight.castShadow = true;
scene.add(directionalLight);

crearModelo();
scene.add(roverModel);

var geo = new THREE.PlaneGeometry(20, 20, 20);
var mat = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
var suelo = new THREE.Mesh(geo, mat);
suelo.receiveShadow = true;
suelo.position.z = -0.54;
scene.add(suelo);

camera.position.z = 3;

const keyDown = function (e) {
    switch (e.key) {
        case "ArrowUp":
            giroX += 0.05;
            break;
        case "ArrowDown":
            giroX -= 0.05;
            break;
        case "ArrowLeft":
            giroY += 0.05;
            break;
        case "ArrowRight":
            giroY -= 0.05;
            break;
    }
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
    scene.rotation.x = giroX;
    scene.rotation.z = giroY;
    //directionalLight.position.x += 0.01;
    //directionalLight.rotation.z += 0.01;

    //rover.rotation.x = giroX;
    //rover.rotation.z = -giroY;
    rueda1.position.z = -0.4 + Math.random() * 0.03;
    rueda2.position.z = -0.4 + Math.random() * 0.03;
    rueda3.position.z = -0.4 + Math.random() * 0.03;
    rueda4.position.z = -0.4 + Math.random() * 0.03;
    rueda5.position.z = -0.4 + Math.random() * 0.03;
    rueda6.position.z = -0.4 + Math.random() * 0.03;
    cabeza.rotation.z += giroCabeza;
    if (Math.abs(cabeza.rotation.z) > 0.2) {
        giroCabeza = -giroCabeza;
    }
    antena.rotation.y += giroAntena;
    if (antena.rotation.y < 0.8 || antena.rotation.y > 1.2) {
        giroAntena = -giroAntena;
    }

    renderer.render(scene, camera);
};

document.body.addEventListener("keydown", keyDown, false);

renderer.domElement.addEventListener("mousemove", mouseMove, false);
renderer.domElement.addEventListener("mousedown", mouseDown, false);
renderer.domElement.addEventListener("mouseup", mouseUp, false);

animate();