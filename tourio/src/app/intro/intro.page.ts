import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  constructor(private rota:Router) { }

  redirecionar(){
    this.rota.navigateByUrl('/login');
  }

  ngOnInit() {
    // setTimeout(() => {
    //   this.rota.navigateByUrl('login');
    // }, 2500);
  }

}
