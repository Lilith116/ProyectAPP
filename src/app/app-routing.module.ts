import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
//import { AjustesComponent } from './backend/ajustes/ajustes.component';
import { RegisterComponent } from './backend/ajustes/ajustes.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'cestudiantes',
    loadChildren: () => import('./cestudiantes/cestudiantes.module').then( m => m.CestudiantesPageModule),
    
  },
  {
    path: 'iestudiantes',
    loadChildren: () => import('./iestudiantes/iestudiantes.module').then( m => m.IestudiantesPageModule)
  },
  {
    path: 'cdocentes',
    loadChildren: () => import('./cdocentes/cdocentes.module').then( m => m.CdocentesPageModule),
    canActivate: [AuthGuard],
    data: { role: 'docente' },
  },
  {
    path: 'idocentes',
    loadChildren: () => import('./idocentes/idocentes.module').then( m => m.IdocentesPageModule)
    
  },
  {
    path: 'restorepassword',
    loadChildren: () => import('./restorepassword/restorepassword.module').then( m => m.RestorepasswordPageModule)
  },
  {
    path: 'ajustes',
    component: RegisterComponent,//AjustesComponent,
    canActivate: [AuthGuard],
    data: { role: 'docente' },
  },
  {
    path: 'unauthorized',
    loadChildren: () =>
      import('./unauthorized/unauthorized.module').then(
        (m) => m.UnauthorizedPageModule
      ),

  },
  {
    path: 'scanner',
    loadChildren: () => import('./scanner/scanner.module').then( m => m.ScannerPageModule),
    canActivate: [AuthGuard],
    data: { role: 'estudiante' },
  },
  {
    path: 'crear-qr',
    loadChildren: () =>
      import('./crear-qr/crear-qr.module').then((m) => m.CrearQrPageModule),
    canActivate: [AuthGuard], // Solo accesible para docentes
    data: { role: 'docente' },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
