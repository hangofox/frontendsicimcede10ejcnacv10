import { TestBed } from '@angular/core/testing';
import { AddUpdDelHistMaqPesadObrRedMitigComponent } from './add-upd-del-hist-maq-pesad-obr-red-mitig.component';

describe('AddUpdDelHistMaqPesadObrRedMitigComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelHistMaqPesadObrRedMitigComponent]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelHistMaqPesadObrRedMitigComponent).componentInstance).toBeTruthy();
  });
});
