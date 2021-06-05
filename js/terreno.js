const diferenciaAlturaTerreno = 0.4;

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
    tamañoTerreno: 10,
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
                baldosaTMP.baldosaModel.position.z = -0.7;
                
                this.baldosas[posI][posJ]=baldosaTMP;
            }
        }
    },
    generarBorde: function(){

    }
};