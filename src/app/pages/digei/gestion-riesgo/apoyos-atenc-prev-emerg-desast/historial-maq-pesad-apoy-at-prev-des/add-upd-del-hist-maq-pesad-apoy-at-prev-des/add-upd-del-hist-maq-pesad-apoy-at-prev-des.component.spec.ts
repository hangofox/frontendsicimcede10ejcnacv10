import { TestBed } from '@angular/core/testing';
import { AddUpdDelHistMaqPesadApoyAtencPrevDesComponent } from './add-upd-del-hist-maq-pesad-apoy-at-prev-des.component';

describe('AddUpdDelHistMaqPesadApoyAtencPrevDesComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelHistMaqPesadApoyAtencPrevDesComponent]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelHistMaqPesadApoyAtencPrevDesComponent).componentInstance).toBeTruthy();
  });
});
