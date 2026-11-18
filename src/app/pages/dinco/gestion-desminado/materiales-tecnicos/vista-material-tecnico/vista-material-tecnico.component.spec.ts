import { TestBed } from '@angular/core/testing';
import { VistaMaterialTecnicoComponent } from './vista-material-tecnico.component';

describe('VistaMaterialTecnicoComponent', () => {
  it('should be created', async () => {
    await TestBed.configureTestingModule({ imports: [VistaMaterialTecnicoComponent] }).compileComponents();
    expect(TestBed.createComponent(VistaMaterialTecnicoComponent).componentInstance).toBeTruthy();
  });
});
