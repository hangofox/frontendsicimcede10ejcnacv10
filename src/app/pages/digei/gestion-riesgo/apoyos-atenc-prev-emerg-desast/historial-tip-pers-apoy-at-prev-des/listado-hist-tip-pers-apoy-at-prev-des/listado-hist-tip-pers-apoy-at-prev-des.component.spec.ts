import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoHistTipPersApoyAtencPrevDesComponent } from './listado-hist-tip-pers-apoy-at-prev-des.component';

describe('ListadoHistTipPersApoyAtencPrevDesComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoHistTipPersApoyAtencPrevDesComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoHistTipPersApoyAtencPrevDesComponent).componentInstance).toBeTruthy();
  });
});
