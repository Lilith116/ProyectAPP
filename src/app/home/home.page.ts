import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from '../services/user.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Docente, Estudiante } from '../models/models';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  userName: string | null = null;
  userRole: 'docente' | 'estudiante' | null = null; // Para almacenar el rol del usuario
  

  constructor(private router: Router,
              private firestoreService:FirestoreService,
              private afAuth: AngularFireAuth,
              private userService: UserService,
              private firestore: AngularFirestore) {}


  ngOnInit() {
  this.afAuth.authState.subscribe(async (user) => {
    if (user?.uid) {
      const uid = user.uid;

      // Buscar en la colección "docentes"
      const docenteDoc = await this.firestore
        .collection<Docente>('docentes')
        .doc(uid)
        .get()
        .toPromise();

      if (docenteDoc?.exists) {
        const docenteData = docenteDoc.data() as Docente;
        this.userName = docenteData.name;
        this.userRole = 'docente';
        return;
      }

      // Buscar en la colección "estudiantes"
      const estudianteDoc = await this.firestore
        .collection<Estudiante>('estudiantes')
        .doc(uid)
        .get()
        .toPromise();

      if (estudianteDoc?.exists) {
        const estudianteData = estudianteDoc.data() as Estudiante;
        this.userName = estudianteData.name;
        this.userRole = 'estudiante';
        return;
      }

      // Si no está en ninguna colección
      this.userName = 'Invitado';
      this.userRole = null;
    } else {
      // Usuario no autenticado
      this.userName = 'Invitado';
      this.userRole = null;
    }
  });
}





  // Método para cerrar sesión
  async logout() {
    await this.afAuth.signOut(); // Cierra sesión en Firebase
    window.location.href = '/home'; // Redirige al login
  }



  navigateTocestudiantes() {
    this.router.navigate(['/cestudiantes']);
  }
  navigateTocdocentes(){
    this.router.navigate(['/cdocentes']);
  }
  navigateToiestudiantes(){
    this.router.navigate(['/iestudiantes']);
  }
  navigateToidocentes(){
    this.router.navigate(['/idocentes']);
  }

}
