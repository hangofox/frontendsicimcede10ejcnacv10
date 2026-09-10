import { TestBed } from '@angular/core/testing';
import { VistaTerrenoComponent } from './vista-terreno.component';

describe('VistaTerrenoComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({ imports: [VistaTerrenoComponent] }).compileComponents();
    expect(TestBed.createComponent(VistaTerrenoComponent).componentInstance).toBeTruthy();
  });
});
