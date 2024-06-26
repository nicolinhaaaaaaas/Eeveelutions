// IMPORTS //
import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { carregarCenario, cenarioLista, carregarNuvem, nuvensLista, vagalumeLista, chaoLista, solExport, luaExport } from './modelos.js';

// CENA ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const canvas = document.querySelector('canvas.webgl')

// Define o tamanho da janela do navegador
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}
const scene = new THREE.Scene();
scene.castShadow = true;
scene.receiveShadow = true;
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.set(0, 2.2, 7);
scene.add(camera);

// Inicializa a variável scrollY com o valor atual do scroll vertical da janela
let scrollY = window.scrollY
// Inicializa a variável currentSection com o valor 0, representando a seção atual da página
let currentSection = 0

// SEÇÕES DA PÁGINA /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////QQQQQ
const body = document.body;

// Seleciona o elemento HTML com a classe 'loading-bar'
const loadingBarElement = document.querySelector('.loading-bar')

// Cria um novo LoadingManager do Three.js PARA A TELA DE CARREGAMENTO
const loadingManager = new THREE.LoadingManager(
  // Função a ser executada quando todos os recursos estiverem carregados
  () => {
      // Define um timeout para executar um conjunto de ações após 500 milissegundos
      window.setTimeout(() => {
          // Faz uma animação de fade out no elemento de sobreposição usando GSAP
          gsap.to(overlayMaterial.uniforms.uAlpha, {
              duration: 3,
              value: 0,
              delay: 1
          })
          // Adiciona a classe 'ended' ao elemento de barra de carregamento
          loadingBarElement.classList.add('ended')
          // Adiciona a classe 'loaded' ao elemento <body>
          body.classList.add('loaded')
          // Reseta a transformação CSS da barra de carregamento
          loadingBarElement.style.transform = ''
      }, 500)
  },
  // Função a ser executada a cada vez que um item é carregado
  (itemUrl, itemsLoaded, itemsTotal) => {
      // Exibe no console a URL do item, a quantidade de itens carregados e o total de itens
      console.log(itemUrl, itemsLoaded, itemsTotal)
      // Calcula a proporção de progresso do carregamento e atualiza a barra de carregamento
      const progressRatio = itemsLoaded / itemsTotal
      loadingBarElement.style.transform = `scaleX(${progressRatio})`
      console.log(progressRatio)
  },
  // Função a ser executada em caso de erro durante o carregamento
  () => {
      console.log('Erro ao carregar os recursos')
  }
)

// Cria uma geometria plana para representar a sobreposição
const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)

// Cria um material para a sobreposição usando shaders
const overlayMaterial = new THREE.ShaderMaterial({
    // Define o vertex shader
    vertexShader: `
        void main() {
            gl_Position = vec4(position, 1.0);
        }
    `,
    // Define o fragment shader
    fragmentShader: `
        uniform float uAlpha;
        void main() {
            gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
        }
    `,
    // Define os uniforms (variáveis uniformes do shader)
    uniforms: {
        uAlpha: { value: 1.0 } // Define o valor inicial da transparência
    },
    transparent: true // Define o material como transparente
})

// Cria um objeto Mesh usando a geometria e o material criados anteriormente
const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)

// Adiciona a sobreposição à cena
scene.add(overlay)

let secaoAtual = 0;

let corFundoInicial = '';




