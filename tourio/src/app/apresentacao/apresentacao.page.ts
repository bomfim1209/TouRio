import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apresentacao',
  templateUrl: './apresentacao.page.html',
  styleUrls: ['./apresentacao.page.scss'],
})
export class ApresentacaoPage implements OnInit {

  presentingElement : any = "";

  constructor() { }

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
  }

}
