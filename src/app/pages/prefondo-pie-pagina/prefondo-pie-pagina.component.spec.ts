import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PrefondoPiePaginaComponent } from './prefondo-pie-pagina.component';

describe('PrefondoPiePaginaComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [PrefondoPiePaginaComponent],
      providers: [provideRouter([])]
    }).compileComponents();
    expect(TestBed.createComponent(PrefondoPiePaginaComponent).componentInstance).toBeTruthy();
  });
});
