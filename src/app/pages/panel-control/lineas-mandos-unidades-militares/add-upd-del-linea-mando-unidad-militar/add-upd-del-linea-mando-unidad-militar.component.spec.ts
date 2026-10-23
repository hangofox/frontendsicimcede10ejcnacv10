import { TestBed } from '@angular/core/testing';
import { AddUpdDelLineaMandoUnidadMilitarComponent } from './add-upd-del-linea-mando-unidad-militar.component';

describe('AddUpdDelLineaMandoUnidadMilitarComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelLineaMandoUnidadMilitarComponent]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelLineaMandoUnidadMilitarComponent).componentInstance).toBeTruthy();
  });
});
