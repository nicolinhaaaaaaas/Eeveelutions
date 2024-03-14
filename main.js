import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

// Cena

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Define o tamanho da janela do navegador
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.set(0, 2.2, 7);
scene.add(camera);

// Inicializa a variável scrollY com o valor atual do scroll vertical da janela
let scrollY = window.scrollY
// Inicializa a variável currentSection com o valor 0, representando a seção atual da página
let currentSection = 0

// Acesse o elemento pelo ID
const body = document.body;

const moldura = document.getElementById('moldura')

// Objeto que mapeia o número da seção para a função que será executada
const sectionActions = {
  0: () => {
      // Ação para a seção 0
      console.log('Executando ação para a seção 0');
      // Adicione aqui o código que deseja executar para a seção 0
      moverModelo(cartasLista[0], 7, -10, 0)
      moverModelo(cartasLista[1], 7, -10, 0)
      moverModelo(cartasLista[2], 7, -10, 0)
      moverModelo(cartasLista[3], 7, -10, 0)
      moverModelo(cartasLista[4], 7, -10, 0)
      moverModelo(cartasLista[5], 7, -10, 0)
      moverModelo(cartasLista[6], 7, -10, 0)
      moverModelo(cartasLista[7], 7, -10, 0)
      moverModelo(cartasLista[8], 7, -10, 0)

      moverModelo(eeveeModel, -25, 0, 0)

      body.style.background = 'red';
  },
  1: () => {
      // Ação para a seção 1
      console.log('Executando ação para a seção 1');
      // Adicione aqui o código que deseja executar para a seção 1
      moverModelo(cartasLista[0], 7, 1, 1)
      moverModelo(cartasLista[7], 7, -10, 0)

      moverModelo(eeveeModel, 0, 0, 0)
      moverModelo(vaporeonModel, 25, 0, 0);

      body.style.background = '#f3d5a5';
      moldura.style.background = 'pink'

      minhaLuz1.atualizarCor('white');
      minhaluz2.atualizarCor('white');

  },
  2: () => {
      // Ação para a seção 2
      console.log('Executando ação para a seção 2');
      // Adicione aqui o código que deseja executar para a seção 2
      moverModelo(cartasLista[0], 7, -10, 0)
      moverModelo(cartasLista[7], 7, 1, 1)
      moverModelo(cartasLista[4], 7, -10, 0)


      moverModelo(eeveeModel, -25, 0, 0)
      moverModelo(vaporeonModel, 0, 0, 0);
      moverModelo(jolteonModel, -25, 0, 0);

      body.style.background = '#79CEE0';
      moldura.style.background = 'brown';

      minhaLuz1.atualizarCor('white');
      minhaluz2.atualizarCor('white');

  },
  3: () => {
      // Ação para a seção 3
      console.log('Executando ação para a seção 3');
      // Adicione aqui o código que deseja executar para a seção 3
      moverModelo(cartasLista[7], 7, -10, 0)
      moverModelo(cartasLista[4], 7, 1, 1)
      moverModelo(cartasLista[2], 7, -10, 0)


      moverModelo(jolteonModel, 0, 0, 0);
      moverModelo(vaporeonModel, 25, 0, 0);
      moverModelo(flareonModel, 25, 0, 0);

      body.style.background = '#ffff71';
      moldura.style.background = 'brown';

      minhaLuz1.atualizarCor('white');
      minhaluz2.atualizarCor('white');

  },
  4: () => {
      // Ação para a seção 4
      console.log('Executando ação para a seção 4');
      // Adicione aqui o código que deseja executar para a seção 4
      moverModelo(cartasLista[4], 7, -10, 0)
      moverModelo(cartasLista[2], 7, 1, 1)
      moverModelo(cartasLista[1], 7, -10, 0)

      moverModelo(jolteonModel, -25, 0, 0);
      moverModelo(flareonModel, 0, 0, 0)
      moverModelo(espeonModel, -25, 0, 0);

      body.style.background = '#F7E8A1';
      moldura.style.background = 'brown';

      minhaLuz1.atualizarCor('white');
      minhaluz2.atualizarCor('white');

  },
  5: () => {
      // Ação para a seção 5
      console.log('Executando ação para a seção 5');
      // Adicione aqui o código que deseja executar para a seção 5
      moverModelo(cartasLista[2], 7, -10, 0)
      moverModelo(cartasLista[1], 7, 1, 1)
      moverModelo(cartasLista[6], 7, -10, 0)


      moverModelo(flareonModel, 25, 0, 0)
      moverModelo(espeonModel, 0, 0, 0)
      moverModelo(umbreonModel, 25, 0, 0);

      body.style.background = '#E4CDDD';
      moldura.style.background = 'brown';

      minhaLuz1.atualizarCor('white');
      minhaluz2.atualizarCor('white');

  },
  6: () => {
      // Ação para a seção 6
      console.log('Executando ação para a seção 6');
      // Adicione aqui o código que deseja executar para a seção 6
      moverModelo(cartasLista[1], 7, -10, 0)
      moverModelo(cartasLista[6], 7, 1, 1)
      moverModelo(cartasLista[5], 7, -10, 0)

      moverModelo(espeonModel, -25, 0, 0)
      moverModelo(umbreonModel, 0, 0, 0)
      moverModelo(leafeonModel, -25, 0, 0);

      body.style.background = '#efcb69';
      moldura.style.background = '#ffffff'

      minhaLuz1.atualizarCor('white');
      minhaluz2.atualizarCor('white');

  },
  7: () => {
      // Ação para a seção 7
      console.log('Executando ação para a seção 7');
      // Adicione aqui o código que deseja executar para a seção 7
      moverModelo(cartasLista[6], 7, -10, 0)
      moverModelo(cartasLista[5], 7, 1, 1)
      moverModelo(cartasLista[3], 7, -10, 0)

      moverModelo(umbreonModel, 25, 0, 0)
      moverModelo(leafeonModel, 0, 0, 0)
      moverModelo(glaceonModel, 25, 0, 0);

      body.style.background = '#FAE9B9';

      minhaLuz1.atualizarCor('white');
      minhaluz2.atualizarCor('white');

  },
  8: () => {
      // Ação para a seção 8
      console.log('Executando ação para a seção 8');
      // Adicione aqui o código que deseja executar para a seção 8
      moverModelo(cartasLista[5], 7, -10, 0)
      moverModelo(cartasLista[3], 7, 1, 1)
      moverModelo(cartasLista[8], 7, -10, 0)

      moverModelo(leafeonModel, -25, 0, 0)
      moverModelo(glaceonModel, 0, 0, 0)
      moverModelo(sylveonModel, -25, 0, 0);

      body.style.background = '#DFF6F0';

      minhaLuz1.atualizarCor('white');
      minhaluz2.atualizarCor('white');

  },
  9: () => {
      // Ação para a seção 9
      console.log('Executando ação para a seção 9');
      // Adicione aqui o código que deseja executar para a seção 9
      moverModelo(cartasLista[3], 7, -10, 0)
      moverModelo(cartasLista[8], 7, 1, 1)

      moverModelo(glaceonModel, 25, 0, 0)
      moverModelo(sylveonModel, 0, 0, 0)

      body.style.background = '#ffdae3';

      minhaLuz1.atualizarCor('pink');
      minhaluz2.atualizarCor('yellow');

  }
  // Adicione mais pares chave-valor conforme necessário para cada seção
};

