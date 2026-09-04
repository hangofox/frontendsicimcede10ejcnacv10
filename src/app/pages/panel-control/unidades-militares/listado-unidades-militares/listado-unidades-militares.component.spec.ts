import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoUnidadesMilitaresComponent } from './listado-unidades-militares.component';

describe('ListadoUnidadesMilitaresComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoUnidadesMilitaresComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoUnidadesMilitaresComponent).componentInstance).toBeTruthy();
  });
});
