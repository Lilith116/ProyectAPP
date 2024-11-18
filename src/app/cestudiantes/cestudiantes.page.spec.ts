import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CestudiantesPage } from './cestudiantes.page';

describe('CestudiantesPage', () => {
  let component: CestudiantesPage;
  let fixture: ComponentFixture<CestudiantesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CestudiantesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
