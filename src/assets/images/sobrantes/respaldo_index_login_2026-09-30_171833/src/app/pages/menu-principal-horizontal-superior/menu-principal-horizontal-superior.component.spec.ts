import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MenuPrincipalHorizontalSuperiorComponent } from './menu-principal-horizontal-superior.component';

describe('MenuPrincipalHorizontalSuperiorComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [MenuPrincipalHorizontalSuperiorComponent],
      providers: [provideRouter([])]
    }).compileComponents();
    expect(TestBed.createComponent(MenuPrincipalHorizontalSuperiorComponent).componentInstance).toBeTruthy();
  });
});