// Objeto que mapeia o número da seção para a função que será executada
const sectionActions = {
  0: () => {
    secaoAtual = 0;
      // Ação para a seção 0
      cartasLista.forEach(carta => {
        moverModelo(carta, 10, 1, 10); // FAZ TODAS AS CARTAS IREM PRO MESMO LUGAR
      })
      movimentarEsferas(2);

      moverModelo(chaoLista[0], 0, -10, 0) // CHÃO
      moverModelo(chaoLista[1], 0, -10, 0) // CHÃO 2
      moverModelo(eeveeModel, 0, -10, 0) // EEVEE NORMAL

      moverModelo(cenarioLista[1], 0,0.8,3) // FLORESTA
      moverModelo(cenarioLista[0], -0.3, 0.9, 4.8) // EEVEE TITULO

      minhaLuz1.atualizarIntensidade(0)
      minhaluz2.atualizarIntensidade(0)
      minhaluz3.atualizarIntensidade(0)
      
      mudarCamera(-1,1.5, 5.7,-0.1,-0.1,0)

      luzDirecional.intensity = 2.5

      funcaoParticulas.mudarOpacidade(1)

      animarFundo(2);

      body.style.background = corFundoInicial;
       
  },
  1: () => {
    secaoAtual = 1;
      // Ação para a seção 1   
      movimentarEsferas(1);
      animarFundo(1);

      mudarCamera(0,2.2, 7,0,0,0)
      moverModelo(cenarioLista[1], 0, 13,0) // FLORESTA
      moverModelo(cenarioLista[0], 0, 13,0) // EEVEE TITULO

      minhaLuz1.atualizarIntensidade(2)
      minhaluz2.atualizarIntensidade(2)
      minhaluz3.atualizarIntensidade(8)

      luzDirecional.intensity = 1.5

      moverModelo(cartasLista[0], 6, 1, 1.5) // CARTA EEVEE
      moverModelo(cartasLista[7], 10, 1, 10) // CARTA VAPOREON

      moverModelo(chaoLista[0], 0, -0.1, 0) // CHÃO
      moverModelo(chaoLista[1], 0, -0.2, 0) // CHÃO 2

      moverModelo(eeveeModel, 0, 0, 0) // EEVEE NORMAL
      moverModelo(vaporeonModel, 25, 0, 0); // VAPOREON
      
      
  },
  2: () => {
    secaoAtual = 2;
      // Ação para a seção 2
      moverModelo(cartasLista[0], 10, 1, 10) // CARTA EEVEE
      moverModelo(cartasLista[7], 6, 1, 1.5) // CARTA VAPOREON
      moverModelo(cartasLista[4], 10, 1, 10) // CARTA JOLTEON

      moverModelo(eeveeModel, -25, 0, 0) // EEVEE NORMAL
      moverModelo(vaporeonModel, 0, 0, 0); // VAPOREON
      moverModelo(jolteonModel, -25, 0, 0); // JOLTEON
      
  },
  3: () => {
    secaoAtual = 3;
      // Ação para a seção 3
      moverModelo(cartasLista[7], 10, 1, 10) // CARTA VAPOREON
      moverModelo(cartasLista[4], 6, 1, 1.5) // CARTA JOLTEON
      moverModelo(cartasLista[2], 10, 1, 10) // CARTA FLAREON

      moverModelo(jolteonModel, 0, 0, 0); // JOLTEON
      moverModelo(vaporeonModel, 25, 0, 0); // VAPOREON
      moverModelo(flareonModel, 25, 0, 0); // FLAREON

  },
  4: () => {
    secaoAtual = 4;
      // Ação para a seção 4
      moverModelo(cartasLista[4], 10, 1, 10) // CARTA JOLTEON
      moverModelo(cartasLista[2], 6, 1, 1.5) // CARTA FLAREON
      moverModelo(cartasLista[1], 10, 1, 10) // CARTA ESPEON

      moverModelo(jolteonModel, -25, 0, 0); // JOLTEON
      moverModelo(flareonModel, 0, 0.15, 0) // FLAREON
      moverModelo(espeonModel, -25, 0, 0); // ESPEON

      
  },
  5: () => {
    secaoAtual = 5;
      // Ação para a seção 5
      moverModelo(cartasLista[2], 10, 1, 10) // CARTA FLAREON
      moverModelo(cartasLista[1], 6, 1, 1.5) // CARTA ESPEON
      moverModelo(cartasLista[6], 10, 1, 10) // CARTA UMBREON

      moverModelo(flareonModel, 25, 0, 0) // FLAREON
      moverModelo(espeonModel, 0, 0.05, 0) // ESPEON
      moverModelo(umbreonModel, 25, 0, 0); // UMBREON

     
  },
  6: () => {
    secaoAtual = 6;
      // Ação para a seção 6
      moverModelo(cartasLista[1], 10, 1, 10) // CARTA ESPEON
      moverModelo(cartasLista[6], 6, 1, 1.5) // CARTA UMBREON
      moverModelo(cartasLista[5], 10, 1, 10) // CARTA LEAFEON

      moverModelo(espeonModel, -25, 0, 0) // ESPEON
      moverModelo(umbreonModel, 0, 0, 0) // UMBREON
      moverModelo(leafeonModel, -25, 0, 0);  // LEAFEON 

      
  },
  7: () => {
    secaoAtual = 7;
      // Ação para a seção 7
      moverModelo(cartasLista[6], 10, 1, 10) // CARTA UMBREON
      moverModelo(cartasLista[5], 6, 1, 1.5) // CARTA LEAFEON
      moverModelo(cartasLista[3], 10, 1, 10) // CARTA GLACEON

      moverModelo(umbreonModel, 25, 0, 0) // UMBREON
      moverModelo(leafeonModel, 0, 0, 0) // LEAFEON
      moverModelo(glaceonModel, 25, 0, 0); // GLACEON

  
  },
  8: () => {
    secaoAtual = 8;
      // Ação para a seção 8
      moverModelo(cartasLista[5], 10, 1, 10) // CARTA LEAFEON
      moverModelo(cartasLista[3], 6, 1, 1.5) // CARTA GLACEON
      moverModelo(cartasLista[8], 10, 1, 10) // CARTA SYLVEON

      moverModelo(leafeonModel, -25, 0, 0) // LEAFEON
      moverModelo(glaceonModel, 0, 0, 0) // GLACEON
      moverModelo(sylveonModel, -25, 0, 0); // SYLVEON
    
  },
  9: () => {
    secaoAtual = 9;
      // Ação para a seção 9
      moverModelo(cartasLista[3], 10, 1, 10) // CARTA GLACEON
      moverModelo(cartasLista[8], 6, 1, 1.5) // CARTA SYLVEON

      moverModelo(glaceonModel, 25, 0, 0) // GLACEON
      moverModelo(sylveonModel, 0, 0, 0) // SYLVEON

      moverModelo(chaoLista[0], 0, -0.1, 0) // CHÃO
      moverModelo(chaoLista[1], 0, -0.2, 0) // CHÃO 2

      movimentarEsferas(1);

      funcaoParticulas.mudarOpacidade(1)

      body.style.background = 'linear-gradient(90deg,#ffdae3,#d1fffc,#a0f2ed,#d1fffc,#a0f2ed,#ffa1bd)';
  },
  10: () => {
    secaoAtual = 10;
      // Ação para a seção 10
      moverModelo(cartasLista[8], 10, 1, 10) // CARTA SYLVEON

      moverModelo(chaoLista[0], 0, -10, 0) // CHÃO
      moverModelo(chaoLista[1], 0, -10, 0) // CHÃO 2
      moverModelo(sylveonModel, 0, -10, 0) // SYLVEON

      movimentarEsferas(2);

      funcaoParticulas.mudarOpacidade(0)
      body.style.background = 'linear-gradient(90deg, #004173,#0979b0,#0cb7f2,#7cdaf9,#b6ffff,#7cdaf9,#0cb7f2,#0979b0,#004173)';
  }
};

