import { Component } from '@angular/core';
import { MapboxService } from '../services/mapbox.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  addresses: any[] = []; // Resultados da busca de endereços
  pois: any[] = []; // Estabelecimentos próximos
  searchQuery: string = ''; // Texto do campo de busca

  constructor(private mapboxService: MapboxService) {}

  // Busca endereços baseados no input do usuário
  async searchAddress(event: any) {
    const query = event.target.value;

    if (query && query.trim() !== '') {
      this.addresses = await this.mapboxService.fetchRecomendation(query);
    } else {
      this.addresses = [];
    }
  }

  // Seleciona um endereço e busca os estabelecimentos próximos
  async selectAddress(address: any) {
    this.searchQuery = address.fullAddress; // Atualiza o campo de busca com o nome do local selecionado
    this.addresses = []; // Limpa a lista de sugestões
    this.pois = await this.mapboxService.fetchNearbyPOIs(address.coordinates);
  }
}
