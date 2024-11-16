import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  fullName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {}

  async register() {
    // Verifica se as senhas coincidem
    if (this.password !== this.confirmPassword) {
      this.showToast('As senhas não coincidem.');
      return;
    }

    // Verifica se os campos estão preenchidos
    if (!this.email || !this.password || !this.confirmPassword) {
      this.showToast('Por favor, preencha todos os campos.');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Registrando...',
    });
    await loading.present();

    try {
      // Chama o método de registro no serviço
      await this.authService.register(this.email, this.password);
      await loading.dismiss();

      // Exibe uma mensagem de sucesso e redireciona para a página de login
      this.showToast('Cadastro realizado com sucesso!');
      this.router.navigateByUrl('/login');
    } catch (error: any) {
      await loading.dismiss();

      // Tratamento de erros específicos do Firebase
      let errorMsg = 'Falha ao realizar o cadastro.';
      if (error.code === 'auth/email-already-in-use') {
        errorMsg = 'Email já está em uso.';
      } else if (error.code === 'auth/invalid-email') {
        errorMsg = 'Email inválido.';
      } else if (error.code === 'auth/weak-password') {
        errorMsg = 'Senha muito fraca.';
      }

      this.showToast(errorMsg);
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }
}
