import { TestBed } from '@angular/core/testing';
import { AddUpdDelLineaMandoUnidMilSolicInfraestComponent } from './add-upd-del-linea-mando-unid-mil-solic-infraest.component';

describe('AddUpdDelLineaMandoUnidMilSolicInfraestComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelLineaMandoUnidMilSolicInfraestComponent]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelLineaMandoUnidMilSolicInfraestComponent).componentInstance).toBeTruthy();
  });
});
