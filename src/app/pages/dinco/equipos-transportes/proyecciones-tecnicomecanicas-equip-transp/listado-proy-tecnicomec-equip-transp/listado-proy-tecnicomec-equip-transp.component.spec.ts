import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ListadoProyTecnicomecEquipTranspComponent } from './listado-proy-tecnicomec-equip-transp.component';

describe('ListadoProyTecnicomecEquipTranspComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoProyTecnicomecEquipTranspComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoProyTecnicomecEquipTranspComponent).componentInstance).toBeTruthy();
  });
});
