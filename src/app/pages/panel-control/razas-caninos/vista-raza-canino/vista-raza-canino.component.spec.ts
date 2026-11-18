import { TestBed } from '@angular/core/testing';
import { VistaRazaCaninoComponent } from './vista-raza-canino.component';

describe('VistaRazaCaninoComponent', () => {
  it('should be created', async () => {
    await TestBed.configureTestingModule({ imports: [VistaRazaCaninoComponent] }).compileComponents();
    expect(TestBed.createComponent(VistaRazaCaninoComponent).componentInstance).toBeTruthy();
  });
});
