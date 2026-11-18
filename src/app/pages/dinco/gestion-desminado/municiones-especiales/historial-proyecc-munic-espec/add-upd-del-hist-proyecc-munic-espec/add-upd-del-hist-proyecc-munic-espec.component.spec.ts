import { TestBed } from '@angular/core/testing';
import { AddUpdDelHistProyeccMunicEspecComponent } from './add-upd-del-hist-proyecc-munic-espec.component';

describe('AddUpdDelHistProyeccMunicEspecComponent', () => {
  it('should be created', async () => {
    await TestBed.configureTestingModule({ imports: [AddUpdDelHistProyeccMunicEspecComponent] }).compileComponents();
    expect(TestBed.createComponent(AddUpdDelHistProyeccMunicEspecComponent).componentInstance).toBeTruthy();
  });
});
