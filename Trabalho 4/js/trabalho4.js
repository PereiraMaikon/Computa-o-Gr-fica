var scene;
var camera;
var renderer;
var Esfera;

var velocity = 0.1;

var criaEsfera = function(){
    var geometria = new THREE.SphereGeometry(2,16,32);
    var material = new THREE.MeshBasicMaterial({color: "green"});
	
    Esfera = new THREE.Mesh(geometria, material);
    Esfera.position.set(10,0,0);
    scene.add(Esfera);
};

var criaCone = function(){
    const cone = new THREE.Mesh( new THREE.ConeGeometry(4,18,29 ), 
    new THREE.MeshBasicMaterial( {color: 0x663366} ) );
    cone.position.set(-17,0,10)
    scene.add( cone );
};
   
var criaCilindro = function(){
    const cylinder = new THREE.Mesh( new THREE.CylinderBufferGeometry(5,5,20,32 ), 
    new THREE.MeshBasicMaterial( {color: 0xffff00} ) );
    cylinder.position.set(-40,5,40)
    scene.add( cylinder );
};

var criaCubo = function(){
    const cubo = new THREE.Mesh( new THREE.BoxBufferGeometry(8, 8, 8), new THREE.MeshBasicMaterial( {color: 0x0000ff} ) );
    cubo.position.set(-100, 5, 0);
    scene.add(cubo);
};
var createACube = function() {
    var geometry = new THREE.BoxGeometry( 2, 10, 2 );

    red = new THREE.Color(1, 0, 0);
    green = new THREE.Color(0, 1, 0);
    blue = new THREE.Color(0, 0, 1);
    var colors = [red, green, blue];

    for (var i = 0; i < 3; i++) {
        geometry.faces[4 * i].color = colors[i];
        geometry.faces[4 * i+1].color = colors[i];
        geometry.faces[4 * i+2].color = colors[i];
        geometry.faces[4 * i+3].color = colors[i];

    }
    var material = new THREE.MeshBasicMaterial( { color: 0xffffff, vertexColors: true } );
    braco1 = new THREE.Mesh( geometry, material );
    

    var geometry2 = new THREE.SphereGeometry(2, 32,32);
    var material2 = new THREE.MeshBasicMaterial( { color: new THREE.Color(0, 1, 0)} );
    cotovelo = new THREE.Mesh(geometry2, material2);
    cotovelo.position.y-=5;
    braco1.add(cotovelo);

    pivot = new THREE.Group();
    pivot.position.set(0,0,0);
    pivot.add(braco1);

    scene.add(pivot);
    braco1.position.y+=pivot.position.x+5;

};

var init = function() {

    scene = new THREE.Scene();
    criaEsfera();
    criaCilindro();
    criaCone();
    criaCubo();
    camera = new THREE.PerspectiveCamera( 

                                60                                          // angulo
                                ,window.innerWidth / window.innerHeight     //aspect
                                ,0.1                                       // Near
                                ,1000                                      // Far
                            );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    this.createACube();

   
	camera.position.set( 0, 20, 100 );

    

    //Essas linhas criam o gridView, lembrando que ele basicamente Ã© sÃ³ uma grade de linhas no eixo X
    //scene.add( new THREE.GridHelper( 400, 40 ) );
  

    
   /*Para criar o plano */
   const ground = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( 100, 100, 10 ),
        new THREE.MeshBasicMaterial( { color: 0xffffff})
    ); //Cria a forma plana

    ground.rotation.x = - Math.PI / 2; // rotaciona para que ela fique paralela ao eixo X
    ground.position.y-=6; // Posiciona o ground abaixo da nossa figura.
    scene.add( ground );


    render();

    document.addEventListener('keydown', onKeyDown ); 

    document.addEventListener('mousedown', onMouseDown ); //metodos de controle do mouser
    document.addEventListener('mouseup', onMouseUp ); 
    document.addEventListener('mousemove', onMouseMouse ); 
  
};

var ci = 0
var render = function() {
    requestAnimationFrame( render );

    renderer.render( scene, camera );
};

var rotationVelocity = 0.1;

var onKeyDown = function(e){
    console.log(e.keyCode);
    
   KEY_DOWN = 40; //Para baixo
   KEY_UP = 38; // Para CIma
   KEY_LEFT = 37; // Para esquerda
   KEY_RIGHT = 39;  // Para Direita
   A = 65;
   Q = 81;
   if (e.keyCode == KEY_UP){ //y - para cima 
       camera.position.y+= 0.2;
    }
    if (e.keyCode == KEY_DOWN){
        camera.position.y-= 0.2;
    }
    if (e.keyCode == KEY_RIGHT ){ //x - para baixo
        camera.position.x+= 0.2;
    }
    if (e.keyCode == KEY_LEFT){
        camera.position.x-= 0.2;
    }
    if (e.keyCode == A ){ //
        camera.position.z-= 0.2;
    }
    if (e.keyCode == Q ){ //
        camera.position.z+= 0.2;
    }

    if (e.keyCode == 32){ //espaÃ§o -> rotaÃ§Ã£o pelo pivo.
        camera.rotation.y+=0.1
        console.log("Z: "+ pivot.rotation.z);
        if (pivot.rotation.z > 1.7 || pivot.rotation.z < -1){
            rotationVelocity*=-1;
        }
        pivot.rotation.z+=rotationVelocity; 
       // pivo.rotation.y+=0.1;
    }
    if (e.keyCode == 187){ // +
        braco1.scale.x+=0.1;
        braco1.scale.y+=0.1;
        braco1.scale.z+=0.1;
    }
    if (e.keyCode == 189){ // -
        camera.position.z+=0.1;
    }
}

var posicaoMouser = { //controla a posiÃ§Ã£o do mouser
    x: 0,
    y: 0
};

var cliquePressionado = false; //para controlar o tempo que o cara esta pressionando o botao do mouser

var onMouseDown = function(e){
    cliquePressionado = true;
    //console.log("Apertou Clicou")
}


var onMouseUp = function(e){
    cliquePressionado = false;
  //  console.log("SOltou o clique");
}


var onMouseMouse = function (e){
    if (cliquePressionado){

        var deltaMovimento = {
            x: e.offsetX - posicaoMouser.x,
            y: e.offsetY - posicaoMouser.y,
        }

        //cube.position.x += deltaMovimento.x*0.01;
        //cube.position.y += deltaMovimento.y*0.01*-1;

        braco1.rotation.x += toRadians(deltaMovimento.y*1)*0.5;
        braco1.rotation.y += toRadians(deltaMovimento.x*1)*0.5;
    }

    posicaoMouser = {  //nova posiÃ§Ã£o do mouser
        x : e.offsetX,
        y : e.offsetY
    };
}

window.onload = this.init;

function toRadians(angle) {
	return angle * (Math.PI / 180);
}