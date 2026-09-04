import { TestBed } from '@angular/core/testing';
import { VistaUnidadMilitarComponent } from './vista-unidad-militar.component';

describe('VistaUnidadMilitarComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaUnidadMilitarComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaUnidadMilitarComponent).componentInstance).toBeTruthy();
  });
});
