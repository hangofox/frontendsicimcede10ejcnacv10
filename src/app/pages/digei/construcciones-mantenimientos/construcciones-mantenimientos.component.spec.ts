import { TestBed } from '@angular/core/testing';
import { ConstruccionesMantenimientosComponent } from './construcciones-mantenimientos.component';

describe('ConstruccionesMantenimientosComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({ imports: [ConstruccionesMantenimientosComponent] }).compileComponents();
    expect(TestBed.createComponent(ConstruccionesMantenimientosComponent).componentInstance).toBeTruthy();
  });
});
