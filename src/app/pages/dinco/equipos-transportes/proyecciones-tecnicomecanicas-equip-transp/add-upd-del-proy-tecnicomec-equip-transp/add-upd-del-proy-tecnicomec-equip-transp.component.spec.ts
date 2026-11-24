import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AddUpdDelProyTecnicomecEquipTranspComponent } from './add-upd-del-proy-tecnicomec-equip-transp.component';

describe('AddUpdDelProyTecnicomecEquipTranspComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelProyTecnicomecEquipTranspComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelProyTecnicomecEquipTranspComponent).componentInstance).toBeTruthy();
  });
});
