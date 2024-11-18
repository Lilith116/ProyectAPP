import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IestudiantesPage } from './iestudiantes.page';

describe('IestudiantesPage', () => {
  let component: IestudiantesPage;
  let fixture: ComponentFixture<IestudiantesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IestudiantesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
