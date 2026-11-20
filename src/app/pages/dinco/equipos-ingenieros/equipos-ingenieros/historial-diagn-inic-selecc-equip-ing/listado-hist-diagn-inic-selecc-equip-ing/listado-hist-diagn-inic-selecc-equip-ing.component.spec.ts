import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ListadoHistDiagnInicSeleccEquipIngComponent } from './listado-hist-diagn-inic-selecc-equip-ing.component';

describe('ListadoHistDiagnInicSeleccEquipIngComponent', () => {
  it('should be created', async () => {
    await TestBed.configureTestingModule({ imports: [ListadoHistDiagnInicSeleccEquipIngComponent], providers: [provideHttpClient(), provideHttpClientTesting()] }).compileComponents();
    expect(TestBed.createComponent(ListadoHistDiagnInicSeleccEquipIngComponent).componentInstance).toBeTruthy();
  });
});
