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
var dirRover = new THREE.Vector3(1,0,0);
var velRover = 0.05;
var difGiro = 0.1;

//Creamos la escena
const scene = new THREE.Scene();
//Niebla y fondo rojos
scene.fog = new THREE.Fog(0xDD6655,8,20);
scene.background = new THREE.Color(0xDD6655);

//Cámara
const camera = new THREE.PerspectiveCamera(
    35,
    window.innerWidth / window.innerHeight,
    5,
    25
);
camera.position.z = 5;
camera.rotation.x = 1;
camera.rotation.z = -0;
posCamaraY = -8;

//Creamos el renderer y el canvas para que ocupen toda la ventana
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
directionalLight.shadow.camera.left=-30;
directionalLight.shadow.camera.right=30;
directionalLight.shadow.camera.top = 30;
directionalLight.shadow.camera.bottom=-30;
scene.add(directionalLight);

//Generamos el modelo del Rover y lo añadimos a la escena
crearModelo();
scene.add(roverModel);

//Creamos un suelo para la parte donde no haya terreno
var geo = new THREE.PlaneGeometry(100,100, 20);
var mat = new THREE.MeshPhongMaterial({ color: 0xAA4433 });
var suelo = new THREE.Mesh(geo, mat);
suelo.receiveShadow = mostrarSombras;
scene.add(suelo);

//Generamos un trozo de terreno, con relieve aleatorio y lo añadimos a la escena
terreno.init();
terreno.generarTerreno();
for(i=0;i<terreno.tamañoTerreno;i++){
    for(j=0;j<terreno.tamañoTerreno;j++){
        scene.add(terreno.baldosas[i][j].baldosaModel);
    }
}

//Comprobamos las pulsaciones del teclado
var teclaAbajo=false;
var teclaArriba=false;
var teclaDerecha=false;
var teclaIzquierda=false;

const keyDown = function (e) {
    switch(e.key){
        case "ArrowUp":
            teclaArriba = true;
            break;
        case "ArrowDown":
            teclaAbajo = true;
            break;
        case "ArrowLeft":
            teclaIzquierda = true;
        break;
        case "ArrowRight":
            teclaDerecha = true;
        break;
    }
};

const keyUp = function (e) {
        switch(e.key){
            case "ArrowUp":
                teclaArriba = false;
                break;
            case "ArrowDown":
                teclaAbajo = false;
                break;
            case "ArrowLeft":
                teclaIzquierda = false;
            break;
            case "ArrowRight":
                teclaDerecha = false;
            break;
        }
    };
    
//Animamos la escena
const animate = function () {
    requestAnimationFrame(animate);

    //Giramos la cabeza y la antena
    cabeza.rotation.z += giroCabeza;
    if (Math.abs(cabeza.rotation.z) > 0.2) {
        giroCabeza = -giroCabeza;
    }
    antena.rotation.y += giroAntena;
    if (antena.rotation.y < 0.8 || antena.rotation.y > 1.2) {
        giroAntena = -giroAntena;
    }

    //Comprobamos las pulsaciones de las teclas y actualizamos la posición del rover
    if(teclaArriba||teclaAbajo||teclaIzquierda||teclaDerecha){
        /*
        //Movemos el rover en la dirección de las teclas pulsadas
        if(teclaArriba){posRoverY+=velRover}
        if(teclaAbajo){posRoverY-=velRover}
        if(teclaIzquierda){posRoverX-=velRover}
        if(teclaDerecha){posRoverX+=velRover}
        */

        //Modificamos la dirección del rover según las teclas pulsadas
        if(velRover<0.1){
            velRover+=0.01;
        }
        if(teclaArriba){
            dirRover.y+=difGiro;
        }
        if(teclaAbajo){
            dirRover.y-=difGiro;
        }
        if(teclaIzquierda){
            dirRover.x-=difGiro;
        }
        if(teclaDerecha){
            dirRover.x+=difGiro;
        }
        //Ajustamos la dirección según las pulsaciones de las teclas.
        dirRover=dirRover.normalize();

        //Movemos el Rover según la dirección y la velocidad
        posRoverX+=dirRover.x*velRover;
        posRoverY+=dirRover.y*velRover;

        //Ajustamos el ángulo del rover según la dirección
        var rotacion = 0;
        rotacion=dirRover.angleTo(new THREE.Vector3(1,0,0));
        if(dirRover.y<0){rotacion = 2*Math.PI - rotacion};
        roverModel.rotation.z=rotacion;
        
        //Movemos el rover, y con él la cámara
        camera.position.x = posRoverX;
        camera.position.y = posRoverY-8;
        roverModel.position.x = posRoverX;
        roverModel.position.y = posRoverY;
        colocarRover(); //Ajusta la altura del rover y de las ruedas
        roverModel.position.z = posRoverZ;
    }
    else{
        if(velRover>0){
            velRover-=0.01;
        }
    }

    renderer.render(scene, camera);
};


document.body.addEventListener("keydown", keyDown, false);
document.body.addEventListener("keyup", keyUp, false);

posRoverX=terreno.tamañoTerreno*3/2;
posRoverY=terreno.tamañoTerreno*3/2;
camera.position.x = posRoverX;
camera.position.y = posRoverY-8;
roverModel.position.x = posRoverX;
roverModel.position.y = posRoverY;
colocarRover(); //Ajusta la altura del rover y de las ruedas
roverModel.position.z = posRoverZ;

animate();