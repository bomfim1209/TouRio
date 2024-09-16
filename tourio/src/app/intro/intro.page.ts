import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  constructor(private rota:Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.rota.navigateByUrl('login');
    }, 2500);
  }

}
