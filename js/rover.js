//Modelo del rover
let roverModel;
let rueda = [];
let cuerpo;
let cabeza;
let ojo;
let antena;

let posRoverX=0;
let posRoverY=0;
let posRoverZ=0.2;
let scaleRover;
let rotationRoverX=0;
let rotationRoverY=0;
let rotationRoverZ=0;

//Posicionar Rover
function posRover(terreno, x, y,) {
    roverModel.position.x = x;
    roverModel.position.y = y;
    //this.roverModel.position.z = terreno.posZ(x,y);
    //this.roverModel.rotation.x = terreno.rotX(x,y);
    //this.roverModel.rotation.y = terreno.rotY(x,y);
};

function colocarRover() {
    posRoverZ = terreno.devolverZ(posRoverX, posRoverY)+0.3;
    colocarRuedas();
}

//Posicionar Ruedas
function colocarRuedas() {
    var i=0;
    var pos1 = new THREE.Vector3();
    var z=0;

    for(i=0;i<6;i++){
        rueda[i].getWorldPosition(pos1);
        z = terreno.devolverZ(pos1.x, pos1.y);
        rueda[i].position.z = z-posRoverZ+0.07;
    }
};

//Método que genera el modelo
function crearModelo() {
    roverModel = new THREE.Group();

    var geo = new THREE.BoxGeometry(0.5, 0.35, 0.15);
    var mat = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
    cuerpo = new THREE.Mesh(geo, mat);
    cuerpo.castShadow = mostrarSombras;
    cuerpo.receiveShadow = mostrarSombras;
    roverModel.add(cuerpo);

    for (i=0;i<6;i++)
    {
        geo = new THREE.CylinderGeometry(0.08, 0.08, 0.08, 20);
        mat = new THREE.MeshPhongMaterial({ color: 0x555555 });
        rueda[i] = new THREE.Mesh(geo, mat);
        if(i===0 || i === 3) { offsetRuedaX = 0.3; }
        else if(i===1 || i===4) { offsetRuedaX = 0; }
        else { offsetRuedaX = -0.3; }
        if(i<3) { offsetRuedaY = 0.3; }
        else { offsetRuedaY = -0.3; }
        offsetRuedaZ = -0.2;

        rueda[i].position.x = offsetRuedaX;
        rueda[i].position.y = offsetRuedaY;
        rueda[i].position.z = offsetRuedaZ;
        rueda[i].castShadow = mostrarSombras;
        rueda[i].receiveShadow = mostrarSombras;
        roverModel.add(rueda[i]);
    }

    geo = new THREE.BoxGeometry(0.05, 0.25, 0.15);
    mat = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
    cabeza = new THREE.Mesh(geo, mat);
    cabeza.position.x = 0.25;
    cabeza.position.y = 0;
    cabeza.position.z = 0.25;
    cabeza.castShadow = mostrarSombras;
    cabeza.receiveShadow = mostrarSombras;

    geo = new THREE.CylinderGeometry(0.04, 0.04, 0.04, 10);
    mat = new THREE.MeshPhongMaterial({ color: 0x222222 });
    ojo = new THREE.Mesh(geo, mat);
    ojo.rotation.z = Math.PI / 2;
    ojo.position.x = 0.04;
    ojo.position.y = 0.06;
    ojo.position.z = 0;
    ojo.castShadow = mostrarSombras;
    ojo.receiveShadow = mostrarSombras;
    cabeza.add(ojo);

    geo = new THREE.CylinderGeometry(0.04, 0.04, 0.04, 10);
    ojo = new THREE.Mesh(geo, mat);
    ojo.rotation.z = Math.PI / 2;
    ojo.position.x = 0.04;
    ojo.position.y = -0.06;
    ojo.position.z = 0;
    ojo.castShadow = mostrarSombras;
    ojo.receiveShadow = mostrarSombras;
    cabeza.add(ojo);

    roverModel.add(cabeza);

    geo = new THREE.CylinderGeometry(0, 0.06, 0.01, 10, 1, true);
    mat = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
    mat.side = THREE.DoubleSide;
    antena = new THREE.Mesh(geo, mat);
    antena.castShadow = mostrarSombras;
    antena.receiveShadow = mostrarSombras;

    geo = new THREE.CylinderGeometry(0.06, 0.09, 0.01, 10, 1, true);
    trozoAntena = new THREE.Mesh(geo, mat);
    trozoAntena.position.y = -0.01;
    trozoAntena.castShadow = mostrarSombras;
    trozoAntena.receiveShadow = mostrarSombras;
    antena.add(trozoAntena);
    geo = new THREE.CylinderGeometry(0.09, 0.12, 0.02, 10, 1, true);
    trozoAntena = new THREE.Mesh(geo, mat);
    trozoAntena.position.y = -0.025;
    trozoAntena.castShadow = mostrarSombras;
    trozoAntena.receiveShadow = mostrarSombras;
    antena.add(trozoAntena);

    antena.rotation.z = -Math.PI / 2;
    antena.rotation.y = 1;
    antena.position.x = -0.2;
    antena.position.y = 0;
    antena.position.z = 0.12;
    roverModel.add(antena);
};

