import { Injectable } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapboxService {

  constructor() {}

  // Inicializa o mapa
  initializeMap(containerId: string): mapboxgl.Map {
    (mapboxgl as any).accessToken = environment.mapboxToken;

    const map = new mapboxgl.Map({
      container: containerId, // ID do elemento onde o mapa será exibido
      style: 'mapbox://styles/grup4/cm3j3rsyk00bv01r27hl7hosx', // Estilo do mapa
      center: [-43.2535559, -22.8671481], // Coordenadas iniciais [longitude, latitude]
      zoom: 13 // Nível de zoom inicial
    });

    map.addControl(new mapboxgl.NavigationControl()); // Adiciona controles de navegação
    return map;
  }

  // Função para buscar sugestões de locais na API TAB1
  async fetchSuggestions(query: string): Promise<any[]> {
    if (!query.trim()) {
      return [];
    }

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${environment.mapboxToken}&autocomplete=true&limit=5`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Erro ao buscar sugestões');
      }
      const data = await response.json();
      return data.features;
    } catch (error) {
      console.error('Erro:', error);
      return [];
    }
  }


  // Busca sugestões de endereços TAB 2
  async fetchRecomendation(query: string): Promise<any[]> {
    if (!query.trim()) {
      return [];
    }

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${environment.mapboxToken}&country=BR&autocomplete=true&limit=5`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Erro ao buscar sugestões');
      }
      const data = await response.json();
      return data.features.map((feature: any) => ({
        name: feature.text,
        fullAddress: feature.place_name,
        coordinates: feature.geometry.coordinates, // [longitude, latitude]
      }));
    } catch (error) {
      console.error('Erro ao buscar sugestões:', error);
      return [];
    }
  }

  // Busca estabelecimentos próximos (POIs) em um raio de 1.5km
  async fetchNearbyPOIs(coordinates: [number, number]): Promise<any[]> {
    const [longitude, latitude] = coordinates;

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/poi.json?access_token=${environment.mapboxToken}&proximity=${longitude},${latitude}&limit=10&types=poi&radius=1500`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Erro ao buscar POIs');
      }
      const data = await response.json();
      return data.features.map((feature: any) => ({
        name: feature.text,
        type: feature.properties.category || 'Indefinido',
        address: feature.place_name,
        description: feature.properties.description || 'Sem descrição',
        coordinates: feature.geometry.coordinates,
      }));
    } catch (error) {
      console.error('Erro ao buscar POIs:', error);
      return [];
    }
  }
}
