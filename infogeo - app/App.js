import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

const InfoGeo = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [wikiData, setWikiData] = useState('');
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const GEONAMES_USERNAME = 'seu_usuario_geonames'; // Substitua pelo seu nome de usuário da GeoNames

  // Função para buscar países da API REST Countries
  const fetchCountries = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      const countries = response.data.map((country) => ({
        id: country.cca3,
        name: country.name.common,
        coordinates: {
          latitude: country.latlng[0],
          longitude: country.latlng[1],
        },
      }));
      setLocations(countries);
    } catch (error) {
      console.error('Erro ao buscar países:', error);
      setErrorMessage('Erro ao carregar países. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar estados de um país via GeoNames
  const fetchStates = async (countryCode) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://api.geonames.org/childrenJSON?geonameId=${countryCode}&username=${GEONAMES_USERNAME}`);
      const fetchedStates = response.data.geonames.map((state) => ({
        id: state.geonameId,
        name: state.name,
        coordinates: {
          latitude: state.lat,
          longitude: state.lng,
        },
      }));
      setStates(fetchedStates);
    } catch (error) {
      console.error('Erro ao buscar estados:', error);
      setErrorMessage('Erro ao carregar estados. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar cidades de um estado via GeoNames
  const fetchCities = async (stateId) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://api.geonames.org/childrenJSON?geonameId=${stateId}&username=${GEONAMES_USERNAME}`);
      const fetchedCities = response.data.geonames.map((city) => ({
        id: city.geonameId,
        name: city.name,
        coordinates: {
          latitude: city.lat,
          longitude: city.lng,
        },
      }));
      setCities(fetchedCities);
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
      setErrorMessage('Erro ao carregar cidades. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar informações da Wikipedia em português
  const fetchWikiData = async (locationName) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://pt.wikipedia.org/api/rest_v1/page/summary/${locationName}`);
      setWikiData(response.data.extract);
    } catch (error) {
      console.error('Erro ao buscar dados da Wikipedia:', error);
      setWikiData('Informações não disponíveis.');
    } finally {
      setLoading(false);
    }
  };

  // Quando um marcador é clicado, busca informações da Wikipedia
  const handleMarkerPress = (location, type) => {
    setSelectedLocation(location);

    if (type === 'country') {
      fetchStates(location.id);
    } else if (type === 'state') {
      fetchCities(location.id);
    }

    fetchWikiData(location.name);
    setModalVisible(true);
  };

  // UseEffect para buscar países ao carregar o app
  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : errorMessage ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 0,
            longitude: 0,
            latitudeDelta: 100,
            longitudeDelta: 100,
          }}
        >
          {locations.map((location) => (
            <Marker
              key={location.id}
              coordinate={location.coordinates}
              title={location.name}
              onPress={() => handleMarkerPress(location, 'country')}
            />
          ))}
          {states.map((state) => (
            <Marker
              key={state.id}
              coordinate={state.coordinates}
              title={state.name}
              onPress={() => handleMarkerPress(state, 'state')}
            />
          ))}
          {cities.map((city) => (
            <Marker
              key={city.id}
              coordinate={city.coordinates}
              title={city.name}
              onPress={() => handleMarkerPress(city, 'city')}
            />
          ))}
        </MapView>
      )}

      {selectedLocation && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>{selectedLocation.name}</Text>
              {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <Text style={styles.modalText}>{wikiData}</Text>
              )}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default InfoGeo;
