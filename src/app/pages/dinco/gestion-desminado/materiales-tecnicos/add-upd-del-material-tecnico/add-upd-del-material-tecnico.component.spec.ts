import { TestBed } from '@angular/core/testing';
import { AddUpdDelMaterialTecnicoComponent } from './add-upd-del-material-tecnico.component';

describe('AddUpdDelMaterialTecnicoComponent', () => {
  it('should be created', async () => {
    await TestBed.configureTestingModule({ imports: [AddUpdDelMaterialTecnicoComponent] }).compileComponents();
    expect(TestBed.createComponent(AddUpdDelMaterialTecnicoComponent).componentInstance).toBeTruthy();
  });
});
