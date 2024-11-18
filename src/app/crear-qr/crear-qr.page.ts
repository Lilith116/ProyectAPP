import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as QRCode from 'qrcode';


@Component({
  selector: 'app-crear-qr',
  templateUrl: './crear-qr.page.html',
  styleUrls: ['./crear-qr.page.scss'],
})
export class CrearQrPage {
  qrForm: FormGroup;
  qrCodeData: string = '';
  qrCodeUrl: string | null = null;

  constructor(private fb: FormBuilder, private firestore: AngularFirestore) {
    this.qrForm = this.fb.group({
      courseName: ['', [Validators.required, Validators.minLength(3)]],
      section: ['', [Validators.required]],
    });
  }

  async generateQRCode() {
    if (this.qrForm.valid) {
      const { courseName, section } = this.qrForm.value;

      // Crear los datos para el QR
      const qrData = {
        courseName,
        section,
        timestamp: new Date().toISOString(),
      };

      // Guardar en Firestore (colección "cursos")
      const courseRef = await this.firestore.collection('cursos').add(qrData);

      // Generar el QR con la referencia del curso
      this.qrCodeData = JSON.stringify({
        courseId: courseRef.id,
        courseName,
        section,
      });

      // Generar la imagen del QR
      this.qrCodeUrl = await QRCode.toDataURL(this.qrCodeData);
    } else {
      console.error('Formulario inválido');
    }
  }
}
