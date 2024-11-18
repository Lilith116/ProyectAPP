import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CdocentesPage } from './cdocentes.page';

describe('CdocentesPage', () => {
  let component: CdocentesPage;
  let fixture: ComponentFixture<CdocentesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CdocentesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
