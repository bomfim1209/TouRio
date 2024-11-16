import { Component, AfterViewInit } from '@angular/core';
import { MapboxService } from 'src/app/services/mapbox.service';
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements AfterViewInit {

  map!: mapboxgl.Map;  // Define corretamente o tipo do mapa
  searchQuery: string = ''; // Variável para armazenar o texto digitado
  suggestions: any[] = []; // Lista de sugestões exibidas
  activeMarker: mapboxgl.Marker | null = null; // Variável para armazenar o marcador ativo

  constructor(private mapboxService: MapboxService) {}

  ngAfterViewInit() {
    // Inicializa o mapa chamando o serviço
    this.map = this.mapboxService.initializeMap('map');
  }

  // Função para buscar sugestões de locais, chamando o serviço
  async fetchSuggestions(query: string): Promise<void> {
    this.suggestions = await this.mapboxService.fetchSuggestions(query);
  }

  // Função para selecionar uma sugestão
  selectSuggestion(suggestion: any): void {
    const [longitude, latitude] = suggestion.geometry.coordinates;

    // Verifique se o mapa foi inicializado corretamente
    if (!this.map) {
      console.error("Mapa não inicializado.");
      return;
    }

    // Centralize o mapa nas coordenadas retornadas
    this.map.flyTo({
      center: [longitude, latitude],
      zoom: 14
    });

    // Remova o marcador ativo, se existir
    if (this.activeMarker) {
      this.activeMarker.remove();
    }

    // Adicione um novo marcador no local selecionado
    this.activeMarker = new mapboxgl.Marker()
      .setLngLat([longitude, latitude])
      .addTo(this.map); // Certifique-se de que o mapa é válido

    // Limpa as sugestões e o campo de busca
    this.searchQuery = suggestion.place_name;
    this.suggestions = [];
  }
}
