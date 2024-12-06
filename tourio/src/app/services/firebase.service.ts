import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  // Método para fazer login
  async login(email: string, password: string): Promise<any> {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      return userCredential;
    } catch (error) {
      throw error;
    }
  }

  // Método para logout
  async logout(): Promise<void> {
    await this.afAuth.signOut();
  }

  // Método para verificar autenticação
  async isAuthenticated(): Promise<boolean> {
    const user = await this.afAuth.currentUser;
    return !!user;
  }

  // Método para cadastro
  async register(email: string, password: string, displayName: string): Promise<any> {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      console.log(userCredential.user);
  
      // Atualiza o nome de exibição (displayName) do usuário após a criação da conta
      await userCredential.user?.updateProfile({
        displayName: displayName, // Definindo o nome completo do usuário
      });
  
      return userCredential;
    } catch (error) {
      throw error;
    }
  }


  // Novo método para obter o usuário atual
  async getCurrentUser(): Promise<any> {
    const user = await this.afAuth.currentUser;
    if (user) {
      return user; // Retorna o objeto do usuário autenticado
    } else {
      throw new Error('Usuário não autenticado.');
    }
  }

  // Novo método para obter o nome do usuário
  async getUserName(): Promise<string | null> {
    const user = await this.getCurrentUser();
    return user.displayName || null; // Retorna o displayName ou null se não estiver definido
  }
}
