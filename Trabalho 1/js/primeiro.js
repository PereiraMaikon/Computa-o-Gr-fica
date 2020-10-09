var scene;
var camera;
var renderer;

var Esfera;
var velocidadeEsferaX= 0.7;
var velocidadeEsferaY= 0.7;

var criaEsfera = function(){
    var geometria = new THREE.SphereGeometry(2,16,32);
    var material = new THREE.MeshBasicMaterial({color: "green"});
	
    Esfera = new THREE.Mesh(geometria, material);

    scene.add(Esfera);
};

var render = function(){
    requestAnimationFrame(render);
	
    animaEsfera();
	
	renderer.render(scene, camera);
};

var animaEsfera = function(){
	if (this.Esfera.position.x >=72|| this.Esfera.position.x <= -72){
		velocidadeEsferaX = velocidadeEsferaX * -1;
	}
	if (this.Esfera.position.y >=35 || this.Esfera.position.y <= -35){
		velocidadeEsferaY = velocidadeEsferaY * -1;
	}
    console.log("Posiçao Esfera x" + this.Esfera.position.x);
	console.log("Posiçao Esfera y" + this.Esfera.position.y);

    this.Esfera.position.x += velocidadeEsferaX;
	this.Esfera.position.y += velocidadeEsferaY;
	
	
}

var init = function (){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(40, innerWidth/window.innerHeight, 1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.z = 100;
	
	criaEsfera();
	render();
}

window.onload= this.init;