window.addEventListener('load', () => {
  // Executa a ação da seção 0 assim que a página é carregada
  sectionActions[0]();
});

// Adicione um listener de evento de scroll à janela
window.addEventListener('scroll', () => {
  // Atualiza a variável scrollY com o valor atual do scroll vertical da janela
  scrollY = window.scrollY
  // Calcula a nova seção com base na posição do scroll e na altura da janela
  const newSection = Math.round(scrollY / window.innerHeight)

  // Verifica se a nova seção é diferente da seção atual
  if (newSection != currentSection) {
      // Atualiza a seção atual com a nova seção
      currentSection = newSection

      // Executa a ação correspondente à seção atual
      if (sectionActions[currentSection]) {
          sectionActions[currentSection]();
      } else {
          console.log('Não há ação definida para esta seção');
      }
  }
});

function moverModelo(modelo, positionX, positionY, positionZ) {
  // Defina aqui o código para mover todos os modelos
    if (modelo) {
      gsap.to(modelo.position, { duration: 1.5, ease: 'power2.inOut', x: positionX , y: positionY, z: positionZ });
    }
};

// Cria um renderizador WebGL com as configurações especificadas
const renderer = new THREE.WebGLRenderer({
  canvas: canvas, // Define o canvas onde a renderização será feita
  antialias: true, // Ativa a opção de antialiasing para suavizar as bordas
  alpha: true // Permite que o canvas tenha um canal alfa (transparência)
})
// Ativa o mapeamento de sombras no renderizador
renderer.shadowMap.enabled = true
// Define o tipo de mapeamento de sombras para PCFSoftShadowMap para sombras suaves
renderer.shadowMap.type = THREE.PCFSoftShadowMap
// Define o tamanho da área de renderização como o tamanho da janela
renderer.setSize(sizes.width, sizes.height)
// Define a proporção de pixels do renderizador para ser o mínimo entre o dispositivo e 2
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(luzAmbiente)

