import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestorepasswordPage } from './restorepassword.page';

describe('RestorepasswordPage', () => {
  let component: RestorepasswordPage;
  let fixture: ComponentFixture<RestorepasswordPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RestorepasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
