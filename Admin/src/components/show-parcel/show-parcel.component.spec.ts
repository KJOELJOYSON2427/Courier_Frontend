import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowParcelComponent } from './show-parcel.component';

describe('ShowParcelComponent', () => {
  let component: ShowParcelComponent;
  let fixture: ComponentFixture<ShowParcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowParcelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowParcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
