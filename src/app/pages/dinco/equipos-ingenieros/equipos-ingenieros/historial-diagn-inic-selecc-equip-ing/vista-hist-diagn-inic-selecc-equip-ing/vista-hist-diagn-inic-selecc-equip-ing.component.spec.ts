import { TestBed } from '@angular/core/testing';
import { VistaHistDiagnInicSeleccEquipIngComponent } from './vista-hist-diagn-inic-selecc-equip-ing.component';

describe('VistaHistDiagnInicSeleccEquipIngComponent', () => {
  it('should be created', async () => {
    await TestBed.configureTestingModule({ imports: [VistaHistDiagnInicSeleccEquipIngComponent] }).compileComponents();
    expect(TestBed.createComponent(VistaHistDiagnInicSeleccEquipIngComponent).componentInstance).toBeTruthy();
  });
});
