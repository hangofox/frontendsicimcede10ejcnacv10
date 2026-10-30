import { TestBed } from '@angular/core/testing';
import { AddUpdDelSolicitudObraNuevaSaneamientoBasicoComponent } from './add-upd-del-solicitud-obra-nueva-san-bas.component';

describe('AddUpdDelSolicitudObraNuevaSaneamientoBasicoComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelSolicitudObraNuevaSaneamientoBasicoComponent]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelSolicitudObraNuevaSaneamientoBasicoComponent).componentInstance).toBeTruthy();
  });
});
