import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-iestudiantes',
  templateUrl: './iestudiantes.page.html',
  styleUrls: ['./iestudiantes.page.scss'],
})
export class IestudiantesPage implements OnInit {

  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }
  navigateTorestorepassword(){
    this.router.navigate(['/restorepassword']);
  }

  async login() {
    try {
      const result = await this.userService.login(this.email, this.password);
  
      if (result.type === 'docente') {
        // Redirigir al Home para docentes
        this.router.navigate(['/home']);
      } else if (result.type === 'estudiante') {
        // Redirigir al Home para estudiantes
        this.router.navigate(['/home']);
      }
    } catch (error: any) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: error?.message || 'No se pudo iniciar sesión. Por favor, intenta nuevamente.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }



}
