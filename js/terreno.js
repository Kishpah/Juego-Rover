const diferenciaAlturaTerreno = 0.5;

var baldosa = {
  // Cada baldosa se genera a partir de 9 baldosas más pequeñas (3x3)
  baldosaModel: {},
  subBaldosas: {},
  heightSubMap: {},
  coordX:0,
  coordY:0,
  init: function () {
    this.baldosaModel = new THREE.Group();
    this.subBaldosas = Array.from(Array(3), () => new Array(3));
    this.heightSubMap = Array.from(Array(4), () => new Array(4));
  },
  generarDatosBaldosa: function () {
    for (i = 0; i < 4; i++) {
      for (j = 0; j < 4; j++) {
        if(this.heightSubMap[i][j]===0 || this.heightSubMap[i][j]===undefined){
            this.heightSubMap[i][j] = Math.random() * diferenciaAlturaTerreno;
        }
      }
    }
  },
  generarModeloBaldosa: function () {
    var mat = new THREE.MeshLambertMaterial({ color: 0xAA4433 });
    mat.side = THREE.DoubleSide;

    for (i = 0; i < 3; i++) {
      for (j = 0; j < 3; j++) {
        var tmpMesh;
        var vertices = new Float32Array([
          i,j,this.heightSubMap[i][j],
          i + 1,j,this.heightSubMap[i + 1][j],
          i + 1,j + 1,this.heightSubMap[i + 1][j + 1],
        ]);
        var geom = new THREE.BufferGeometry();
        geom.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
        geom.computeVertexNormals();
        tmpMesh = new THREE.Mesh(geom, mat);
        tmpMesh.receiveShadow = mostrarSombras;
        this.subBaldosas[i][j] = tmpMesh;

        vertices = new Float32Array([
          i,j,this.heightSubMap[i][j],
          i + 1,j + 1,this.heightSubMap[i + 1][j + 1],
          i,j + 1,this.heightSubMap[i][j + 1],
        ]);
        var geom = new THREE.BufferGeometry();
        geom.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
        geom.computeVertexNormals();
        tmpMesh = new THREE.Mesh(geom, mat);
        tmpMesh.receiveShadow = mostrarSombras;
        this.subBaldosas[i][j].add(tmpMesh);

        this.subBaldosas[i][j].receiveShadow = mostrarSombras;

        this.baldosaModel.add(this.subBaldosas[i][j]);
      }
    }
  },
};

