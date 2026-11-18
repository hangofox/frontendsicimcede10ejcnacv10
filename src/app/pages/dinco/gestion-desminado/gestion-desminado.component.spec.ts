import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { GestionDesminadoComponent } from './gestion-desminado.component';

describe('GestionDesminadoComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [GestionDesminadoComponent],
      providers: [provideRouter([])]
    }).compileComponents();
    expect(TestBed.createComponent(GestionDesminadoComponent).componentInstance).toBeTruthy();
  });
});
