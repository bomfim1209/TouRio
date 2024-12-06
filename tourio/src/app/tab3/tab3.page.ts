import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/firebase.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  isAuthenticated: boolean = false;
  userName: string | null = null;
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
  ) {}


  async logout() {
    try {
      await this.authService.logout();
      this.isAuthenticated = false;
      this.router.navigateByUrl('/login');
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

  async ngOnInit() {
    this.isAuthenticated = await this.authService.isAuthenticated();
    if (!this.isAuthenticated) {
      await this.loadUserName();
    }
  }

  private async loadUserName() {
    try {
      const user = await this.authService.getCurrentUser(); // Recupera o usuário atual
      this.userName = user?.displayName || 'Usuário'; // Define o nome ou usa "Usuário" como padrão
      console.log(this.userName);
      
    } catch (error) {
      console.error('Erro ao carregar o nome do usuário:', error);
      this.userName = null;
    }
  }
}
