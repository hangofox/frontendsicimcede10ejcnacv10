import { TestBed } from '@angular/core/testing';
import { VistaSolicitudMantenimientoComponent } from './vista-solicitud-mantenimiento.component';

describe('VistaSolicitudMantenimientoComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaSolicitudMantenimientoComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaSolicitudMantenimientoComponent).componentInstance).toBeTruthy();
  });
});
