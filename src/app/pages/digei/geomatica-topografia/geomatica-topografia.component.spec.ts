import { TestBed } from '@angular/core/testing';
import { GeomaticaTopografiaComponent } from './geomatica-topografia.component';

describe('GeomaticaTopografiaComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({ imports: [GeomaticaTopografiaComponent] }).compileComponents();
    expect(TestBed.createComponent(GeomaticaTopografiaComponent).componentInstance).toBeTruthy();
  });
});
