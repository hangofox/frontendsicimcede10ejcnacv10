import { TestBed } from '@angular/core/testing';
import { VistaCentroCostoUnidadMilitarComponent } from './vista-centro-costo-unidad-militar.component';

describe('VistaCentroCostoUnidadMilitarComponent', () => {
  it('should be created', async () => {
    await TestBed.configureTestingModule({ imports: [VistaCentroCostoUnidadMilitarComponent] }).compileComponents();
    expect(TestBed.createComponent(VistaCentroCostoUnidadMilitarComponent).componentInstance).toBeTruthy();
  });
});
