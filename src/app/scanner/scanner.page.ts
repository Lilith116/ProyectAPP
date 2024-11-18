import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';


@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage {
  imageUrl: string | null = null; // Para mostrar una vista previa de la cámara

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  async openCamera() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      });

      this.imageUrl = image.webPath || null; // Mostrar la imagen capturada
    } catch (error) {
      console.error('Error al abrir la cámara:', error);
    }
  }

  async startScan() {
    try {
      const status = await BarcodeScanner.checkPermission({ force: true });
  
      if (status.granted) {
        BarcodeScanner.hideBackground();
        const result = await BarcodeScanner.startScan();
  
        if (result.hasContent) {
          const qrData = JSON.parse(result.content);
  
          // Registrar al estudiante en la colección del curso
          const studentData = {
            studentId: (await this.afAuth.currentUser)?.uid,
            scannedAt: new Date().toISOString(),
          };
  
          await this.firestore
            .collection('cursos')
            .doc(qrData.courseId)
            .collection('estudiantes')
            .add(studentData);
  
          alert('Te has registrado correctamente en el curso.');
        }
      }
    } catch (error) {
      console.error('Error al escanear:', error);
    }
  }
  
}
