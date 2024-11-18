import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-restorepassword',
  templateUrl: './restorepassword.page.html',
  styleUrls: ['./restorepassword.page.scss'],
})
export class RestorepasswordPage implements OnInit {
  email: string= '';

  constructor(
    private userService: UserService,
    private alertController: AlertController,
    private router: Router
  ) { }

  async sendResetEmail() {
    if (!this.email) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, ingresa un correo válido.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    try {
      // Llamar a la función resetPassword del servicio
      await this.userService.resetPassword(this.email);
      const successAlert = await this.alertController.create({
        header: 'Éxito',
        message: 'Se ha enviado un correo para restablecer tu contraseña. Revisa tu bandeja de entrada.',
        buttons: ['OK'],
      });
      await successAlert.present();
    } catch (error) {
      let errorMessage = 'No se pudo enviar el correo. Por favor, intenta nuevamente.';
    
      // Verificar si el error tiene la propiedad "message"
      if (error instanceof Error) {
        errorMessage = error.message;
      }
    
      const errorAlert = await this.alertController.create({
        header: 'Error',
        message: errorMessage,
        buttons: ['OK'],
      });
      await errorAlert.present();
    }
  }
    

  ngOnInit() {
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

}
