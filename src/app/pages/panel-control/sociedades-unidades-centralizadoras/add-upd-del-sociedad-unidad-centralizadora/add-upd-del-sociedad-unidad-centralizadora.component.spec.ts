import { TestBed } from '@angular/core/testing';
import { AddUpdDelSociedadUnidadCentralizadoraComponent } from './add-upd-del-sociedad-unidad-centralizadora.component';

describe('AddUpdDelSociedadUnidadCentralizadoraComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelSociedadUnidadCentralizadoraComponent]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelSociedadUnidadCentralizadoraComponent).componentInstance).toBeTruthy();
  });
});
