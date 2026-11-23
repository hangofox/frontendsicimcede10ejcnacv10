import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ListadoHistDemerDesgastEquipIngComponent } from './listado-hist-demer-desgast-equip-ing.component';

describe('ListadoHistDemerDesgastEquipIngComponent', () => {
  it('should be created', async () => {
    await TestBed.configureTestingModule({ imports: [ListadoHistDemerDesgastEquipIngComponent], providers: [provideHttpClient(), provideHttpClientTesting()] }).compileComponents();
    expect(TestBed.createComponent(ListadoHistDemerDesgastEquipIngComponent).componentInstance).toBeTruthy();
  });
});
