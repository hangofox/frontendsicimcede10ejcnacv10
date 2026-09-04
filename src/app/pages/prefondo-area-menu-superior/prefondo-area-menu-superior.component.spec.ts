import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PrefondoAreaMenuSuperiorComponent } from './prefondo-area-menu-superior.component';

describe('PrefondoAreaMenuSuperiorComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [PrefondoAreaMenuSuperiorComponent],
      providers: [provideRouter([])]
    }).compileComponents();
    expect(TestBed.createComponent(PrefondoAreaMenuSuperiorComponent).componentInstance).toBeTruthy();
  });
});
