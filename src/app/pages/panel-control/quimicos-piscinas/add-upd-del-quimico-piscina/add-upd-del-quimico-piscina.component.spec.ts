import { TestBed } from '@angular/core/testing';
import { AddUpdDelQuimicoPiscinaComponent } from './add-upd-del-quimico-piscina.component';

describe('AddUpdDelQuimicoPiscinaComponent', () => {
  it('should be created', async () => {
    await TestBed.configureTestingModule({ imports: [AddUpdDelQuimicoPiscinaComponent] }).compileComponents();
    expect(TestBed.createComponent(AddUpdDelQuimicoPiscinaComponent).componentInstance).toBeTruthy();
  });
});
