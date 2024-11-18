/* import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.scss'],
})
export class AjustesComponent  implements OnInit {
  docenteForm: FormGroup;
  estudianteForm: FormGroup;

  constructor(private firestoreService: FirestoreService,
                      private fb: FormBuilder,
  ) { 
    this.docenteForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
    

    this.estudianteForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit() {}


  crearDocente() {
    if (this.docenteForm.valid) {
      this.firestoreService.createDocente(this.docenteForm.value).then(() => {
        alert('Docente creado exitosamente');
        this.docenteForm.reset();
      }).catch(error => {
        console.error('Error al crear docente:', error);
      });
    }
  }

  crearEstudiante() {
    if (this.estudianteForm.valid) {
      this.firestoreService.createEstudiante(this.estudianteForm.value).then(() => {
        alert('Estudiante creado exitosamente');
        this.estudianteForm.reset();
      }).catch(error => {
        console.error('Error al crear estudiante:', error);
      });
    }
  }






}
*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.scss'],
})
export class RegisterComponent implements OnInit{
  registerForm: FormGroup;
  resetForm: FormGroup;
  docentes: any[] = [];
  estudiantes: any[] = [];
  currentView: 'docentes' | 'estudiantes' = 'docentes';
  isEditMode: boolean = false;
  currentUserId: string | null=null;

  constructor(private fb: FormBuilder,
               private userService: UserService) {
    this.resetForm = this.fb.group({
      email:['',[Validators.required, Validators.email]],
    });
     
    // Inicializa el formulario, incluyendo el control para userType
    this.registerForm = this.fb.group({
      userType: ['docente', Validators.required], // Control reactivo para el tipo de usuario
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.loadDocentes();
  }
  
  loadDocentes() {
    this.userService.getDocentes().subscribe((docentes) => {
      this.docentes = docentes; // Carga la lista de docentes
    });
    this.currentView = 'docentes'; // Cambia la vista actual
  }
  
  loadEstudiantes() {
    this.userService.getEstudiantes().subscribe((estudiantes) => {
      this.estudiantes = estudiantes; // Carga la lista de estudiantes
    });
    this.currentView = 'estudiantes'; // Cambia la vista actual
  }


  // Método para registrar al usuario
  register() {
    if (this.registerForm.valid) {
      const { userType, email, password, name } = this.registerForm.value;
  
      if (this.isEditMode && this.currentUserId) {
        // Actualizar usuario existente
        const updateData = { email, name }; // Solo los campos a actualizar
        this.userService
          .updateUser(this.currentUserId, userType, updateData)
          .then(() => {
            alert(`${userType.charAt(0).toUpperCase() + userType.slice(1)} actualizado exitosamente`);
            this.resetFormState();
            if (userType === 'docente') this.loadDocentes();
            else this.loadEstudiantes();
          })
          .catch((error) => {
            console.error('Error al actualizar usuario:', error);
            alert('Error: ' + error.message);
          });
      } else {
        // Registrar nuevo usuario
        this.userService
          .createUser(userType, email, password, name)
          .then(() => {
            alert(`${userType.charAt(0).toUpperCase() + userType.slice(1)} creado exitosamente`);
            this.resetFormState();
            if (userType === 'docente') this.loadDocentes();
            else this.loadEstudiantes();
          })
          .catch((error) => {
            console.error('Error al crear usuario:', error);
            alert('Error: ' + error.message);
          });
      }
    }
  }

  editUser(user: any) {
    this.isEditMode = true;
    this.currentUserId = user.id; // Asume que cada usuario tiene un campo `id`
    this.registerForm.patchValue({
      userType: this.currentView, // Define el tipo de usuario (docente/estudiante)
      email: user.email,
      name: user.name,
      password: '', // No editamos la contraseña
    });
  }

  saveUser() {
    if (this.registerForm.valid) {
      const { userType, email, password, name } = this.registerForm.value;
  
      if (this.isEditMode && this.currentUserId) {
        const updateData = { email, name }; // Solo los campos a actualizar
        this.userService
          .updateUser(this.currentUserId, userType, updateData)
          .then(() => {
            alert(`${userType.charAt(0).toUpperCase() + userType.slice(1)} actualizado exitosamente`);
            this.resetFormState();
            if (userType === 'docente') this.loadDocentes();
            else this.loadEstudiantes();
          })
          .catch((error) => {
            console.error('Error al actualizar usuario:', error);
            alert('Error: ' + error.message);
          });
      } else {
        this.userService
          .createUser(userType, email, password, name)
          .then(() => {
            alert(`${userType.charAt(0).toUpperCase() + userType.slice(1)} creado exitosamente`);
            this.resetFormState();
            if (userType === 'docente') this.loadDocentes();
            else this.loadEstudiantes();
          })
          .catch((error) => {
            console.error('Error al crear usuario:', error);
            alert('Error: ' + error.message);
          });
      }
    }
  }
  
  
   // Método para resetear el formulario y el estado
   resetFormState() {
    this.isEditMode = false;
    this.currentUserId = null;
    this.registerForm.reset({ userType: 'docente' });
  }

  resetPassword() {
    const email = this.resetForm.get('email')?.value; // Asegúrate de obtener el valor del formulario
    if (email) {
      this.userService.resetPassword(email).then(() => {
        alert('Correo de restablecimiento enviado. Por favor, revisa tu bandeja de entrada.');
      }).catch((error: any) => {
        console.error('Error al enviar el correo de restablecimiento:', error);
        alert('Error: ' + error.message);
      });
    }
  }

  

  
  

  // Eliminar un docente
  removeDocente(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este docente?')) {
      this.userService.deleteDocente(id).then(() => {
        alert('Docente eliminado exitosamente');
        this.loadDocentes();
      }).catch((error) => {
        console.error('Error al eliminar docente:', error);
        alert('Error: ' + error.message);
      });
    }
  }

  // Eliminar un estudiante
  removeEstudiante(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este estudiante?')) {
      this.userService.deleteEstudiante(id).then(() => {
        alert('Estudiante eliminado exitosamente');
        this.loadEstudiantes();
      }).catch((error) => {
        console.error('Error al eliminar estudiante:', error);
        alert('Error: ' + error.message);
      });
    }
  }
  








}



  




