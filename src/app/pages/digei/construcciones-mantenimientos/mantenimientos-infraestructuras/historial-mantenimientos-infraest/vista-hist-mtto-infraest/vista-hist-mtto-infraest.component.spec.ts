import { TestBed } from '@angular/core/testing';
import { VistaHistorialMantenimientoInfraestComponent } from './vista-hist-mtto-infraest.component';

describe('VistaHistorialMantenimientoInfraestComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaHistorialMantenimientoInfraestComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaHistorialMantenimientoInfraestComponent).componentInstance).toBeTruthy();
  });
});
