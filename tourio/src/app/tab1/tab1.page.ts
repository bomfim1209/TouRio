import { Component, AfterViewInit } from '@angular/core';
import { MapboxService } from 'src/app/services/mapbox.service';
import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import mapboxgl from 'mapbox-gl';
import { Router } from '@angular/router';
import { DadosService } from '../services/dados.service';

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
  local: string = '';
  private searchSubject: Subject<string> = new Subject(); // Subject para emitir a busca

  constructor(private mapboxService: MapboxService, private verMaisService: DadosService, private router: Router) {
    // Observa as mudanças de busca e aplica o debounce
    this.searchSubject.pipe(
      debounceTime(1000), // Espera milesegundos após a última entrada
      switchMap(query => this.mapboxService.fetchSuggestions(query)) // Chama o serviço de sugestões
    ).subscribe(data => {
      this.suggestions = data;
    });
  }

  ngAfterViewInit() {
    // Inicializa o mapa chamando o serviço
    this.map = this.mapboxService.initializeMap('map');
  }

  // Função chamada no evento ionInput, que aplica o debounce
  searchAddress(event: any): void {
    const query = event.target.value;

    if (query && query.trim() !== '') {
      this.searchSubject.next(query); // Envia o valor para o subject
    } else {
      this.suggestions = []; // Limpa as sugestões se o campo estiver vazio
    }
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



    // PARAMETROS PARA TESTE, NÃO APAGAR!!!!!
    console.log(this.searchQuery = suggestion.place_name);
    console.log(longitude);
    console.log(latitude);
  }

  //FUNÇÃO DO CARD DE SUGESTÕES
  verMais(card: any) {
    this.verMaisService.setCardSelecionado(card);
    this.router.navigate(['/ver-mais']);
  }
  
  cards = [
    { 
      id: 1,
      longitude: '-43.211146',
      latitude: '-22.952249',
      nome: 'Cristo Redentor', 
      imagem: 'https://archivo.prensa-latina.cu/wp-content/uploads/2021/10/Cristo.jpg', 
      descricao: 'Descrição do Cristo.' 
    },

    { 
      id: 2, 
      longitude: '-43.166874',
      latitude: '-22.955166',
      nome: 'Bondinho do Pão de Açúcar', 
      imagem: 'https://inbec.com.br/storage/2022/03/bondinho-pao-de-acucar-vai-operar-com-energia-renovavel-621e5866cd4b8-1200x630-quadrant(C).jpeg?token=95d8e625acd945261b70fd0b802a6713', 
      descricao: 'Descrição do Pão de Açúcar.' 
    },

    { 
      id: 3, 
      longitude: '-43.179855',
      latitude: '-22.895122',
      nome: 'Museu do Amanhã', 
      imagem: 'https://www.revistamarcozero.com.br/wp-content/uploads/2023/09/Museu-do-Amanh%C3%A3-atinge-a-marca-de-600-mil-visitantes.jpg', 
      descricao: 'Descrição do Museu do Amanhã.' 
    },

    {
      id: 4,
      longitude: '-43.191642',
      latitude: '-22.893024',
      nome: 'AquaRio',
      imagem: 'https://viagemeturismo.abril.com.br/wp-content/uploads/2024/05/aquario-marinho-do-rio-de-janeiro-tancao-tunel-submarino.jpg?crop=1&resize=1212,909',
      descricao: '',
    },

    {
      id: 5,
      longitude: '-43.250219',
      latitude: '-22.972115',
      nome: 'Vista Chinesa',
      imagem: 'https://fuigosteicontei.com.br/wp-content/uploads/2013/04/10932582744_241160dc8d_b.jpg',
      descricao: '',
    },

    {
      id: 6,
      longitude: '-43.228624',
      latitude: '-22.904164',
      nome: 'BioParque',
      imagem: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/25/55/cd/logo-oficial-do-bioparque.jpg?w=1200&h=-1&s=1',
      descricao: '',
    },

    {
      id: 7,
      longitude: '-43.192736',
      latitude: '-22.98792',
      nome: 'Praia do Arpoador',
      imagem: 'https://m.ahstatic.com/is/image/accorhotels/arpoador-conheca-uma-das-regioes-mais-charmosas-do-rio-2024-1:3by2?fmt=jpg&op_usm=1.75,0.3,2,0&resMode=sharp2&iccEmbed=true&icc=sRGB&dpr=on,1&wid=335&hei=223&qlt=80',
      descricao: '',
    },

  ];  
}
