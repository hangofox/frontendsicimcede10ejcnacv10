import { TestBed } from '@angular/core/testing';
import { VistaHistorialIntegranteSolicConstNuevComponent } from './vista-hist-integ-solic-const-nuev.component';

describe('VistaHistorialIntegranteSolicConstNuevComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaHistorialIntegranteSolicConstNuevComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaHistorialIntegranteSolicConstNuevComponent).componentInstance).toBeTruthy();
  });
});