class MinhaLuz extends THREE.Object3D {
  constructor(cor, intensidade) {
      super();
      // Crie a luz direcional
      this.luz = new THREE.SpotLight(cor, intensidade);
      // Defina a posição inicial da luz
      this.luz.target.position.set(0, 1, 0); // Posiciona a luz à direita
      this.luz.angle = Math.PI / 2;
      // Adicione a luz como filho desta instância da classe
      this.add(this.luz);
      this.castShadow = true;
  }
  // Método para atualizar a cor da luz
  atualizarCor(cor) {
      this.luz.color.set(cor);
  }
}

// Crie uma instância da classe MinhaLuz
const minhaLuz1 = new MinhaLuz(0x00ff00, 4);
const minhaluz2 = new MinhaLuz(0x0000ff, 4);
const minhaluz3 = new MinhaLuz(0xffffff, 8);
scene.add(minhaLuz1);
scene.add(minhaluz2);
scene.add(minhaluz3);

// Modelos

function carregarModelos(){
  console.log('Carregando Eevee'); 
  const Eevee = new GLTFLoader();
  Eevee.load('/assets/eevee/scene.gltf', (eevee) => {
    eevee.scene.scale.set(8, 8, 8);
    scene.add(eevee.scene);
    eevee.scene.castShadow = true;
    eeveeModel = eevee.scene;
    eeveeModel.position.set(-25, 0, 0);
  });

  const Espeon = new GLTFLoader();
  Espeon.load('/assets/espeon/scene.gltf', (espeon) => {
    espeon.scene.scale.set(2, 2, 2);
    scene.add(espeon.scene);
    espeon.scene.castShadow = true;
    espeonModel = espeon.scene;
    espeonModel.position.set(-25, 0, 0);
  });

  const Flareon = new GLTFLoader();
  Flareon.load('/assets/flareon/scene.gltf', (flareon) => {
    flareon.scene.scale.set(1.8,1.9,2);
    scene.add(flareon.scene);
    flareon.scene.castShadow = true
    flareonModel = flareon.scene;
    flareonModel.position.set(25, 0, 0);
  });

  const Glaceon = new GLTFLoader();
  Glaceon.load('/assets/glaceon/scene.gltf', (glaceon) => {
    glaceon.scene.scale.set(2,2,2);
    scene.add(glaceon.scene);
    glaceon.scene.castShadow = true
    glaceonModel = glaceon.scene;
    glaceonModel.position.set(25, 0, 0);
  });

  const Jolteon = new GLTFLoader();
  Jolteon.load('/assets/jolteon/scene.gltf', (jolteon) => {
    jolteon.scene.scale.set(2,2,2);
    scene.add(jolteon.scene);
    jolteon.scene.castShadow = true
    jolteonModel = jolteon.scene;
    jolteonModel.position.set(-25, 0, 0);
  });

  const Leafeon = new GLTFLoader();
  Leafeon.load('/assets/leafeon/scene.gltf', (leafeon) => {
    leafeon.scene.scale.set(2,2,2);
    scene.add(leafeon.scene);
    leafeon.scene.castShadow = true
    leafeonModel = leafeon.scene;
    leafeonModel.position.set(-25, 0, 0);
  });

  const Sylveon = new GLTFLoader();
  Sylveon.load('/assets/SYLVEON/scene.gltf', (sylveon) => {
    sylveon.scene.scale.set(2,2,2);
    scene.add(sylveon.scene);
    sylveon.scene.castShadow = true
    sylveonModel = sylveon.scene;
    sylveonModel.position.set(-25, 0, 0);
  });

  const Umbreon = new GLTFLoader();
  Umbreon.load('/assets/umbreon/scene.gltf', (umbreon) => {
    umbreon.scene.scale.set(2,2,2);
    scene.add(umbreon.scene);
    umbreon.scene.castShadow = true
    umbreonModel = umbreon.scene;
    umbreonModel.position.set(25, 0, 0);
  });

  const Vaporeon = new GLTFLoader();
  Vaporeon.load('/assets/vaporeon/scene.gltf', (vaporeon) => {
    vaporeon.scene.scale.set(1.7,1.7,1.7);
    scene.add(vaporeon.scene);
    vaporeon.scene.castShadow = true
    vaporeonModel = vaporeon.scene;
    vaporeonModel.position.set(25, 0, 0);
  });
}

