import { TestBed } from '@angular/core/testing';
import { AddUpdDelUnidadMilitarRealizMttoComponent } from './add-upd-del-unidad-militar-realiz-mtto.component';

describe('AddUpdDelUnidadMilitarRealizMttoComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelUnidadMilitarRealizMttoComponent]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelUnidadMilitarRealizMttoComponent).componentInstance).toBeTruthy();
  });
});
