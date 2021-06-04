const diferenciaAlturaTerreno = .4;
//var baldosas = [];

// Cada baldosa se genera a partir de 9 baldosas más pequeñas (3x3)
baldosa = new THREE.Group();
var subBaldosas = Array.from(Array(3), () => new Array(3));
var heightSubMap = Array.from(Array(4), () => new Array(4));

for(i = 0; i <4; i++){
    for(j=0; j<4; j++){
        heightSubMap[i][j]=Math.random()*diferenciaAlturaTerreno;
    }
}

var mat = new THREE.MeshLambertMaterial({color:0xAA4433});
mat.side = THREE.DoubleSide;

for(i=0;i<3;i++){
    for(j=0;j<3;j++){
        var tmpMesh;
        var vertices = new Float32Array([
            i,j,heightSubMap[i][j],
            i+1,j,heightSubMap[i+1][j],
            i+1,j+1,heightSubMap[i+1][j+1]
        ]);
        var geom = new THREE.BufferGeometry(); 
        geom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        geom.computeVertexNormals();
        tmpMesh = new THREE.Mesh(geom, mat);
        tmpMesh.receiveShadow = true;
        subBaldosas[i][j] = tmpMesh;

        vertices = new Float32Array([
            i,j,heightSubMap[i][j],
            i+1,j+1,heightSubMap[i+1][j+1],
            i,j+1,heightSubMap[i][j+1]
        ]);
        var geom = new THREE.BufferGeometry(); 
        geom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        geom.computeVertexNormals();
        tmpMesh = new THREE.Mesh(geom, mat);
        tmpMesh.receiveShadow = true;
        subBaldosas[i][j].add(tmpMesh);

        subBaldosas[i][j].receiveShadow=true;


        baldosa.add(subBaldosas[i][j]);
    }
}

//scene.add(baldosa;)
