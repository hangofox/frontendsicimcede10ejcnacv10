import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MiPerfilComponent } from './mi-perfil.component';

describe('MiPerfilComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [MiPerfilComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(MiPerfilComponent).componentInstance).toBeTruthy();
  });
});
