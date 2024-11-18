import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  
  createDocente(docente: any) {
    return this.firestore.collection('docentes').add(docente);
  }

  createEstudiante(estudiante: any) {
    return this.firestore.collection('estudiantes').add(estudiante);
  }

  // Método para obtener un documento por ID desde cualquier colección
  getDocument(collectionName: string, docId: string) {
    return this.firestore.collection(collectionName).doc(docId).get();
  }


}
