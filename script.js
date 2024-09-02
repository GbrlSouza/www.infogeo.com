// Selecionando o div que irá conter o globo
const container = document.getElementById('globe');
const popup = document.getElementById('popup');

// Configurações básicas do globo
const width = container.offsetWidth;
const height = container.offsetHeight;

// Criação da cena e câmera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.z = 2;

// Renderizador
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
container.appendChild(renderer.domElement);

// Carregar o mapa do globo
const loader = new THREE.TextureLoader();
loader.load('https://raw.githubusercontent.com/ianmcnicholas/earthmap/master/images/earthmap4k.jpg', function(texture) {
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Função para renderizar a cena
    function animate() {
        requestAnimationFrame(animate);
        globe.rotation.y -= 0.001; // Rotação do globo
        renderer.render(scene, camera);
    }

    animate();

    // Adicionando eventos de clique
    window.addEventListener('click', function(event) {
        const x = (event.clientX / width) * 2 - 1;
        const y = -(event.clientY / height) * 2 + 1;
        const mouse = new THREE.Vector2(x, y);

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(globe);

        if (intersects.length > 0) {
            const point = intersects[0].point;

            // Aqui você pode mapear o ponto clicado a um país e exibir um popup
            // Por exemplo, um mapa de coordenadas dos países
            popup.style.left = event.clientX + 'px';
            popup.style.top = event.clientY + 'px';
            popup.style.display = 'block';
            popup.innerHTML = 'País: ' + getCountryName(point) + '<br>Informações sobre o país...';
        }
    });

    function getCountryName(point) {
        // Mapeie as coordenadas para o nome do país aqui
        // Essa função é apenas um placeholder
        return "Brasil";
    }
});
