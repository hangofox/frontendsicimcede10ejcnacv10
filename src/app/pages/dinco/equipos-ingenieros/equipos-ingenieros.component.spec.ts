import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { EquiposIngenierosComponent } from './equipos-ingenieros.component';

describe('EquiposIngenierosComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [EquiposIngenierosComponent],
      providers: [provideRouter([])]
    }).compileComponents();
    expect(TestBed.createComponent(EquiposIngenierosComponent).componentInstance).toBeTruthy();
  });
});