var terreno = {
    tamañoTerreno: 30,
    baldosas: {},
    init: function(){
        this.baldosas = Array.from(Array(this.tamañoTerreno), () => new Array(this.tamañoTerreno));
    },
    generarTerreno: function(){
        for(posI=0;posI<this.tamañoTerreno;posI++){
            for(posJ=0;posJ<this.tamañoTerreno;posJ++){
                baldosaTMP = Object.create(baldosa);
                baldosaTMP.init();
                
                baldosaTMP.generarDatosBaldosa();

                if(posI>0){
                    baldosaTMP.heightSubMap[0][0] = this.baldosas[posI-1][posJ].heightSubMap[3][0];
                    baldosaTMP.heightSubMap[0][1] = this.baldosas[posI-1][posJ].heightSubMap[3][1];
                    baldosaTMP.heightSubMap[0][2] = this.baldosas[posI-1][posJ].heightSubMap[3][2];
                    baldosaTMP.heightSubMap[0][3] = this.baldosas[posI-1][posJ].heightSubMap[3][3];
                }
                else{
                    baldosaTMP.heightSubMap[0][0] = 0;
                    baldosaTMP.heightSubMap[0][1] = 0;
                    baldosaTMP.heightSubMap[0][2] = 0;
                    baldosaTMP.heightSubMap[0][3] = 0;
                }
                if(posJ>0){
                    baldosaTMP.heightSubMap[0][0] = this.baldosas[posI][posJ-1].heightSubMap[0][3];
                    baldosaTMP.heightSubMap[1][0] = this.baldosas[posI][posJ-1].heightSubMap[1][3];
                    baldosaTMP.heightSubMap[2][0] = this.baldosas[posI][posJ-1].heightSubMap[2][3];
                    baldosaTMP.heightSubMap[3][0] = this.baldosas[posI][posJ-1].heightSubMap[3][3];
                }
                else{
                    baldosaTMP.heightSubMap[0][0] = 0;
                    baldosaTMP.heightSubMap[1][0] = 0;
                    baldosaTMP.heightSubMap[2][0] = 0;
                    baldosaTMP.heightSubMap[3][0] = 0;
                }
                baldosaTMP.generarModeloBaldosa();
                baldosaTMP.coordX=posI*3;
                baldosaTMP.coordY=posJ*3;
                baldosaTMP.baldosaModel.position.x = baldosaTMP.coordX;
                baldosaTMP.baldosaModel.position.y = baldosaTMP.coordY;
                baldosaTMP.baldosaModel.position.z = 0;
                
                this.baldosas[posI][posJ]=baldosaTMP;
            }
        }
    },
    devolverZ: function(x,y) {
        //Disparamos un rayo en vertical hacia el suelo y comprobamos dónde se corta con el triángulo correspondiente
        if(x<0 || y<0 || x>=this.tamañoTerreno*3 || y>=this.tamañoTerreno*3)
        {
            return 0;
        };

        //Obtenemos la baldosa y la sub baldosa correspondientes
        var baldosaI = Math.floor(x/3);
        var baldosaJ = Math.floor(y/3);
        var subBaldosaI = Math.floor(x-baldosaI*3);
        var subBaldosaJ = Math.floor(y-baldosaJ*3);

        var vecOrigen = new THREE.Vector3(x,y,10);
        var vecDir = new THREE.Vector3(0,0,-1);

        //Obtenemos el triángulo de terreno correspondiente
        var vecTriangulo = [];
        vecTriangulo[0] = new THREE.Vector3(Math.floor(x), Math.floor(y), this.baldosas[baldosaI][baldosaJ].heightSubMap[subBaldosaI][subBaldosaJ]);
        vecTriangulo[1] = new THREE.Vector3(Math.floor(x)+1, Math.floor(y), this.baldosas[baldosaI][baldosaJ].heightSubMap[subBaldosaI+1][subBaldosaJ]);
        vecTriangulo[2] = new THREE.Vector3(Math.floor(x)+1, Math.floor(y)+1, this.baldosas[baldosaI][baldosaJ].heightSubMap[subBaldosaI+1][subBaldosaJ+1]);

        //Obtenemos la intersección
        var ray = new THREE.Ray();
        ray.set(vecOrigen, vecDir);
        var intersect = new THREE.Vector3();
        intersect = ray.intersectTriangle(vecTriangulo[0], vecTriangulo[1], vecTriangulo[2], false, intersect);

        // Si hay resultado, lo devolvemos
        if(intersect != null)
        {
            return intersect.z;
        }

        //En caso contrario, probamos con el otro triángulo del cuadrado.
        vecTriangulo[0] = new THREE.Vector3(Math.floor(x), Math.floor(y), this.baldosas[baldosaI][baldosaJ].heightSubMap[subBaldosaI][subBaldosaJ]);
        vecTriangulo[1] = new THREE.Vector3(Math.floor(x)+1, Math.floor(y)+1, this.baldosas[baldosaI][baldosaJ].heightSubMap[subBaldosaI+1][subBaldosaJ+1]);
        vecTriangulo[2] = new THREE.Vector3(Math.floor(x), Math.floor(y)+1, this.baldosas[baldosaI][baldosaJ].heightSubMap[subBaldosaI][subBaldosaJ+1]);
        intersect = new THREE.Vector3();
        intersect = ray.intersectTriangle(vecTriangulo[0], vecTriangulo[1], vecTriangulo[2], false, intersect);

        if(intersect != null)
        {
            return intersect.z;
        }

        return 0;
    }
};