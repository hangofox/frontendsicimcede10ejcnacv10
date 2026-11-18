import { TestBed } from '@angular/core/testing';
import { VistaMunicionEspecialComponent } from './vista-municion-especial.component';

describe('VistaMunicionEspecialComponent', () => {
  it('should be created', async () => {
    await TestBed.configureTestingModule({ imports: [VistaMunicionEspecialComponent] }).compileComponents();
    expect(TestBed.createComponent(VistaMunicionEspecialComponent).componentInstance).toBeTruthy();
  });
});
