import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdocentesPage } from './idocentes.page';

describe('IdocentesPage', () => {
  let component: IdocentesPage;
  let fixture: ComponentFixture<IdocentesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IdocentesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
