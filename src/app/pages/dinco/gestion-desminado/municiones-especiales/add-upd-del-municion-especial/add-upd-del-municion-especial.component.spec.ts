import { TestBed } from '@angular/core/testing';
import { AddUpdDelMunicionEspecialComponent } from './add-upd-del-municion-especial.component';

describe('AddUpdDelMunicionEspecialComponent', () => {
  it('should be created', async () => {
    await TestBed.configureTestingModule({ imports: [AddUpdDelMunicionEspecialComponent] }).compileComponents();
    expect(TestBed.createComponent(AddUpdDelMunicionEspecialComponent).componentInstance).toBeTruthy();
  });
});
