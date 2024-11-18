import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../services/firestore.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-cdocentes',
  templateUrl: './cdocentes.page.html',
  styleUrls: ['./cdocentes.page.scss'],
})
export class CdocentesPage implements OnInit {
  docenteForm : FormGroup;
  

  constructor(
    private fb: FormBuilder,
    private firestoreService: FirestoreService,
    private router: Router,
    private userService: UserService,
  ) { // Inicializar formulario
    this.docenteForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
    });}

  ngOnInit() {
    
  }

  // Método para crear un docente
  async createDocente() {
    if (this.docenteForm.valid) {
      const { email, password, name } = this.docenteForm.value;
      try {
        await this.userService.createUser('docente', email, password, name);
        alert('Docente creado exitosamente');
        this.router.navigate(['/home']);
      } catch (error) {
        console.error('Error al crear docente:', error);
        alert('Hubo un error al crear el docente.');
      }
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  



}
