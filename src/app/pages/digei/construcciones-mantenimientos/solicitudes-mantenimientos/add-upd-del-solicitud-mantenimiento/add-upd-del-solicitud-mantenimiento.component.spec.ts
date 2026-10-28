import { TestBed } from '@angular/core/testing';
import { AddUpdDelSolicitudMantenimientoComponent } from './add-upd-del-solicitud-mantenimiento.component';

describe('AddUpdDelSolicitudMantenimientoComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelSolicitudMantenimientoComponent]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelSolicitudMantenimientoComponent).componentInstance).toBeTruthy();
  });
});
