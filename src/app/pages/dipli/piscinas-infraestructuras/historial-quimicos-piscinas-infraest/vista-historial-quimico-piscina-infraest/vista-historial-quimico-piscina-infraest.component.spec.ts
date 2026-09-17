import { TestBed } from '@angular/core/testing';
import { VistaHistorialQuimicoPiscinaInfraestComponent } from './vista-historial-quimico-piscina-infraest.component';

describe('VistaHistorialQuimicoPiscinaInfraestComponent', () => {
  it('should be created', async () => {
    await TestBed.configureTestingModule({ imports: [VistaHistorialQuimicoPiscinaInfraestComponent] }).compileComponents();
    expect(TestBed.createComponent(VistaHistorialQuimicoPiscinaInfraestComponent).componentInstance).toBeTruthy();
  });
});
