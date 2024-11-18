import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Docente, Estudiante } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {}

  // Crear usuario en Authentication y Firestore
  createUser(type: 'docente' | 'estudiante', email: string, password: string, name: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
      const uid = userCredential.user?.uid;
  
      if (!uid) throw new Error('No se pudo obtener el UID del usuario');
  
      // Determinar la colección según el tipo de usuario
      const collectionName = type === 'docente' ? 'docentes' : 'estudiantes';
  
      // Guardar los datos adicionales en Firestore
      return this.firestore.collection(collectionName).doc(uid).set({
        email: email,
        name: name,
      });
    });
  }
  
  

  async validateCreatorPermissions(
    creatorUid: string,
    newUserType: 'docente' | 'estudiante'
  ): Promise<void> {
    const creatorRole = await this.getUserRole(creatorUid); // Determina el rol del creador
  
    if (creatorRole !== newUserType) {
      throw new Error(
        `No tienes permisos para crear cuentas de tipo ${newUserType}. Tu rol actual es ${creatorRole}.`
      );
    }
  }

  async getUserRole(uid: string): Promise<'docente' | 'estudiante' | null> {
    const docenteDoc = await this.firestore.collection('docentes').doc(uid).get().toPromise();
    if (docenteDoc?.exists) {
      return 'docente';
    }
  
    const estudianteDoc = await this.firestore.collection('estudiantes').doc(uid).get().toPromise();
    if (estudianteDoc?.exists) {
      return 'estudiante';
    }
  
    return null;
  }
  
  

  resetPassword(email: string): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(email);
  }
  
    // Obtener lista de docentes con IDs
  getDocentes(): Observable<any[]> {
    return this.firestore.collection('docentes').snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          if (a.payload.doc) { // Verificación de existencia
            const data = a.payload.doc.data() as Docente;
            const id = a.payload.doc.id;
            return { id, ...data };
          } else {
            console.error('Documento no válido:', a);
            return null; // Manejo de documentos no válidos
          }
        }).filter((doc) => doc !== null) // Filtra documentos nulos
      )
    );
  }

  // Obtener lista de estudiantes con IDs
  getEstudiantes(): Observable<any[]> {
    return this.firestore.collection('estudiantes').snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          if (a.payload.doc) { // Verificación de existencia
            const data = a.payload.doc.data()as Estudiante;
            const id = a.payload.doc.id;
            return { id, ...data };
          } else {
            console.error('Documento no válido:', a);
            return null; // Manejo de documentos no válidos
          }
        }).filter((doc) => doc !== null) // Filtra documentos nulos
      )
    );
  }


  // Eliminar un docente
  deleteDocente(id: string): Promise<void> {
    return this.firestore.collection('docentes').doc(id).delete();
  }

  // Eliminar un estudiante
  deleteEstudiante(id: string): Promise<void> {
    return this.firestore.collection('estudiantes').doc(id).delete();
  }


  login(email: string, password: string): Promise<{ type: string; data: any }> {
    return this.afAuth.signInWithEmailAndPassword(email, password).then(async (userCredential) => {
      const uid = userCredential.user?.uid;
  
      // Verifica si el usuario es un docente
      const docenteRef = this.firestore.collection('docentes').doc(uid);
      const docenteDoc = await docenteRef.get().toPromise();
  
      if (docenteDoc?.exists) {
        return { type: 'docente', data: docenteDoc.data() };
      }
  
      // Verifica si el usuario es un estudiante
      const estudianteRef = this.firestore.collection('estudiantes').doc(uid);
      const estudianteDoc = await estudianteRef.get().toPromise();
  
      if (estudianteDoc?.exists) {
        return { type: 'estudiante', data: estudianteDoc.data() };
      }
  
      throw new Error('Usuario no encontrado en Firestore.');
    });
  }
  

  async getDocenteById(uid: string): Promise<Docente | null> {
    const doc = await this.firestore.collection('docentes').doc(uid).get().toPromise();
    if (doc && doc.exists) {
      return doc.data() as Docente;
    }
    return null;
  }
  
  async getEstudianteById(uid: string): Promise<Estudiante | null> {
    const doc = await this.firestore.collection('estudiantes').doc(uid).get().toPromise();
    if (doc && doc.exists) {
      return doc.data() as Estudiante;
    }
    return null;
  }

  // Actualizar datos de un usuario
updateUser(uid: string, type: 'docente' | 'estudiante', data: Partial<Docente | Estudiante>): Promise<void> {
  const collectionName = type === 'docente' ? 'docentes' : 'estudiantes';
  return this.firestore.collection(collectionName).doc(uid).update(data);
}





}
