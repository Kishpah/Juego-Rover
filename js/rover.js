let rover = {
    //Modelo del rover
    roverModel,

    //Posicionar Rover
    function: posRover(tablero, x, y) {
        roverModel.position.x = x;
        roverModel.position.y = y;
        //this.roverModel.position.z = tablero.posZ(x,y);
        //this.roverModel.rotation.x = tablero.rotX(x,y);
        //this.roverModel.rotation.y = tablero.rotY(x,y);
    },

    //Posicionar Ruedas
    function: posRuedas(tablero, x, y) {
        this.roverModel.rueda1.position.z = 0.4;
        this.roverModel.rueda2.position.z = 0.4;
        this.roverModel.rueda3.position.z = 0.4;
        this.roverModel.rueda4.position.z = 0.4;
        this.roverModel.rueda5.position.z = 0.4;
        this.roverModel.rueda6.position.z = 0.4;
    },

    //Posicionar Antena
    //Posicionar Cabeza
 
    //Constructor
    //constructor() {}

    //Método que genera el modelo
    crearModelo = function() {
        roverModel = new THREE.Group();

        var geo = new THREE.BoxGeometry(1, 0.7, 0.3);
        var mat = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
        var cuerpo = new THREE.Mesh(geo, mat);
        cuerpo.castShadow = true;
        cuerpo.receiveShadow = true;
        roverModel.add(cuerpo);

        geo = new THREE.CylinderGeometry(0.15, 0.15, 0.15, 20);
        mat = new THREE.MeshPhongMaterial({ color: 0x555555 });
        var rueda1 = new THREE.Mesh(geo, mat);
        rueda1.position.x = 0;
        rueda1.position.y = 0.6;
        rueda1.position.z = -0.4;
        rueda1.castShadow = true;
        rueda1.receiveShadow = true;
        roverModel.add(rueda1);

        geo = new THREE.CylinderGeometry(0.15, 0.15, 0.15, 20);
        var rueda2 = new THREE.Mesh(geo, mat);
        rueda2.position.x = 0.6;
        rueda2.position.y = 0.6;
        rueda2.position.z = -0.4;
        rueda2.castShadow = true;
        rueda2.receiveShadow = true;
        roverModel.add(rueda2);

        geo = new THREE.CylinderGeometry(0.15, 0.15, 0.15, 20);
        var rueda3 = new THREE.Mesh(geo, mat);
        rueda3.position.x = -0.6;
        rueda3.position.y = 0.6;
        rueda3.position.z = -0.4;
        rueda3.castShadow = true;
        rueda3.receiveShadow = true;
        roverModel.add(rueda3);

        geo = new THREE.CylinderGeometry(0.15, 0.15, 0.15, 20);
        var rueda4 = new THREE.Mesh(geo, mat);
        rueda4.position.x = 0;
        rueda4.position.y = -0.6;
        rueda4.position.z = -0.4;
        rueda4.castShadow = true;
        rueda4.receiveShadow = true;
        roverModel.add(rueda4);

        geo = new THREE.CylinderGeometry(0.15, 0.15, 0.15, 20);
        var rueda5 = new THREE.Mesh(geo, mat);
        rueda5.position.x = 0.6;
        rueda5.position.y = -0.6;
        rueda5.position.z = -0.4;
        rueda5.castShadow = true;
        rueda5.receiveShadow = true;
        roverModel.add(rueda5);

        geo = new THREE.CylinderGeometry(0.15, 0.15, 0.15, 20);
        var rueda6 = new THREE.Mesh(geo, mat);
        rueda6.position.x = -0.6;
        rueda6.position.y = -0.6;
        rueda6.position.z = -0.4;
        rueda6.castShadow = true;
        rueda6.receiveShadow = true;
        roverModel.add(rueda6);

        geo = new THREE.BoxGeometry(0.1, 0.5, 0.3);
        mat = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
        var cabeza = new THREE.Mesh(geo, mat);
        cabeza.position.x = 0.5;
        cabeza.position.y = 0;
        cabeza.position.z = 0.5;
        cabeza.castShadow = true;
        cabeza.receiveShadow = true;

        geo = new THREE.CylinderGeometry(0.08, 0.08, 0.08, 10);
        mat = new THREE.MeshPhongMaterial({ color: 0x222222 });
        var ojo = new THREE.Mesh(geo, mat);
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
    }
}
