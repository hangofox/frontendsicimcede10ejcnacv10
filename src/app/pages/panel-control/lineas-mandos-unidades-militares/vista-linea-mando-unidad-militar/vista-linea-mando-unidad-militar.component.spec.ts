import { TestBed } from '@angular/core/testing';
import { VistaLineaMandoUnidadMilitarComponent } from './vista-linea-mando-unidad-militar.component';

describe('VistaLineaMandoUnidadMilitarComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaLineaMandoUnidadMilitarComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaLineaMandoUnidadMilitarComponent).componentInstance).toBeTruthy();
  });
});
