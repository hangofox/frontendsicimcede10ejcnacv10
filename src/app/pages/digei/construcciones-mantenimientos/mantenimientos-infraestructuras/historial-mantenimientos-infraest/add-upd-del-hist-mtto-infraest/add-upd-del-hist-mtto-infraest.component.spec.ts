import { TestBed } from '@angular/core/testing';
import { AddUpdDelHistorialMantenimientoInfraestComponent } from './add-upd-del-hist-mtto-infraest.component';

describe('AddUpdDelHistorialMantenimientoInfraestComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelHistorialMantenimientoInfraestComponent]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelHistorialMantenimientoInfraestComponent).componentInstance).toBeTruthy();
  });
});
