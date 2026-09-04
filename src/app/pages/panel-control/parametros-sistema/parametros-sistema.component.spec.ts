import { TestBed } from '@angular/core/testing';
import { ParametrosSistemaComponent } from './parametros-sistema.component';

describe('ParametrosSistemaComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ParametrosSistemaComponent]
    }).compileComponents();

    expect(TestBed.createComponent(ParametrosSistemaComponent).componentInstance).toBeTruthy();
  });
});