function mudarCamera(posX, posY, posZ, alvoX, alvoY, alvoZ){
  const duracaoAnimacao = 1;

  gsap.to(camera.position, { duration: duracaoAnimacao, ease: 'power2.inOut', x: posX, y: posY, z: posZ });
  gsap.to(camera.rotation, { duration: duracaoAnimacao, ease: 'power2.inOut', x: alvoX, y: alvoY, z: alvoZ });
}

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

// Cria um renderizador WebGL com as configurações especificadas
const renderer = new THREE.WebGLRenderer({
  canvas: canvas, // Define o canvas onde a renderização será feita
  antialias: true, // Ativa a opção de antialiasing para suavizar as bordas
  alpha: true // Permite que o canvas tenha um canal alfa (transparência)
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.2)
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
  // método para atualizar a intensidade da luz
  atualizarIntensidade(intensidade) {
      this.luz.intensity = intensidade;
  }
}

// Crie uma instância da classe MinhaLuz
const minhaLuz1 = new MinhaLuz(0xffffff, 3);
const minhaluz2 = new MinhaLuz(0xffffff, 3);
const minhaluz3 = new MinhaLuz(0xffff00, 6);
scene.add(minhaLuz1);
scene.add(minhaluz2);
scene.add(minhaluz3);

const luzDirecional = new THREE.DirectionalLight(0xffffff, 1.5);
luzDirecional.position.set(0, 1, 3);
luzDirecional.castShadow = true;
scene.add(luzDirecional);

// MODELOS CARREGADOS //////////////////////////////////////////////////////////////////////////////////////////////////////////
let movimentoConcluido = false;

function moverModelo(modelo, positionX, positionY, positionZ) {
  if (modelo) {
    gsap.to(modelo.position, { duration: 1.5, ease: 'power2.inOut', x: positionX , y: positionY, z: positionZ, onComplete: () => {
        movimentoConcluido = true;// Define movimentoConcluido como true após o término do movimento
    } });
  }
};

