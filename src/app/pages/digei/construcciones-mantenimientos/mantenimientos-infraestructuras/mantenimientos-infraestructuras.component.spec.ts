import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MantenimientosInfraestructurasComponent } from './mantenimientos-infraestructuras.component';

describe('MantenimientosInfraestructurasComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [MantenimientosInfraestructurasComponent],
      providers: [provideRouter([])]
    }).compileComponents();
    expect(TestBed.createComponent(MantenimientosInfraestructurasComponent).componentInstance).toBeTruthy();
  });
});
