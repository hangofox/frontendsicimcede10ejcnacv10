import { TestBed } from '@angular/core/testing';
import { AddUpdDelHistorialQuimicoPiscinaInfraestComponent } from './add-upd-del-historial-quimico-piscina-infraest.component';

describe('AddUpdDelHistorialQuimicoPiscinaInfraestComponent', () => {
  it('should be created', async () => {
    await TestBed.configureTestingModule({ imports: [AddUpdDelHistorialQuimicoPiscinaInfraestComponent] }).compileComponents();
    expect(TestBed.createComponent(AddUpdDelHistorialQuimicoPiscinaInfraestComponent).componentInstance).toBeTruthy();
  });
});
