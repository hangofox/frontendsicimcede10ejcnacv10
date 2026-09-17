import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoAddUpdDelResponsablesInfraestComponent } from './listado-add-upd-del-responsables-infraest.component';

describe('ListadoAddUpdDelResponsablesInfraestComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoAddUpdDelResponsablesInfraestComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoAddUpdDelResponsablesInfraestComponent).componentInstance).toBeTruthy();
  });
});
