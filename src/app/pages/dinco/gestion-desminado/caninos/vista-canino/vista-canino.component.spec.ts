import { TestBed } from '@angular/core/testing';
import { VistaCaninoComponent } from './vista-canino.component';

describe('VistaCaninoComponent', () => {
  it('should be created', async () => {
    await TestBed.configureTestingModule({ imports: [VistaCaninoComponent] }).compileComponents();
    expect(TestBed.createComponent(VistaCaninoComponent).componentInstance).toBeTruthy();
  });
});