// Função para alternar a textura dos olhos entre duas posições diferentes
function toggleTextureOffset(offsetX1, offsetY1, offsetX2, offsetY2, model, materialName, tempo, loop) {
  // Verificar se o modelo foi carregado corretamente
  if (model) {
      model.traverse(function (child) {
          if (child.isMesh) {
              // Supondo que os olhos estão em um material específico no modelo
              if (child.material.name === materialName) {
                  // Se loop for verdadeiro, alternar entre as posições de textura repetidamente
                  if (loop) {
                      setInterval(function () {
                          child.material.map.offset.set(offsetX2, offsetY2);
                          child.material.needsUpdate = true; // Atualizar o material

                          // Aguardar meio segundo e retornar à posição original da textura
                          setTimeout(function () {
                              child.material.map.offset.set(offsetX1, offsetY1);
                              child.material.needsUpdate = true; // Atualizar o material
                          }, tempo); // Tempo que dura a "piscada"
                      }, 5000); // Tempo entre as "piscadas"
                  } else {
                      // Se loop for falso, apenas alternar a textura uma vez
                      child.material.map.offset.set(offsetX2, offsetY2);
                      child.material.needsUpdate = true; // Atualizar o material

                      // Aguardar o tempo especificado e retornar à posição original da textura
                      setTimeout(function () {
                          child.material.map.offset.set(offsetX1, offsetY1);
                          child.material.needsUpdate = true; // Atualizar o material
                      }, tempo); // Tempo que dura a "piscada"
                  }
              }
          }
      });
  }
}

var eeveeModel, espeonModel, flareonModel, glaceonModel, jolteonModel, leafeonModel, sylveonModel, umbreonModel, vaporeonModel;
const modelosLista = []
function carregarModelos(){
    console.log('Carregando Eevee'); 
    const Eevee = new GLTFLoader(loadingManager);
    Eevee.load('/assets/eevee/scene.gltf', (eevee) => {
      eevee.scene.scale.set(8, 8, 8);
      scene.add(eevee.scene);
      eevee.scene.castShadow = true;
      eeveeModel = eevee.scene;
      eeveeModel.position.set(0, -9, 0);
      modelosLista.push(eeveeModel);

      toggleTextureOffset(0, 0, 0.5, 0.25, eeveeModel, 'Material_13', 500, true);
    });

    const Espeon = new GLTFLoader(loadingManager);
    Espeon.load('/assets/espeon/scene.gltf', (espeon) => {
      espeon.scene.scale.set(2, 2, 2);
      scene.add(espeon.scene);
      espeon.scene.castShadow = true;
      espeonModel = espeon.scene;
      espeonModel.position.set(-25, 0, 0);
      console.log(espeonModel)
      modelosLista.push(espeonModel);

      toggleTextureOffset(0, 0, 0.5, 0.75, espeonModel, 'Material_106', 500, true);
    });

    const Flareon = new GLTFLoader(loadingManager);
    Flareon.load('/assets/flareon/scene.gltf', (flareon) => {
      flareon.scene.scale.set(1.8,1.9,2);
      scene.add(flareon.scene);
      flareon.scene.castShadow = true
      flareonModel = flareon.scene;
      flareonModel.position.set(25, 0, 0);
      modelosLista.push(flareonModel);

      toggleTextureOffset(0, 0, 0.5, 0.75, flareonModel, 'Material_12', 500, true);
    });

    const Glaceon = new GLTFLoader(loadingManager);
    Glaceon.load('/assets/glaceon/scene.gltf', (glaceon) => {
      glaceon.scene.scale.set(2,2,2);
      scene.add(glaceon.scene);
      glaceon.scene.castShadow = true
      glaceonModel = glaceon.scene;
      glaceonModel.position.set(25, 0, 0);
      modelosLista.push(glaceonModel);

      toggleTextureOffset(0, 0, 0.5, 0.75, glaceonModel, 'Material_26', 500, true);
    });

    const Jolteon = new GLTFLoader(loadingManager);
    Jolteon.load('/assets/jolteon/scene.gltf', (jolteon) => {
      jolteon.scene.scale.set(2,2,2);
      scene.add(jolteon.scene);
      jolteon.scene.castShadow = true
      jolteonModel = jolteon.scene;
      jolteonModel.position.set(-25, 0, 0);
      modelosLista.push(jolteonModel);

      toggleTextureOffset(0, 0, 0.5, 0.75, jolteonModel, 'Material_11', 500, true);
    });

    const Leafeon = new GLTFLoader(loadingManager);
    Leafeon.load('/assets/leafeon/scene.gltf', (leafeon) => {
      leafeon.scene.scale.set(2,2,2);
      scene.add(leafeon.scene);
      leafeon.scene.castShadow = true
      leafeonModel = leafeon.scene;
      leafeonModel.position.set(-25, 0, 0);
      modelosLista.push(leafeonModel);

      toggleTextureOffset(0, 0, 0.5, 0.75, leafeonModel, 'Material_13', 500, true);
    });
  

    const Sylveon = new GLTFLoader(loadingManager);
    Sylveon.load('/assets/sylveon/scene.gltf', (sylveon) => {
      sylveon.scene.scale.set(2,2,2);
      scene.add(sylveon.scene);
      sylveon.scene.castShadow = true
      sylveonModel = sylveon.scene;
      sylveonModel.position.set(-25, 0, 0);
      modelosLista.push(sylveonModel);

      toggleTextureOffset(0, 0, 0.5, 0.75, sylveonModel, 'Material__10', 500, true);
    });
  

    const Umbreon = new GLTFLoader(loadingManager);
    Umbreon.load('/assets/umbreon/scene.gltf', (umbreon) => {
      umbreon.scene.scale.set(2,2,2);
      scene.add(umbreon.scene);
      umbreon.scene.castShadow = true
      umbreonModel = umbreon.scene;
      umbreonModel.position.set(25, 0, 0);
      modelosLista.push(umbreonModel);

      toggleTextureOffset(0, 0, 0.5, 0.75, umbreonModel, 'Material_93', 500, true);
    });

    const Vaporeon = new GLTFLoader(loadingManager);
    Vaporeon.load('/assets/vaporeon/scene.gltf', (vaporeon) => {
      vaporeon.scene.scale.set(1.7,1.7,1.7);
      scene.add(vaporeon.scene);
      vaporeon.scene.castShadow = true
      vaporeonModel = vaporeon.scene;
      vaporeonModel.position.set(25, 0, 0);
      modelosLista.push(vaporeonModel);

      toggleTextureOffset(0, 0, 0.5, 0.75, vaporeonModel, 'Material_11', 500, true);
    });
}