// Função para apagar o modelo existente
function apagarModelo(modelo) {
  if (modelo) {
    scene.remove(modelo);
    modelo = undefined;
  }
}

var eeveeModel, espeonModel, flareonModel, glaceonModel, jolteonModel, leafeonModel, sylveonModel, umbreonModel, vaporeonModel;
carregarModelos()

// GRAMA
const texturaGrama = new THREE.TextureLoader().load('assets/CARTAS/grama-chao.webp');
const chao = new THREE.MeshStandardMaterial({map: texturaGrama});

const ground = new THREE.Mesh( new THREE.CylinderGeometry(3,3,0.3,32) , new THREE.MeshStandardMaterial( chao ) );
scene.add( ground );
ground.position.y = -0.1;
ground.receiveShadow = true
ground.castShadow = true

// TERRA
const texturaTerra = new THREE.TextureLoader().load('assets/CARTAS/terra.jpg');
const terra = new THREE.MeshStandardMaterial({map: texturaTerra});

const ground2 = new THREE.Mesh( new THREE.CylinderGeometry(3.1,3.1,0.4,32) , new THREE.MeshStandardMaterial( terra ) );
scene.add( ground2 );
ground2.position.y = -0.2;
ground2.receiveShadow = true
ground2.castShadow = true
// Controles

// Adicione um evento de mousemove ao documento
document.addEventListener('mousemove', onMouseMove, false);

// Função para lidar com o movimento do mouse
function onMouseMove(event) {
  // Normalizar a posição do mouse entre -1 e 1
  var mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  var mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

  // Calcular as rotações com base nas coordenadas do mouse
  var rotationX = mouseY * Math.PI * 0.2; // Pode ajustar a sensibilidade multiplicando por um fator
  var rotationY = mouseX * Math.PI * 0.2;

  // Aplicar as rotações aos modelos
  if(eeveeModel){
    eeveeModel.rotation.y = rotationY;
  }
  if(espeonModel){
    espeonModel.rotation.y = rotationY;
  }
  if(flareonModel){
    flareonModel.rotation.y = rotationY;
  }
  if(glaceonModel){
    glaceonModel.rotation.y = rotationY;
  }
  if(jolteonModel){
    jolteonModel.rotation.y = rotationY;
  }
  if(leafeonModel){
    leafeonModel.rotation.y = rotationY;
  }
  if(sylveonModel){
    sylveonModel.rotation.y = rotationY;
  }
  if(umbreonModel){
    umbreonModel.rotation.y = rotationY;
  }
  if(vaporeonModel){
    vaporeonModel.rotation.y = rotationY;
  }
  if(ground){
    ground.rotation.y = rotationY;
  }
}

const textureLoader = new THREE.TextureLoader();

// Carregar textura para a parte de trás da carta
const texturaAtras = textureLoader.load('assets/CARTAS/backside.png');
const parteAtras = new THREE.MeshBasicMaterial({ map: texturaAtras });

// Criar geometria da carta
const geometry = new THREE.BoxGeometry(2.5, 4, 0.01);

const cartaVerso = new THREE.Mesh(geometry, parteAtras);

// scene.add(cartaVerso);

