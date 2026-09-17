import { TestBed } from '@angular/core/testing';
import { VistaHistorialResponsablesInfraestComponent } from './vista-historial-responsables-infraest.component';

describe('VistaHistorialResponsablesInfraestComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({ imports: [VistaHistorialResponsablesInfraestComponent] }).compileComponents();
    expect(TestBed.createComponent(VistaHistorialResponsablesInfraestComponent).componentInstance).toBeTruthy();
  });
});