carregarModelos()

carregarCenario(scene, loadingManager)
console.log(cenarioLista)
carregarNuvem(scene, loadingManager)
console.log(nuvensLista)
console.log(vagalumeLista)

scene.add(vagalumeLista[0])
scene.add(vagalumeLista[1])

scene.add(chaoLista[0])
scene.add(chaoLista[1])

scene.add(solExport)
solExport.position.set(-40,10,-50)
if(solExport){
  console.log('sol')
}

scene.add(luaExport)
luaExport.position.set(-40,10,-50)
if(luaExport){
  console.log('lua')
}

const textureLoader = new THREE.TextureLoader();
// Criar geometria da carta
const geometryCarta = new THREE.BoxGeometry(2.5, 3.7, 0.01);

const cartasLista = []

function criarCarta(texturaFrente) {// Função para criar uma carta
    const parteFrente = new THREE.MeshBasicMaterial({ map: texturaFrente });
    const carta = new THREE.Mesh(geometryCarta, parteFrente);
    carta.position.set(10, 1, 10)
    scene.add(carta);

    cartasLista.push(carta);    
    return carta;
}

const clock = new THREE.Clock()// Cria um relógio para rastrear o tempo decorrido
// Função de atualização para movimentar a carta após o término do movimento principal
function atualizarCarta() {
  const elapsedTime = clock.getElapsedTime();// Obtém o tempo decorrido desde o último quadro
  
  if (movimentoConcluido) {         // Verifica se o movimento principal já foi concluído
      cartasLista.forEach(carta => {// Faz a carta ficar flutuando apenas após o término do movimento principal
          carta.position.y = Math.sin(elapsedTime * .5) * 0.2 + 0.8;
      });
  }
  renderer.render(scene, camera);// Atualiza a cena
  requestAnimationFrame(atualizarCarta);// Chama a função novamente para o próximo quadro
}
atualizarCarta();// Inicia a função de atualização

const texturasFrente = [ // Carregar texturas para a parte da frente das cartas
    textureLoader.load('assets/CARTAS/eevee.webp'),
    textureLoader.load('assets/CARTAS/espeon.png'),
    textureLoader.load('assets/CARTAS/flareon.webp'),
    textureLoader.load('assets/CARTAS/glaceon.webp'),
    textureLoader.load('assets/CARTAS/jolteon.webp'),
    textureLoader.load('assets/CARTAS/leafeon.webp'),
    textureLoader.load('assets/CARTAS/umbreon.webp'),
    textureLoader.load('assets/CARTAS/vaporeon.jpg'),
    textureLoader.load('assets/CARTAS/sylveon.webp')
];

// Criar as cartas e adicioná-las à cena
const cartas = texturasFrente.map(textura => {
    const carta = criarCarta(textura, scene);
    scene.add(carta);
    return carta;
});

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
  if(chaoLista[0]){
    chaoLista[0].rotation.y = rotationY;
  }
  modelosLista.forEach(modelo => {
    modelo.rotation.y = rotationY;
  });
}

