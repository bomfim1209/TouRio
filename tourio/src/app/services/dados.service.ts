import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DadosService {

  private cardSelecionado: any;

  constructor() {}

  setCardSelecionado(card: any) {
    this.cardSelecionado = card;
  }

  getCardSelecionado() {
    return this.cardSelecionado;
  }
}