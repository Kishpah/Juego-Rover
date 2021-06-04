//let rover = {
    //Modelo del rover
    let roverModel;
    let rueda = [];
    let rueda1;
    let rueda2;
    let rueda3;
    let rueda4;
    let rueda5;
    let rueda6;
    let cuerpo;
    let cabeza;
    let ojo;
    let antena;

    //Posicionar Rover
    function posRover(terreno, x, y) {
        roverModel.position.x = x;
        roverModel.position.y = y;
        //this.roverModel.position.z = terreno.posZ(x,y);
        //this.roverModel.rotation.x = terreno.rotX(x,y);
        //this.roverModel.rotation.y = terreno.rotY(x,y);
    };

    //Posicionar Ruedas
    function posRuedas(terreno, x, y) {
        for(i=0;i<6;i++){
            rueda[i].position.z = 0.4;
        }
    };

    //Posicionar Antena
    //Posicionar Cabeza
 
    //Constructor
    //constructor() {}

    //Método que genera el modelo
    function crearModelo() {
        roverModel = new THREE.Group();

        var geo = new THREE.BoxGeometry(1, 0.7, 0.3);
        var mat = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
        cuerpo = new THREE.Mesh(geo, mat);
        cuerpo.castShadow = true;
        cuerpo.receiveShadow = true;
        roverModel.add(cuerpo);

        for (i=0;i<6;i++)
        {
            geo = new THREE.CylinderGeometry(0.15, 0.15, 0.15, 20);
            mat = new THREE.MeshPhongMaterial({ color: 0x555555 });
            rueda[i] = new THREE.Mesh(geo, mat);
            if(i===0 || i === 3) { offsetRuedaX = 0.6; }
            else if(i===1 || i===4) { offsetRuedaX = 0; }
            else { offsetRuedaX = -0.6; }
            if(i<3) { offsetRuedaY = 0.6; }
            else { offsetRuedaY = -0.6; }
            offsetRuedaZ = -0.4;

            rueda[i].position.x = offsetRuedaX;
            rueda[i].position.y = offsetRuedaY;
            rueda[i].position.z = offsetRuedaZ;
            rueda[i].castShadow = true;
            rueda[i].receiveShadow = true;
            roverModel.add(rueda[i]);
        }

        geo = new THREE.BoxGeometry(0.1, 0.5, 0.3);
        mat = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
        cabeza = new THREE.Mesh(geo, mat);
        cabeza.position.x = 0.5;
        cabeza.position.y = 0;
        cabeza.position.z = 0.5;
        cabeza.castShadow = true;
        cabeza.receiveShadow = true;

        geo = new THREE.CylinderGeometry(0.08, 0.08, 0.08, 10);
        mat = new THREE.MeshPhongMaterial({ color: 0x222222 });
        ojo = new THREE.Mesh(geo, mat);
        ojo.rotation.z = Math.PI / 2;
        ojo.position.x = 0.08;
        ojo.position.y = 0.12;
        ojo.position.z = 0;
        ojo.castShadow = true;
        ojo.receiveShadow = true;
        cabeza.add(ojo);

        geo = new THREE.CylinderGeometry(0.08, 0.08, 0.08, 10);
        ojo = new THREE.Mesh(geo, mat);
        ojo.rotation.z = Math.PI / 2;
        ojo.position.x = 0.08;
        ojo.position.y = -0.12;
        ojo.position.z = 0;
        ojo.castShadow = true;
        ojo.receiveShadow = true;
        cabeza.add(ojo);

        roverModel.add(cabeza);

        geo = new THREE.CylinderGeometry(0, 0.12, 0.02, 10, 1, true);
        mat = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
        mat.side = THREE.DoubleSide;
        antena = new THREE.Mesh(geo, mat);
        antena.castShadow = true;
        antena.receiveShadow = true;

        geo = new THREE.CylinderGeometry(0.12, 0.18, 0.02, 10, 1, true);
        trozoAntena = new THREE.Mesh(geo, mat);
        trozoAntena.position.y = -0.02;
        trozoAntena.castShadow = true;
        trozoAntena.receiveShadow = true;
        antena.add(trozoAntena);
        geo = new THREE.CylinderGeometry(0.18, 0.24, 0.04, 10, 1, true);
        trozoAntena = new THREE.Mesh(geo, mat);
        trozoAntena.position.y = -0.05;
        trozoAntena.castShadow = true;
        trozoAntena.receiveShadow = true;
        antena.add(trozoAntena);

        antena.rotation.z = -Math.PI / 2;
        antena.rotation.y = 1;
        antena.position.x = -0.4;
        antena.position.y = 0;
        antena.position.z = 0.25;
        roverModel.add(antena);
        //return roverModel;
    };
//}