let angulo = 0.0
let anguloVelocidade = 0.0
let raio = 3
function movimentarEsferas(opcao) {
  // Define um limite de velocidade
  const limiteVelocidade = 0.002;
  // Verifica se a velocidade atual é menor que o limite
  if (anguloVelocidade < limiteVelocidade) {
    // Incrementa a velocidade
    anguloVelocidade += 0.001;
  }
  // Atualiza o ângulo com base na velocidade
  angulo += anguloVelocidade;
  vagalumeLista[0].position.x = raio*Math.cos(angulo)
  vagalumeLista[0].position.z = raio*Math.sin(angulo)
  
  vagalumeLista[1].position.x = raio*Math.cos(-angulo)
  vagalumeLista[1].position.z = raio*Math.sin(-angulo)
  if(opcao === 1){
    console.log('subindo')
    vagalumeLista[0].position.y = 0.5
    vagalumeLista[1].position.y = 0.5
  }else if(opcao === 2){
    console.log('descendo')
    vagalumeLista[0].position.y = -10
    vagalumeLista[1].position.y = -10
  }
  renderer.render(scene, camera);
  requestAnimationFrame(movimentarEsferas);
}

let anguloSol = 0;
let velocidadeSol = 0.0100; // Velocidade inicial do sol
let raioSol = 40;

// Coordenadas do ponto em torno do qual o sol deve girar
let centroX = -65; // Altere para a coordenada X desejada
let centroY = 18; // Altere para a coordenada Y desejada

// Ângulo inicial da lua em relação ao sol (em radianos)
let anguloInicialLua = Math.PI; // Começa do lado oposto do sol

function movimentarSol() {
     // Define um limite de velocidade
     const limiteVelocidadeSol = 0.002;
     // Verifica se a velocidade atual é menor que o limite
     if (velocidadeSol < limiteVelocidadeSol) {
         // Incrementa a velocidade
         velocidadeSol += 0.0100;
     }
     // Atualiza o ângulo com base na velocidade
     anguloSol += velocidadeSol;

    // Calcula a posição do sol em torno do ponto central
    solExport.position.x = centroX + raioSol * Math.cos(anguloSol);
    solExport.position.y = centroY + raioSol * Math.sin(anguloSol);

    // Incrementa o ângulo da lua
    anguloInicialLua += velocidadeSol;

    // Calcula a posição da lua em torno do ponto central
    luaExport.position.x = centroX + raioSol * Math.cos(anguloInicialLua);
    luaExport.position.y = centroY + raioSol * Math.sin(anguloInicialLua);

    // muda o background da primeira tela baseado na posição do sol e da lua
    if(secaoAtual === 0){
      if (solExport.position.y > 35) {
        console.log('NOITE')
        body.style.background = 'linear-gradient(90deg, rgba(96,93,139,1) 0%, rgba(47,47,139,1) 48%, rgba(0,147,177,1) 100%)';
      } else if (solExport.position.y < 5) {
        console.log('DIA')
        body.style.background = 'linear-gradient(90deg, #50c8c6, #f1eba0,#50c8c6, #f1eba0)';
      } 
    }
    if(secaoAtual === 1){
      if (solExport.position.y > 35) {
        console.log('NOITE')
        body.style.background = 'linear-gradient(90deg, rgba(96,93,139,1) 0%, rgba(47,47,139,1) 48%, rgba(0,147,177,1) 100%)';
      } else if (solExport.position.y < 5) {
        console.log('DIA')
        body.style.background = 'linear-gradient(90deg, #EEE1BC,rgb(185, 116, 52),#EEE1BC,rgb(185, 116, 52))';
      } 
    }
    if(secaoAtual === 2){
      if (solExport.position.y > 35) {
        console.log('NOITE')
        body.style.background = 'linear-gradient(90deg, rgba(96,93,139,1) 0%, rgba(47,47,139,1) 48%, rgba(0,147,177,1) 100%)';
      } else if (solExport.position.y < 5) {
        console.log('DIA')
        body.style.background = 'linear-gradient(90deg,  #50c8c6, #f1eba0,#50c8c6, #f1eba0)';
      } 
    }
    if(secaoAtual === 3){
      if (solExport.position.y > 35) {
        console.log('NOITE')
        body.style.background = 'linear-gradient(90deg, rgba(96,93,139,1) 0%, rgba(47,47,139,1) 48%, rgba(0,147,177,1) 100%)';
      } else if (solExport.position.y < 5) {
        console.log('DIA')
       
        body.style.background = 'linear-gradient(90deg, #f7f7df,#ffff71,#f7f7df,#ffff71)';
      } 
    }
    if(secaoAtual === 4){
      if (solExport.position.y > 35) {
        console.log('NOITE')
        body.style.background = 'linear-gradient(90deg, rgba(96,93,139,1) 0%, rgba(47,47,139,1) 48%, rgba(0,147,177,1) 100%)';
      } else if (solExport.position.y < 5) {
        console.log('DIA')
        body.style.background = 'linear-gradient(-45deg,#F7E8A1,#ff8f5c,#ffdc5e,#F7E8A1,#ff5100,#F7E8A1,#ffdc5e,#ff8f5c,#F7E8A1,#ff5100)';
      } 
    }
    if(secaoAtual === 5){
      if (solExport.position.y > 35) {
        console.log('NOITE')
        body.style.background = 'linear-gradient(90deg, rgba(96,93,139,1) 0%, rgba(47,47,139,1) 48%, rgba(0,147,177,1) 100%)';
      } else if (solExport.position.y < 5) {
        console.log('DIA')
        body.style.background = 'linear-gradient(95deg, #ffadad, #e8b7ed,#ffadad,#e8b7ed,#a073de)';
      } 
    }
    if(secaoAtual === 6){
      if (solExport.position.y > 35) {
        console.log('NOITE')
        body.style.background = 'linear-gradient(90deg, rgba(96,93,139,1) 0%, rgba(47,47,139,1) 48%, rgba(0,147,177,1) 100%)';
      } else if (solExport.position.y < 5) {
        console.log('DIA')
        body.style.background = 'linear-gradient(-45deg, #4d61ab,#43e0ff, #d13434,#eafa57, #6bb0ff, #9bff19,#d13434)';
      } 
    }
    if(secaoAtual === 7){
      if (solExport.position.y > 35) {
        console.log('NOITE')
        body.style.background = 'linear-gradient(90deg, rgba(96,93,139,1) 0%, rgba(47,47,139,1) 48%, rgba(0,147,177,1) 100%)';
      } else if (solExport.position.y < 5) {
        console.log('DIA')
        body.style.background = 'linear-gradient(90deg, #f9ffa5, #d0e384,#43e0ff,#f9ffa5, #43e0ff)';
      } 
    }
    if(secaoAtual === 8){
      if (solExport.position.y > 35) {
        console.log('NOITE')
        body.style.background = 'linear-gradient(90deg, rgba(96,93,139,1) 0%, rgba(47,47,139,1) 48%, rgba(0,147,177,1) 100%)';
      } else if (solExport.position.y < 5) {
        console.log('DIA')
       
        body.style.background = 'linear-gradient(90deg, #b4e1f0,#7dc2ff,#DFF6F0,#7dc2ff )';
      } 
    }
    renderer.render(scene, camera);
    requestAnimationFrame(movimentarSol);
}

