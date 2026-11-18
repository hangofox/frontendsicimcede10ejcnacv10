import { TestBed } from '@angular/core/testing';
import { AddUpdDelCaninoComponent } from './add-upd-del-canino.component';

describe('AddUpdDelCaninoComponent', () => {
  it('should be created', async () => {
    await TestBed.configureTestingModule({ imports: [AddUpdDelCaninoComponent] }).compileComponents();
    expect(TestBed.createComponent(AddUpdDelCaninoComponent).componentInstance).toBeTruthy();
  });
});
