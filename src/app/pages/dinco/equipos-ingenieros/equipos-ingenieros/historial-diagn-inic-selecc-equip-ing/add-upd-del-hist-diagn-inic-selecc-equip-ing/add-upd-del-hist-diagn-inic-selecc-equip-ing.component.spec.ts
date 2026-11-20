import { TestBed } from '@angular/core/testing';
import { AddUpdDelHistDiagnInicSeleccEquipIngComponent } from './add-upd-del-hist-diagn-inic-selecc-equip-ing.component';

describe('AddUpdDelHistDiagnInicSeleccEquipIngComponent', () => {
  it('should be created', async () => {
    await TestBed.configureTestingModule({ imports: [AddUpdDelHistDiagnInicSeleccEquipIngComponent] }).compileComponents();
    expect(TestBed.createComponent(AddUpdDelHistDiagnInicSeleccEquipIngComponent).componentInstance).toBeTruthy();
  });
});
