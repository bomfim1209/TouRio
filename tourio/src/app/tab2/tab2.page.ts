import { Component } from '@angular/core';
import { MapboxService } from '../services/mapbox.service';
import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  addresses: any[] = []; // Resultados da busca de endereços
  pois: any[] = []; // Estabelecimentos próximos
  searchQuery: string = ''; // Texto do campo de busca
  private searchSubject: Subject<string> = new Subject(); // Subject para armazenar as buscas

  constructor(private mapboxService: MapboxService) {
    // Observa as mudanças de busca e aplica o debounce
    this.searchSubject.pipe(
      debounceTime(1000), // Tempo de espera após o último evento
      switchMap(query => this.mapboxService.fetchRecomendation(query)) // Realiza a busca
    ).subscribe(data => {
      this.addresses = data;
    });
  }

  // Função chamada no evento ionInput
  searchAddress(event: any) {
    const query = event.target.value;
    if (query && query.trim() !== '') {
      this.searchSubject.next(query); // Envia o novo valor para o subject
    } else {
      this.addresses = []; // Limpa os resultados se a busca estiver vazia
    }
  }

  // Seleciona um endereço e busca os estabelecimentos próximos
  async selectAddress(address: any) {
    this.searchQuery = address.fullAddress; // Atualiza o campo de busca com o nome do local selecionado
    this.addresses = []; // Limpa a lista de sugestões
    this.pois = []; // Limpa POIs anteriores

    this.pois = await this.mapboxService.fetchNearbyPOIs(address.coordinates);
  }

  //ATUALIZAR A PAPGINA 
  handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }
}
