import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllParcelComponent } from './show-all-parcel.component';

describe('ShowAllParcelComponent', () => {
  let component: ShowAllParcelComponent;
  let fixture: ComponentFixture<ShowAllParcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowAllParcelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAllParcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
