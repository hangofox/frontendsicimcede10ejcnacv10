import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PiePaginaComponent } from './pie-pagina.component';

describe('PiePaginaComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [PiePaginaComponent],
      providers: [provideRouter([])]
    }).compileComponents();
    expect(TestBed.createComponent(PiePaginaComponent).componentInstance).toBeTruthy();
  });
});
