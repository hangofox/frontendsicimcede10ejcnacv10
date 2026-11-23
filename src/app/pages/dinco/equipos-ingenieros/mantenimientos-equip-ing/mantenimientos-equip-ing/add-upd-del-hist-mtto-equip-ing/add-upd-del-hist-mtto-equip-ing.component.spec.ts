import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { AddUpdDelHistMttoEquipIngComponent } from './add-upd-del-hist-mtto-equip-ing.component';

describe('AddUpdDelHistMttoEquipIngComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdDelHistMttoEquipIngComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    }).compileComponents();

    expect(TestBed.createComponent(AddUpdDelHistMttoEquipIngComponent).componentInstance).toBeTruthy();
  });
});