const cartasLista = []

// Função para criar uma carta
function criarCarta(texturaFrente) {
    // Criar material da parte da frente da carta
    const parteFrente = new THREE.MeshBasicMaterial({ map: texturaFrente });
    // Criar a carta (usando um plano como exemplo)
    const carta = new THREE.Mesh(geometry, parteFrente);
    // Posicionar a carta aleatoriamente
    carta.position.x = 5
    carta.position.y = 3
    carta.position.z = 0.01

    

    console.log(carta.position.x, carta.position.y, carta.position.z);
    cartasLista.push(carta);
    return carta;
}

// Carregar texturas para a parte da frente das cartas
const texturasFrente = [
    textureLoader.load('assets/CARTAS/eevee.webp'),
    textureLoader.load('assets/CARTAS/espeon.webp'),
    textureLoader.load('assets/CARTAS/flareon.webp'),
    textureLoader.load('assets/CARTAS/glaceon.webp'),
    textureLoader.load('assets/CARTAS/jolteon.webp'),
    textureLoader.load('assets/CARTAS/leafeon.webp'),
    textureLoader.load('assets/CARTAS/umbreon.webp'),
    textureLoader.load('assets/CARTAS/vaporeon.webp'),
    textureLoader.load('assets/CARTAS/sylveon.jpg')
];

// Criar as cartas e adicioná-las à cena

const cartas = texturasFrente.map(textura => {
    const carta = criarCarta(textura);
    scene.add(carta);
    return carta;
});


// esferas

class Esfera extends THREE.Mesh {
  constructor(raio = 1, segmentos = 32, cor = 0xffffff) {
      // Chame o construtor da classe pai (THREE.Mesh) usando super()
      super(new THREE.SphereGeometry(raio, segmentos, segmentos), new THREE.MeshBasicMaterial({ color: cor }));
  }
  girarEmTornoDoEixoY(velocidade) {
      this.rotation.y += velocidade;
  }
  // Método para mudar a cor da esfera
  mudarCor(novaCor) {
    if (this.material instanceof THREE.MeshBasicMaterial) {
        // Define a nova cor para o material da esfera
        this.material.color.set(novaCor);
    } 
  }
}

const esfera1 = new Esfera(0.03, 32, 0xff0000);
scene.add(esfera1);
esfera1.mudarCor('yellow');

const esfera2 = new Esfera(0.03, 32, 0xff0000);
scene.add(esfera2);
esfera2.mudarCor('yellow');

// ANIMAÇÃO

let angulo = 0.0
let raio = 3

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    //botaoRenderer.render(scene, camera);

    angulo += 0.05
    esfera1.position.set(raio*Math.cos(angulo),0.5, raio*Math.sin(angulo))
    esfera2.position.set(raio*Math.cos(-angulo),0.5, raio*Math.sin(-angulo))
    
    minhaLuz1.position.set(raio*Math.cos(angulo),1, raio*Math.sin(angulo))
    minhaluz2.position.set(raio*Math.cos(-angulo),1, raio*Math.sin(-angulo))
    minhaluz3.position.set(0, 5*Math.cos(angulo), 5*Math.sin(angulo))
    
}

animate();

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}


//2dRenderer
/*
const botaoRenderer = new CSS2DRenderer();
botaoRenderer.setSize(window.innerWidth, window.innerHeight);
botaoRenderer.domElement.style.position = 'absolute';
botaoRenderer.domElement.style.top = '0px'
document.body.appendChild(botaoRenderer.domElement);

const botao = document.createElement('button');
botao.className = 'botao';
const botaoContainer = document.createElement('div');
botaoContainer.appendChild(botao);
*/

/*
// BOTÃO VAPOREON
const botaoVaporeon = document.createElement('button');
botaoVaporeon.className = 'botaoVaporeon';
const imgVaporeon = document.createElement('img');
imgVaporeon.src = "../site/simbolos/water.webp";
botaoVaporeon.appendChild(imgVaporeon);
botaoVaporeon.addEventListener('click', () => {
  carregarModelos('vaporeon');
});
const botaoVaporeonObj = new CSS2DObject(botaoVaporeon);
botaoVaporeonObj.position.set(6, -2, 0);
scene.add(botaoVaporeonObj);
*/