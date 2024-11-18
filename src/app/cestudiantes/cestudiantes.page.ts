import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../services/firestore.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-cestudiantes',
  templateUrl: './cestudiantes.page.html',
  styleUrls: ['./cestudiantes.page.scss'],
})
export class CestudiantesPage implements OnInit {
  estudianteForm : FormGroup;
  constructor(
    private fb: FormBuilder,
    private firestoreService: FirestoreService,
    private router: Router,
    private userService: UserService
  ) { 
    // Inicializar formulario
    this.estudianteForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit() {
  }

  async createEstudiante() {
    if (this.estudianteForm.valid) {
      const { email, password, name } = this.estudianteForm.value;
      try {
        await this.userService.createUser('estudiante', email, password, name);
        alert('Estudiante creado exitosamente');
        this.router.navigate(['/home']);
      } catch (error) {
        console.error('Error al crear estudiante:', error);
        alert('Hubo un error al crear el estudiante.');
      }
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }


  navigateToHome() {
    this.router.navigate(['/home']);
  }

}
