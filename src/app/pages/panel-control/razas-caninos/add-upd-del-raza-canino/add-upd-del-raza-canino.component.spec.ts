import { TestBed } from '@angular/core/testing';
import { AddUpdDelRazaCaninoComponent } from './add-upd-del-raza-canino.component';

describe('AddUpdDelRazaCaninoComponent', () => {
  it('should be created', async () => {
    await TestBed.configureTestingModule({ imports: [AddUpdDelRazaCaninoComponent] }).compileComponents();
    expect(TestBed.createComponent(AddUpdDelRazaCaninoComponent).componentInstance).toBeTruthy();
  });
});
