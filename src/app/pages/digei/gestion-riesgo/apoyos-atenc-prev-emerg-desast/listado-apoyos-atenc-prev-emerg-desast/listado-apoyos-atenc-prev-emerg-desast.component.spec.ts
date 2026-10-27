import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoApoyosAtencPrevEmergDesastComponent } from './listado-apoyos-atenc-prev-emerg-desast.component';

describe('ListadoApoyosAtencPrevEmergDesastComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoApoyosAtencPrevEmergDesastComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoApoyosAtencPrevEmergDesastComponent).componentInstance).toBeTruthy();
  });
});