// Inicia a animação
movimentarSol();

// SOMS DOS EEVEES ////////
let somEevee = 'assets/sounds/eeveesound.mp3';
let somEspeon ='assets/sounds/espeonsound.mp3';
let somFlareon = 'assets/sounds/flareonsound.mp3';
let somGlaceon = 'assets/sounds/glaceonsound.mp3';
let somJolteon = 'assets/sounds/jolteonsound.mp3';
let somLeafeon = 'assets/sounds/leafeonsound.mp3';
let somUmbreon = 'assets/sounds/umbreonsound.mp3';
let somVaporeon = 'assets/sounds/vaporeonsound.mp3';
let somSylveon = 'assets/sounds/sylveonsound.mp3';

function bocaAnimacao(secao){
  console.log('Função de animar a boca')
  if(secao === 1){
    console.log('animando boca do eevee')
    playSound(somEevee)
    toggleTextureOffset(0, 0, 0, 0.5, eeveeModel, 'Material_14', 600, false);
  }else if(secao === 2){
    playSound(somVaporeon)
    toggleTextureOffset(0, 0, 0, 0.5, vaporeonModel, 'Material_12', 900, false);
  }else if(secao === 3){
    playSound(somJolteon)
    // JOLTEON NÃO ANIMA A BOCA
  }else if(secao === 4){
    playSound(somFlareon)
    toggleTextureOffset(0, 0, 0.5, 0, flareonModel, 'Material_13', 800, false);
  }else if(secao === 5){
    playSound(somEspeon)
    toggleTextureOffset(0, 0, 0.5, 0, espeonModel, 'Material_107', 900, false);
  }else if(secao === 6){
    playSound(somUmbreon)
    toggleTextureOffset(0, 0, 0, 0.75, umbreonModel, 'Material_94', 800, false);
  }else if(secao === 7){
    playSound(somLeafeon)
    toggleTextureOffset(0, 0, 0, 0.75, leafeonModel, 'Material_11', 1000, false);
  }else if(secao === 8){
    playSound(somGlaceon)
    toggleTextureOffset(0, 0, 0, 0.75, glaceonModel, 'Material_24', 1200, false);
  }else if(secao === 9){
    playSound(somSylveon)
    toggleTextureOffset(0, 0, 0.5, 0, sylveonModel, 'Material__12', 1200, false);
  }else{
    console.log('nada')
  }
}

