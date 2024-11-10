import { Component } from '@angular/core';
import { Router } from '@angular/router';
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  map!: mapboxgl.Map;

  constructor(private router: Router) {}

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

  redirecionamento(){
    this.router.navigateByUrl('apresentacao')
  }

}
