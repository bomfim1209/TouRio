import { Component } from '@angular/core';
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  map!: mapboxgl.Map;
  searchQuery: string = ''; // Variável para armazenar o texto digitado
  suggestions: any[] = []; // Lista de sugestões exibidas

  constructor() {}

  ngAfterViewInit() {
    // Defina o token de acesso do Mapbox
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiZ3J1cDQiLCJhIjoiY20zNnJieHJ2MDhiZDJwb201eWhmb2xwbSJ9.UCAN6TTWyWd52cLVHHjLRQ';

    // Inicialize o mapa com as configurações desejadas
    this.map = new mapboxgl.Map({
      container: 'map', // ID do elemento onde o mapa será exibido
      style: 'mapbox://styles/mapbox/streets-v11', // Estilo do mapa
      center: [-43.2535559, -22.8671481], // Coordenadas iniciais [longitude, latitude]
      zoom: 13 // Nível de zoom inicial
    });

    // Adicione controles de navegação ao mapa
    this.map.addControl(new mapboxgl.NavigationControl());
  }

  // Função para buscar sugestões de locais na API do Mapbox
  async fetchSuggestions(query: string): Promise<void> {
    if (!query.trim()) {
      this.suggestions = [];
      return;
    }

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${(mapboxgl as any).accessToken}&autocomplete=true&limit=5`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Erro ao buscar sugestões');
      }

      const data = await response.json();
      this.suggestions = data.features; // Atualiza a lista de sugestões
    } catch (error) {
      console.error('Erro:', error);
      this.suggestions = [];
    }
  }

  // Função para selecionar uma sugestão
  selectSuggestion(suggestion: any): void {
    const [longitude, latitude] = suggestion.geometry.coordinates;

    // Centralize o mapa nas coordenadas retornadas
    this.map.flyTo({
      center: [longitude, latitude],
      zoom: 14
    });

    // Adicione um marcador no local selecionado
    new mapboxgl.Marker()
      .setLngLat([longitude, latitude])
      .addTo(this.map);

    // Limpa as sugestões e o campo de busca
    this.searchQuery = suggestion.place_name;
    this.suggestions = [];
  }

}
