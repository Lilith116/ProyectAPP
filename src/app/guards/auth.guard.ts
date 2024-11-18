import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const requiredRole = route.data['role'];
  
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (!user) {
          this.router.navigate(['/home']);
          return of(false);
        }
  
        const uid = user.uid;
  
        // Verificar en la colección "docentes"
        return this.firestore
          .collection('docentes')
          .doc(uid)
          .get()
          .pipe(
            switchMap((docenteDoc) => {
              if (docenteDoc.exists) {
                const docenteData = docenteDoc.data() as any;
                if (requiredRole === 'docente') return of(true);
              }
  
              // Verificar en la colección "estudiantes"
              return this.firestore
                .collection('estudiantes')
                .doc(uid)
                .get()
                .pipe(
                  map((estudianteDoc) => {
                    if (estudianteDoc.exists) {
                      const estudianteData = estudianteDoc.data() as any;
                      if (requiredRole === 'estudiante') return true;
                    }
  
                    // Redirige si no cumple el rol
                    this.router.navigate(['/home']);
                    return false;
                  })
                );
            })
          );
      })
    );
  }
}  
