import { TestBed } from '@angular/core/testing';
import { VistaHistorialIntegranteSolicInfraestComponent } from './vista-hist-integ-solic-inf.component';

describe('VistaHistorialIntegranteSolicInfraestComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaHistorialIntegranteSolicInfraestComponent]
    }).compileComponents();

    expect(TestBed.createComponent(VistaHistorialIntegranteSolicInfraestComponent).componentInstance).toBeTruthy();
  });
});
