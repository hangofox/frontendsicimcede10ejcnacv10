import { TestBed } from '@angular/core/testing';
import { VistaUnidadMilitarRealizMttoComponent } from './vista-unidad-militar-realiz-mtto.component';

describe('VistaUnidadMilitarRealizMttoComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaUnidadMilitarRealizMttoComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaUnidadMilitarRealizMttoComponent).componentInstance).toBeTruthy();
  });
});
