import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListadoApoyosObrRedMitigGestRiesgDesastComponent } from './listado-apoyos-obr-red-mitig-gest-riesg-desast.component';

describe('ListadoApoyosObrRedMitigGestRiesgDesastComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoApoyosObrRedMitigGestRiesgDesastComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    expect(TestBed.createComponent(ListadoApoyosObrRedMitigGestRiesgDesastComponent).componentInstance).toBeTruthy();
  });
});
