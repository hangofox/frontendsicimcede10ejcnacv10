import { TestBed } from '@angular/core/testing';
import { AddUpdDelCentroCostoUnidadMilitarComponent } from './add-upd-del-centro-costo-unidad-militar.component';

describe('AddUpdDelCentroCostoUnidadMilitarComponent', () => {
  it('should be created', async () => {
    await TestBed.configureTestingModule({ imports: [AddUpdDelCentroCostoUnidadMilitarComponent] }).compileComponents();
    expect(TestBed.createComponent(AddUpdDelCentroCostoUnidadMilitarComponent).componentInstance).toBeTruthy();
  });
});
