import { TestBed } from '@angular/core/testing';
import { VistaSociedadUnidadCentralizadoraComponent } from './vista-sociedad-unidad-centralizadora.component';

describe('VistaSociedadUnidadCentralizadoraComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaSociedadUnidadCentralizadoraComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaSociedadUnidadCentralizadoraComponent).componentInstance).toBeTruthy();
  });
});
