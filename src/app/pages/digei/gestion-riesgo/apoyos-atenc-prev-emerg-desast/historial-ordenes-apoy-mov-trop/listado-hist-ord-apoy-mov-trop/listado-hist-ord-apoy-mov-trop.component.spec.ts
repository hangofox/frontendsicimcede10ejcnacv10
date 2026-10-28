import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoHistOrdApoyMovTropComponent } from './listado-hist-ord-apoy-mov-trop.component';

describe('ListadoHistOrdApoyMovTropComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoHistOrdApoyMovTropComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoHistOrdApoyMovTropComponent).componentInstance).toBeTruthy();
  });
});
