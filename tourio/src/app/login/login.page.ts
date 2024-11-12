import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  isAuthenticated: boolean = false;

  constructor(private rota: Router,
    private afAuth: AngularFireAuth,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}
  
  async login() {
    const loading = await this.loadingController.create({
    message: 'Carregando...',
    });
    await loading.present();
    try {
    const user = await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
    await loading.dismiss();
    this.isAuthenticated = true;
    this.showToast('ESTAMOS CONECTADOS');
    this.rota.navigateByUrl('/tabs'); //ROTA PARA A TELA
    } catch (error) {
    await loading.dismiss();
    this.showToast('NÃO ESTAMOS CONECTADOS');
    }
  }

  async logout() {
      await this.afAuth.signOut();
      this.isAuthenticated = false;
      this.showToast('DESCONECTADOS COM SUCESSO');
    }
    
    async showToast(message: string) {
      const toast = await this.toastController.create({
      message,
      duration: 2000
      });
      toast.present();
    }
    
    redirecionar_cadastro(){
      this.rota.navigateByUrl('/cadastro');
    }

  ngOnInit() {
  }

}
