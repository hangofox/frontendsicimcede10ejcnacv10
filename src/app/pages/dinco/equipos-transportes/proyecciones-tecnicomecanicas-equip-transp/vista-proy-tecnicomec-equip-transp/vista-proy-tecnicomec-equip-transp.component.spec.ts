import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { VistaProyTecnicomecEquipTranspComponent } from './vista-proy-tecnicomec-equip-transp.component';

describe('VistaProyTecnicomecEquipTranspComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [VistaProyTecnicomecEquipTranspComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(VistaProyTecnicomecEquipTranspComponent).componentInstance).toBeTruthy();
  });
});
