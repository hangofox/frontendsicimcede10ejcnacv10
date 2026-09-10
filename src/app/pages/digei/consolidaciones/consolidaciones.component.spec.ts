import { TestBed } from '@angular/core/testing';
import { ConsolidacionesComponent } from './consolidaciones.component';

describe('ConsolidacionesComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({ imports: [ConsolidacionesComponent] }).compileComponents();
    expect(TestBed.createComponent(ConsolidacionesComponent).componentInstance).toBeTruthy();
  });
});
