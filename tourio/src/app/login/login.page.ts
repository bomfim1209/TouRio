import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
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

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  async login() {
    const loading = await this.loadingController.create({
      message: 'Carregando...',
    });
    await loading.present();

    try {
      const user = await this.authService.login(this.email, this.password);
      await loading.dismiss();

      this.isAuthenticated = true;
      this.showToast('ESTAMOS CONECTADOS');
      this.router.navigateByUrl('/tabs'); // Rota para a próxima página
    } catch (error) {
      await loading.dismiss();
      this.showToast('NÃO ESTAMOS CONECTADOS');
      console.error(error);
    }
  }

  async logout() {
    try {
      await this.authService.logout();
      this.isAuthenticated = false;
      this.showToast('DESCONECTADOS COM SUCESSO');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }

  redirecionar_cadastro() {
    this.router.navigateByUrl('/cadastro');
  }

  async ngOnInit() {
    this.isAuthenticated = await this.authService.isAuthenticated();
  }
}