// rotaciona o modelo e a carta para esquerda ou direirta
document.addEventListener('keydown', (event) => {
  console.log(event)
  if(event.key === 'ArrowLeft'){
    cartasLista.forEach(carta => {
      carta.rotation.y += -0.1
    })
    modelosLista.forEach(modelo => {
      modelo.rotation.y += -0.1
    })
    chaoLista.forEach(cenario => {
      cenario.rotation.y += -0.1
    })  
  }
  if(event.key === 'ArrowRight'){
    cartasLista.forEach(carta => {
      carta.rotation.y += 0.1
    })
    modelosLista.forEach(modelo => {
      modelo.rotation.y += 0.1
    })
    chaoLista.forEach(cenario => {
      cenario.rotation.y += 0.1
    }) 
  }
  if(event.key === 'm' || event.key === 'M'){
    playBackgroundSound(1)   
  }
  if(event.key === 'p' || event.key === 'P'){
    playBackgroundSound(2)   
  }
  if(event.key === 'a' || event.key === 'A'){
    bocaAnimacao(secaoAtual)   
  }
  
});
// ANIMAÇÃO

let animacaoEmAndamento = false;

function animarFundo(opcao){
  if(opcao === 1 && !animacaoEmAndamento){
    console.log('animando')
    animacaoEmAndamento = true;

    function animacao(){
      nuvensLista.forEach(nuvem => {
        nuvem.position.x += Math.random() * 0.006 + 0.005;
        nuvem.position.z += Math.random() * 0.001 + 0.001;
        if (nuvem.position.x > 25) {
          nuvem.position.x = Math.random() * 40 - 30;
          nuvem.position.z = Math.random() * 10 - 15;
        }
      });

      renderer.render(scene, camera);

      if (animacaoEmAndamento) {
        requestAnimationFrame(animacao);
      }
    }
    animacao();
  }
  else if(opcao === 2){
    console.log('parando')
    animacaoEmAndamento = false;
  }
}

// PARTICULAS 
class Particulas {
  constructor(scene) {
      this.scene = scene;
      this.geometry = new THREE.BufferGeometry();
      this.material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.010, opacity: 1, transparent: true });
      this.particleSystem = new THREE.Points(this.geometry, this.material);
      this.scene.add(this.particleSystem);
  }
  criarParticula(contador) {
      const positions = [];

      for (let i = 0; i < contador; i++) {
          positions.push(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5);
      }

      const attributePosition = new THREE.Float32BufferAttribute(positions, 3);
      this.geometry.setAttribute('position', attributePosition);
  }
  mudarCor(cor) {
      this.material.color.set(cor);
  }
  mudarOpacidade(opacidade) {
    this.material.opacity = opacidade;
    console.log('mudando opacidade para', opacidade)
  }
  mudarVelocidade(velocidade) {
      this.speed = velocidade;
  }
  atualizar() {
      const positions = this.geometry.attributes.position.array;
      const numParticulas = positions.length / 3; // Número total de partículas
      const raioParticula = 3.2; // Raio do círculo

      console.log(this.speed);

      for (let i = 0; i < positions.length; i += 3) {
          const anguloParticula = this.speed * i / 10; // Calcula o ângulo com base na velocidade e no índice
          positions[i] = raioParticula * Math.cos(anguloParticula); // Calcula a posição x
          positions[i + 1] = Math.random() * 0.4 - 0.3; // Mantém a posição y aleatória
          positions[i + 2] = raioParticula * Math.sin(anguloParticula); // Calcula a posição z
      }

      this.geometry.attributes.position.needsUpdate = true;
  }
}

const funcaoParticulas = new Particulas(scene)
funcaoParticulas.criarParticula(10000)
funcaoParticulas.mudarCor('yellow')
funcaoParticulas.mudarVelocidade(0.01)

function playBackgroundSound(opcao){
  let audio = new Audio('assets/sounds/PokemonSom.m4a');
  audio.volume = 0.2;
  audio.loop = true;
  if(opcao === 1){
    console.log('Tocando musica de fundo')
    audio.play();
  }
  if(opcao === 2){
    console.log('Parando musica de fundo')
    audio.pause();
  }
}
function playSound(somRecebido){
  console.log('tocando som')
  let som = new Audio(somRecebido);
  som.volume = 0.6;
  som.play();
}

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    

    angulo += 0.05
    
    minhaLuz1.position.set(raio*Math.cos(angulo),1, raio*Math.sin(angulo))
    minhaluz2.position.set(raio*Math.cos(-angulo),1, raio*Math.sin(-angulo))
    minhaluz3.position.set(0, 5*Math.cos(angulo), 5*Math.sin(angulo))

    funcaoParticulas.atualizar()
    
}
animate();
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
  
}
