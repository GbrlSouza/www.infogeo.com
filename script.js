const map = document.getElementById("map");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalText = document.getElementById("modal-text");
const closeButton = document.getElementById("close");

let locations = [];

// Função para buscar países da API REST Countries
async function fetchCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        locations = data.map(country => ({
            name: country.name.common,
            lat: country.latlng[0],
            lng: country.latlng[1],
        }));
        initMap();
    } catch (error) {
        console.error('Erro ao buscar países:', error);
    }
}

// Inicializa o mapa
function initMap() {
    const mapOptions = {
        center: { lat: 0, lng: 0 },
        zoom: 2,
    };

    const googleMap = new google.maps.Map(map, mapOptions);

    locations.forEach(location => {
        const marker = new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: googleMap,
            title: location.name,
        });

        marker.addListener("click", () => {
            fetchWikiData(location.name);
        });
    });
}

// Função para buscar informações da Wikipedia
async function fetchWikiData(locationName) {
    try {
        const response = await fetch(`https://pt.wikipedia.org/api/rest_v1/page/summary/${locationName}`);
        const data = await response.json();
        modalTitle.textContent = locationName;
        modalText.textContent = data.extract || 'Informações não disponíveis.';
        modal.style.display = "block";
    } catch (error) {
        console.error('Erro ao buscar dados da Wikipedia:', error);
    }
}

// Fecha o modal
closeButton.onclick = function() {
    modal.style.display = "none";
}

// Fecha o modal ao clicar fora dele
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// Carrega o mapa quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', fetchCountries);
