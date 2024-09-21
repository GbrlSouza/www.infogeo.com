new Vue({
    el: '#app',
    data: {
        locations: [],
        modalVisible: false,
        selectedLocation: null,
        wikiData: '',
        loading: false,
        errorMessage: null,
    },
    created() {
        this.fetchCountries();
    },
    methods: {
        async fetchCountries() {
            this.loading = true;
            this.errorMessage = null;
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                this.locations = response.data.map(country => ({
                    id: country.cca3,
                    name: country.name.common,
                    coordinates: {
                        latitude: country.latlng[0],
                        longitude: country.latlng[1],
                    },
                }));
            } catch (error) {
                console.error('Erro ao buscar países:', error);
                this.errorMessage = 'Erro ao carregar países. Tente novamente mais tarde.';
            } finally {
                this.loading = false;
            }
        },
        async fetchWikiData(locationName) {
            this.loading = true;
            try {
                const response = await axios.get(`https://pt.wikipedia.org/api/rest_v1/page/summary/${locationName}`);
                this.wikiData = response.data.extract;
            } catch (error) {
                console.error('Erro ao buscar dados da Wikipedia:', error);
                this.wikiData = 'Informações não disponíveis.';
            } finally {
                this.loading = false;
            }
        },
        showModal(location) {
            this.selectedLocation = location;
            this.fetchWikiData(location.name);
            this.modalVisible = true;
        },
        closeModal() {
            this.modalVisible = false;
            this.selectedLocation = null;
            this.wikiData = '';
        },
    },
});
